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
  <div class="wallSegment w-100" :class="{ hidden: !visible }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 670">
      <image x="0" y="0" width="1000px" height="670px" :xlink:href="image"></image>
      <g class="holds">
        <Hold
          v-for="hold in holdsFiltered"
          :key="hold.id"
          :id="hold.id"
          :tag="hold.tag"
          :attr="hold.attr"
          :type="types[hold.id]"
          @click="(e) => $emit('click', hold.id, e)"
        />

        <slot name="dynamicHolds"></slot>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Hold as HoldType } from "@/api/types";
import Hold from "@/components/wall/Hold.vue";

export default defineComponent({
  name: "WallSegment",
  emits: ["click"],
  components: { Hold },
  props: {
    image: {
      type: String,
      required: true,
    },
    holds: {
      type: Array as () => HoldType[],
      required: true,
    },
    types: {
      type: Object as () => { [holdId: number]: 0 | 1 | 2 },
      required: true,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    holdsFiltered(): HoldType[] {
      if (this.refresh) true;
      return this.holds;
    },
  },
});
</script>

<style scoped lang="scss">
svg {
  width: 100%;
}
.hidden {
  display: none;
}
</style>
