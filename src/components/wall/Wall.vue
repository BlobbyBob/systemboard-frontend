<!--
  --  systemboard
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
  <div class="row position-relative w-100 ml-0 mr-0">
    <div class="position-absolute w-100 h-100 d-inline-flex justify-content-center align-items-center z-1">
      <p><span class="fas fa-5x fa-asterisk fa-spin opacity-50"></span></p>
    </div>
    <div
      v-if="!editorMode"
      class="pl-lg-2 pr-lg-2 wall-nav d-flex d-lg-none align-items-center leftArrow"
      :class="leftArrowClass"
      @click="prevSegment"
    >
      <span class="fas fa-3x fa-arrow-alt-circle-left"></span>
    </div>
    <div
      v-if="!editorMode"
      class="pl-lg-2 pr-lg-2 wall-nav d-flex d-lg-none align-items-center rightArrow"
      :class="rightArrowClass"
      @click="nextSegment"
    >
      <span class="fas fa-3x fa-arrow-alt-circle-right"></span>
    </div>
    <div class="wallWrapper w-100">
      <div class="wall w-100 d-flex align-items-stretch">
        <div
          v-if="!editorMode"
          class="pl-lg-2 pr-lg-2 wall-nav d-none d-lg-flex align-items-center leftArrow"
          :class="leftArrowClass"
          @click="prevSegment"
        >
          <span class="fas fa-3x fa-arrow-alt-circle-left"></span>
        </div>
        <div class="wall-segments flex-grow-1">
          <div v-for="(holds, index) in data" :key="holds.filename">
            <WallSegment
              :image="'/dev/' + holds.filename"
              :holds="holds.holds"
              :visible="index === currentIndex"
              :types="types"
              :refresh="refreshSegments"
              @click="holdClickHandlerWrapper"
            >
              <template v-slot:dynamicHolds>
                <slot name="dynamicHolds"></slot>
              </template>
            </WallSegment>
          </div>
        </div>
        <div
          v-if="!editorMode"
          class="pl-lg-2 pr-lg-2 wall-nav d-none d-lg-flex align-items-center rightArrow"
          :class="rightArrowClass"
          @click="nextSegment"
        >
          <span class="fas fa-3x fa-arrow-alt-circle-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WallSegment from "./WallSegment.vue";
import { Holds } from "@/api/types";

export default defineComponent({
  name: "Wall",
  components: { WallSegment },
  emits: ["anyclick", "click", "indexchange"],
  props: {
    data: {
      type: Array as () => Holds[],
      required: true,
    },
    types: {
      type: Object as () => { [holdId: number]: 0 | 1 | 2 },
      required: true,
    },
    refreshArrows: {
      type: Boolean,
      default: false,
    },
    editorMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentIndex: {
      get(): number {
        return this.internalCurrentIndex;
      },
      set(value: number) {
        this.internalCurrentIndex = value;
        this.$emit("indexchange", value);
      },
    },
    leftArrowClass() {
      if (this.refreshArrows) true;
      let blink = false;
      for (let i = this.internalCurrentIndex - 1; i >= 0; i--) {
        for (const hold of this.data[i].holds) {
          if (this.types[hold.id] != 0) {
            blink = true;
            break;
          }
        }
        if (blink) break;
      }
      return {
        blink: blink,
        "text-muted": this.internalCurrentIndex == 0,
      };
    },
    rightArrowClass() {
      if (this.refreshArrows) true;
      let blink = false;
      for (let i = this.internalCurrentIndex + 1; i < this.data.length; i++) {
        for (const hold of this.data[i].holds) {
          if (this.types[hold.id] != 0) {
            blink = true;
            break;
          }
        }
        if (blink) break;
      }
      return {
        blink: blink,
        "text-muted": this.internalCurrentIndex == this.data.length - 1,
      };
    },
  },
  data() {
    return {
      refreshSegments: false,
      internalCurrentIndex: 0,
    };
  },
  methods: {
    holdClickHandlerWrapper(id: number, e: Event) {
      this.$emit("click", id, e);
      this.refresh();
    },
    refresh(mainwall?: number) {
      if (mainwall !== undefined) {
        this.internalCurrentIndex = mainwall;
      }
      this.refreshSegments = !this.refreshSegments;
    },
    nextSegment() {
      if (this.currentIndex + 1 < this.data.length) this.currentIndex++;
    },
    prevSegment() {
      if (this.currentIndex - 1 >= 0) this.currentIndex--;
    },
  },
});
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap-utilities";
@import "src/style/vars";

.z-1 {
  z-index: -1;
}

.wall {
  min-height: 600px;
  min-width: 1000px;
}

.wallWrapper {
  overflow-x: auto;
  background-color: white;
}

.wall-nav {
  cursor: pointer;
}

.wall-nav.text-muted {
  cursor: not-allowed;
}

.arrows {
  min-height: 600px;
  width: 100vw;
}

@include media-breakpoint-down(md) {
  .leftArrow,
  .rightArrow {
    position: absolute;
    top: 50%;
    z-index: 100;
  }
  .leftArrow {
    left: 10px;
  }
  .rightArrow {
    right: 10px;
  }
}

.blink {
  animation: blink-animation 1.8s infinite ease-in-out;
}

@keyframes blink-animation {
  0%,
  100% {
    color: inherit;
  }
  50% {
    color: #f3652c;
  }
}
</style>
