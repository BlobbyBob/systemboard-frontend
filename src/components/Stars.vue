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
  <div class="stars" :class="{ dynamic: dynamic }">
    <span
      v-for="star in starArray"
      :key="star.id"
      :class="'star-' + star.id"
      @click="clickHandler(star.id)"
      @mouseenter="mouseenterHandler(star.id)"
      @mouseleave="mouseleaveHandler()"
    >
      <i class="positive fas fa-star" v-show="star.selected"></i>
      <i class="negative far fa-star" v-show="!star.selected"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Stars",
  props: {
    dynamic: {
      type: Boolean,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    initialValue: {
      type: Number,
      default: 0,
    },
    refresh: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      internalValue: 0,
      hoverValue: -1,
    };
  },
  created() {
    this.internalValue = this.initialValue;
  },
  emits: ["input"],
  computed: {
    starArray(): { id: number; selected: boolean }[] {
      if (this.updater()) true;
      const stars = [];
      for (let i = 0; i < this.count; i++) {
        stars.push({
          id: i,
          selected: !this.dynamic || this.hoverValue < 0 ? i < this.value : i < this.hoverValue,
        });
      }
      return stars;
    },
    value: {
      get(): number {
        return this.internalValue;
      },
      set(value: number) {
        this.internalValue = value;
        this.$emit("input", this.internalValue);
      },
    },
  },
  methods: {
    updater(): number {
      if (this.refresh) true;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (!this.dynamic) this.internalValue = this.initialValue;
      return this.internalValue;
    },
    clickHandler(id: number) {
      if (this.dynamic) {
        this.internalValue = id + 1;
        this.$emit("input", this.internalValue);
      }
    },
    mouseenterHandler(id: number) {
      this.hoverValue = id + 1;
    },
    mouseleaveHandler() {
      this.hoverValue = -1;
    },
  },
});
</script>

<style scoped lang="scss">
.stars {
  color: #ffbb00;
}

.stars.dynamic {
  .positive,
  .negative {
    cursor: pointer;
  }
}
</style>
