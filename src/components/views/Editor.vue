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
        <ul class="navbar-nav w-100 justify-content-around">
          <li
            v-for="[k, v] of Object.entries({
              select: 'Wand auswählen (W)',
              ellipse: 'Ellipse hinzufügen (A)',
              polygon: 'Polygon hinzufügen (S)',
              move: 'Griff bewegen (D)',
              delete: 'Griff löschen (F)',
            })"
            :key="k"
            class="nav-item py-2"
            :class="{ active: k === mode }"
          >
            <a class="nav-link" @click.prevent="onNavClick" href="#" :class="{ active: k === mode }" :data-id="k">
              {{ v }}
            </a>
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

type EllipseInfoType = {
  type: "ellipse";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};
type PolygonInfoType = {
  type: "polygon";
  points: [number, number][];
};
type InfoType = EllipseInfoType | PolygonInfoType;

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
      dynamicHold: null as {
        id: number;
        tag: "ellipse" | "polygon";
        attr: string;
        type: 0 | 1 | 2;
        info?: InfoType;
      } | null,
      isGuest: window.sessionStorage.getItem("auth")?.toLowerCase() == "guest",
      holds: [] as Holds[],
      holdTypes: {} as { [holdid: number]: 0 | 1 | 2 },
      refreshWall: false,
      mouseDownPosition: null as [number, number] | null,
      selectedHold: null as number | null,
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
        case "keys":
          this.enterPolygon();
          if (this.mode == "polygon" && this.dynamicHold) {
            this.saveHold();
            this.dynamicHold = null;
          }
          break;
        case "keyd":
          this.enterMove();
          break;
        case "keyf":
          this.enterDelete();
          if (this.selectedHold) {
            // todo api call
            this.holds[0].holds = this.holds[0].holds.filter((hold) => hold.id != this.selectedHold);
            delete this.holdTypes[this.selectedHold];
            this.selectedHold = null;
          }
          break;
        case "escape":
          this.reset();
          break;
        case "enter":
          if (this.mode == "polygon" && this.dynamicHold) {
            this.saveHold();
            this.dynamicHold = null;
          }
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
          this.enterPolygon();
          break;
        case "move":
          this.enterMove();
          break;
        case "delete":
          this.enterDelete();
          break;
      }
    },
    onRightClick(e: MouseEvent) {
      e.stopPropagation();
      this.mouseDownPosition = null;
      this.dynamicHold = null;
      this.selectedHold = null;
      return false;
    },
    onMouseDown(e: MouseEvent) {
      if (this.mouseDownPosition) return;

      this.mouseDownPosition = calculateSvgPosition(e);
      if (!this.mouseDownPosition) return;

      if (this.mode == "ellipse") {
        this.dynamicHold = {
          id: -1,
          tag: "ellipse",
          attr: `cx='${this.mouseDownPosition[0]}' cy='${this.mouseDownPosition[1]}' rx='1' ry='1'`,
          type: 1,
        };
      } else if (this.mode == "polygon") {
        if (!this.dynamicHold) {
          this.dynamicHold = {
            id: -1,
            tag: this.mode,
            attr: `points='${this.mouseDownPosition[0]},${this.mouseDownPosition[1]}'`,
            type: 1,
          };
        } else {
          this.dynamicHold.attr =
            this.dynamicHold.attr.slice(0, -1) + ` ${this.mouseDownPosition[0]},${this.mouseDownPosition[1]}'`;
        }
      } else if (this.mode == "delete" || this.mode == "move") {
        const el = e.target as SVGElement;
        const tag = el.tagName.toLowerCase();
        if (tag == "ellipse" || tag == "polygon") {
          const idStr = el.attributes.getNamedItem("data-id")?.value;
          if (idStr) {
            const id = Number.parseInt(idStr);
            this.selectedHold = id;
            this.holdTypes[id] = 2;
            if (this.mode == "move") {
              let attr, info: InfoType;
              if (tag == "ellipse") {
                info = {
                  type: tag,
                  cx: parseInt(el.attributes.getNamedItem("cx")?.value ?? "0"),
                  cy: parseInt(el.attributes.getNamedItem("cy")?.value ?? "0"),
                  rx: parseInt(el.attributes.getNamedItem("rx")?.value ?? "0"),
                  ry: parseInt(el.attributes.getNamedItem("ry")?.value ?? "0"),
                };
                attr = `cx='${info.cx}' cy='${info.cy}' rx='${info.rx}' ry='${info.ry}'`;
              } else {
                const points = [] as [number, number][];
                const parts = el.attributes.getNamedItem("points")?.value.split(" ") ?? [];
                for (const part of parts) {
                  if (!part.indexOf(",")) continue;
                  const [x, y] = part.split(",");
                  points.push([parseInt(x), parseInt(y)]);
                }
                info = {
                  type: tag,
                  points,
                };
                attr = `points='${points.map((v) => v.join(",")).join(" ")}'`;
              }
              this.dynamicHold = {
                id: -1,
                tag,
                attr,
                type: 2,
                info,
              };
            }
          }
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
      } else if (this.mode == "move" && this.mouseDownPosition && this.dynamicHold && this.dynamicHold.info) {
        const position = calculateSvgPosition(e);
        if (position) {
          const offsetX = position[0] - this.mouseDownPosition[0];
          const offsetY = position[1] - this.mouseDownPosition[1];
          const info = this.dynamicHold.info;
          if (info.type == "ellipse") {
            this.dynamicHold.attr = `cx='${info.cx + offsetX}' cy='${info.cy + offsetY}' rx='${info.rx}' ry='${
              info.ry
            }'`;
          } else {
            this.dynamicHold.attr = `points='${info.points
              .map((v) => {
                v[0] += offsetX;
                v[1] += offsetY;
                v.join(",");
              })
              .join(" ")}'`;
          }
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
          this.saveHold();
          this.dynamicHold = null;
        }
      }
      if (
        this.mode == "move" &&
        this.selectedHold &&
        this.mouseDownPosition &&
        this.dynamicHold &&
        this.dynamicHold.info
      ) {
        const position = calculateSvgPosition(e);
        if (position) {
          const offsetX = position[0] - this.mouseDownPosition[0];
          const offsetY = position[1] - this.mouseDownPosition[1];
          const info = this.dynamicHold.info;
          if (info.type == "ellipse") {
            this.dynamicHold.attr = `cx='${info.cx + offsetX}' cy='${info.cy + offsetY}' rx='${info.rx}' ry='${
              info.ry
            }'`;
          } else {
            this.dynamicHold.attr = `points='${info.points
              .map((v) => {
                v[0] += offsetX;
                v[1] += offsetY;
                v.join(",");
              })
              .join(" ")}'`;
          }
        }
        this.holdTypes[this.selectedHold] = 1;
        for (const hold of this.holds[0].holds) {
          if (hold.id == this.selectedHold) {
            hold.attr = this.dynamicHold.attr;
            break;
          }
        }
        // todo api call
        this.dynamicHold = null;
        this.selectedHold = null;
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
        this.mode = "ellipse";
      }
    },
    enterPolygon() {
      if (this.mode != "polygon") {
        this.reset();
        this.mode = "polygon";
      }
    },
    enterMove() {
      if (this.mode != "move") {
        this.reset();
        this.mode = "move";
      }
    },
    enterDelete() {
      if (this.mode != "delete") {
        this.reset();
        this.mode = "delete";
      }
    },
    reset() {
      this.mode = "none";
      this.dynamicHold = null;
      if (this.selectedHold) {
        this.holdTypes[this.selectedHold] = 1;
        this.selectedHold = null;
      }
    },
    selectWallSegment() {
      const select = document.querySelector<HTMLSelectElement>("#wallSelectionModal select");
      this.segment = select?.value ?? null;
      if (this.segment) {
        this.holds = [{ filename: this.segment, holds: [] }];
      }
    },
    saveHold() {
      // todo api call and await id
      if (this.dynamicHold) {
        const id = (Math.random() * 1000) | 0;
        this.holdTypes[id] = 1;
        this.holds[0].holds.push({
          id: id,
          tag: this.dynamicHold.tag,
          attr: this.dynamicHold.attr,
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.nav-item.active {
  background-color: opacify(lightblue, 0.5);
}
</style>
