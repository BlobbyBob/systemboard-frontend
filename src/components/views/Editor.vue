<!--
  -- systemboard
  -- Copyright (C) 2020 Ben Swierzy
  --
  -- This program is free software: you can redistribute it and/or modify
  -- it under the terms of the GNU General Public License as published by
  -- the Free Software Foundation, either version 3 of the License, or
  -- (at your option) any later version.
  --
  -- This program is distributed in the hope that it will be useful,
  -- but WITHOUT ANY WARRANTY; without even the implied warranty of
  -- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -- GNU General Public License for more details.
  --
  -- You should have received a copy of the GNU General Public License
  -- along with this program.  If not, see <https://www.gnu.org/licenses/>.
  --
  -->

<template>
  <div id="editor">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <ul class="navbar-nav w-100 me-auto my-2 justify-content-around">
          <li
            v-for="[k, v] of Object.entries({
              select: 'Wand auswählen (W)',
              ellipse: 'Ellipse hinzufügen (A)',
              polygon: 'Polygon hinzufügen (S)',
              move: 'Griff bewegen (D)',
              delete: 'Griff löschen (F)',
            })"
            :key="k"
            class="nav-item"
          >
            <a class="nav-link" @click.prevent="onNavClick" href="#" :data-id="k">{{ v }}</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <Wall
        v-if="segment != null"
        :data="holds"
        :types="holdTypes"
        :refresh-arrows="refreshWall"
        :editor-mode="true"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @contextmenu="onRightClick"
      >
        <template v-slot:dynamicHolds>
          <Hold
            v-if="dynamicHold"
            :id="dynamicHold.id"
            :tag="dynamicHold.tag"
            :attr="dynamicHold.attr"
            :type="dynamicHold.type"
          />
        </template>
      </Wall>
    </div>
  </div>
  <b-modal
    id="wallSelectionModal"
    title="Segment auswählen"
    ok-title="Auswählen"
    cancel-title="Abbrechen"
    @ok="selectWallSegment"
  >
    <select class="form-select">
      <option v-for="s in segments" :key="s" :value="s" :selected="segment === s">{{ s }}</option>
    </select>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useToast } from "vue-toastification";
import { bControls } from "@/plugins/BootstrapControls";
import { ProgressStatus } from "@/plugins/ProgressStatus";
import { setApiVue } from "@/api";
import { getWall } from "@/api/interface";
import BModal from "@/components/bootstrap/BModal.vue";
import Hold from "@/components/wall/Hold.vue";
import Wall from "@/components/wall/Wall.vue";
import { Holds } from "@/api/types";

function calculateSvgPosition(e: MouseEvent): [number, number] | null {
  const svg = document.querySelector<SVGElement>("#editor .wallSegment svg");
  if (svg) {
    const rect = svg.getBoundingClientRect();
    const x = ((e.pageX - rect.left + window.screenX) / svg.clientWidth) * 1000;
    const y = ((e.pageY - rect.top + window.screenY) / svg.clientHeight) * 670 - 26; // todo find where the offset is coming from
    return [x, y];
  }
  return null;
}

export default defineComponent({
  name: "Editor",
  components: { Wall, BModal, Hold },
  setup() {
    let bControls = {} as bControls;
    const x: bControls | undefined = inject("bControls");
    if (x !== undefined) {
      bControls = x;
    } else {
      console.warn("Plugin bControls missing");
    }

    let progress = (() => true) as (status: ProgressStatus) => void;
    const y: ((status: ProgressStatus) => void) | undefined = inject("progress");
    if (y !== undefined) {
      progress = y;
    } else {
      console.warn("Plugin progress missing");
    }

    const toast = useToast();
    return {
      bControls,
      toast,
      progress,
    };
  },
  data() {
    return {
      mode: "none" as "none" | "ellipse" | "polygon" | "move" | "delete",
      segment: null as string | null,
      segments: [] as string[],
      dynamicHold: null as { id: number; tag: "ellipse" | "polygon"; attr: string; type: 0 | 1 | 2 } | null,
      isGuest: window.sessionStorage.getItem("auth")?.toLowerCase() == "guest",
      holds: [] as Holds[],
      holdTypes: {} as { [holdid: number]: 0 | 1 | 2 },
      refreshWall: false,
      mouseDownPosition: null as [number, number] | null,
    };
  },
  beforeMount() {
    setApiVue(this);
  },
  mounted() {
    document.body.addEventListener("keydown", this.onKeyDown);
    getWall().then((w) => {
      this.segments = w?.wallSegments.map((v) => v.image) ?? [];
    });
  },
  unmounted() {
    document.body.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onKeyDown(e: KeyboardEvent) {
      switch (e.code.toLowerCase()) {
        case "keyw":
          this.enterSelect();
          break;
        case "keya":
          this.enterEllipse();
          break;
        case "escape":
          this.reset();
          break;
      }
      console.log("keydown", e.code);
    },
    onNavClick(e: MouseEvent) {
      const id = (e.target as HTMLElement).attributes.getNamedItem("data-id")?.value;
      switch (id) {
        case "select":
          this.enterSelect();
          break;
        case "ellipse":
          this.enterEllipse();
          break;
        case "polygon":
          break;
        case "move":
          break;
        case "delete":
          // todo remove
          break;
      }
    },
    onRightClick(e: MouseEvent) {
      e.stopPropagation();
      this.mouseDownPosition = null;
      this.dynamicHold = null;
      return false;
    },
    onMouseDown(e: MouseEvent) {
      if (!this.mouseDownPosition && (this.mode == "ellipse" || this.mode == "polygon")) {
        this.mouseDownPosition = calculateSvgPosition(e);
        if (this.mouseDownPosition) {
          this.dynamicHold = {
            id: -1,
            tag: this.mode,
            attr: `cx='${this.mouseDownPosition[0]}' cy='${this.mouseDownPosition[1]}' rx='1' ry='1'`,
            type: 1,
          };
        }
      }
    },
    onMouseMove(e: MouseEvent) {
      if (this.mode == "ellipse" && this.mouseDownPosition && this.dynamicHold) {
        const position = calculateSvgPosition(e);
        if (position) {
          const cx = (position[0] + this.mouseDownPosition[0]) / 2;
          const cy = (position[1] + this.mouseDownPosition[1]) / 2;
          const rx = Math.abs(position[0] - this.mouseDownPosition[0]) / 2;
          const ry = Math.abs(position[1] - this.mouseDownPosition[1]) / 2;
          this.dynamicHold.attr = `cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}'`;
        }
      }
    },
    onMouseUp(e: MouseEvent) {
      if (this.mode == "ellipse" && this.mouseDownPosition && this.dynamicHold) {
        const position = calculateSvgPosition(e);
        if (position) {
          const cx = (position[0] + this.mouseDownPosition[0]) / 2;
          const cy = (position[1] + this.mouseDownPosition[1]) / 2;
          const rx = Math.abs(position[0] - this.mouseDownPosition[0]) / 2;
          const ry = Math.abs(position[1] - this.mouseDownPosition[1]) / 2;
          this.dynamicHold.attr = `cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}'`;
          // todo save shape
        }
      }
      this.mouseDownPosition = null;
    },
    enterSelect() {
      this.reset();
      this.bControls.showModal("wallSelectionModal");
    },
    enterEllipse() {
      if (this.mode != "ellipse") {
        this.reset();
      }
      this.mode = "ellipse";
    },
    reset() {
      this.mode = "none";
      this.dynamicHold = null;
    },
    selectWallSegment() {
      const select = document.querySelector<HTMLSelectElement>("#wallSelectionModal select");
      this.segment = select?.value ?? null;
      if (this.segment) {
        this.holds = [{ filename: this.segment, holds: [] }];
        document
          .querySelectorAll<SVGElement>("#editor .wallSegment svg image")
          .forEach((image) => (image.ondragstart = () => false));
      }
    },
  },
});
</script>

<style scoped lang="scss">
image {
  user-select: none;
}
</style>
