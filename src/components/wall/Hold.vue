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
  <polygon
    v-if="tag === 'polygon'"
    :points="points"
    v-bind:data-type="type"
    v-on:click="(e) => $emit('click', e)"
  ></polygon>
  <ellipse
    v-else-if="tag === 'ellipse'"
    :rx="rx"
    :ry="ry"
    :cx="cx"
    :cy="cy"
    v-bind:data-type="type"
    v-on:click="(e) => $emit('click', e)"
  ></ellipse>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Hold",
  props: {
    id: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    attr: {
      type: String,
      required: true,
    },
    type: {
      type: Number as () => 0 | 1 | 2,
      required: true,
    },
  },
  data() {
    return {
      parsedAttr: {} as { [attr: string]: string },
      parsedAttrInit: false,
    };
  },
  computed: {
    points(): string {
      this.lazyParse();
      return this.parsedAttr.points;
    },
    rx(): string {
      this.lazyParse();
      return this.parsedAttr.rx;
    },
    ry(): string {
      this.lazyParse();
      return this.parsedAttr.ry;
    },
    cx(): string {
      this.lazyParse();
      return this.parsedAttr.cx;
    },
    cy(): string {
      this.lazyParse();
      return this.parsedAttr.cy;
    },
  },
  methods: {
    lazyParse() {
      if (!this.parsedAttrInit) {
        this.parseAttr();
        this.parsedAttrInit = true;
      }
    },

    parseAttr() {
      const attr: { [attr: string]: string } = {};
      let state = 0;
      let token = "";
      let currentAttr = "";

      for (let i = 0; i < this.attr.length; i++) {
        const char = this.attr.charAt(i);
        const charCode = char.charCodeAt(0);
        switch (state) {
          case 0: // Outside
            if (charCode == 0x2d || (charCode > 0x40 && charCode <= 0x5a) || (charCode > 0x60 && charCode <= 0x7a)) {
              state = 1;
              token = char;
            }
            break;
          case 1: // Attr name
            if (charCode == 0x2d || (charCode > 0x40 && charCode <= 0x5a) || (charCode > 0x60 && charCode <= 0x7a)) {
              token += char;
            }
            if (charCode == 0x3d) {
              state = 2;
              currentAttr = token;
              token = "";
            }
            break;
          case 2: // Waiting for quotes
            if (charCode == 0x22) {
              state = 3;
            } else if (charCode == 0x27) {
              state = 4;
            }
            break;
          case 3: // Double quotes
            if (charCode != 0x22) {
              token += char;
            } else {
              state = 0;
              attr[currentAttr] = token;
              token = "";
            }
            break;
          case 4: // Single quotes
            if (charCode != 0x27) {
              token += char;
            } else {
              state = 0;
              attr[currentAttr] = token;
              token = "";
            }
            break;
        }
      }
      if (state != 0) {
        console.warn(`Parser failure for "${this.attr}"`);
      }

      this.parsedAttr = attr;
    },
  },
  watch: {
    attr() {
      this.parsedAttrInit = false;
    },
  },
});
</script>

<style scoped lang="scss">
@import "src/style/custom";

circle,
ellipse,
polygon {
  stroke-width: 2px;
  fill: transparent;
}

circle[data-type="0"],
ellipse[data-type="0"],
polygon[data-type="0"] {
  stroke-width: 0;
}

circle[data-type="1"],
ellipse[data-type="1"],
polygon[data-type="1"] {
  stroke: $hold-color;
}

circle[data-type="2"],
ellipse[data-type="2"],
polygon[data-type="2"] {
  stroke: $hold-color-special;
}
</style>
