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
  <li class="nav-item text-center p-2">
    <a
      class="nav-link"
      @click.prevent="
        (e) => {
          if (id === 'other') e.stopPropagation();
          $emit('click', id);
        }
      "
      href="#"
    >
      <span v-if="icon !== undefined" :class="iconClass" class="mr-3 mr-lg-0"></span>
      <br v-if="icon !== undefined" class="d-none d-lg-block" />
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  emits: ["click"],
  props: {
    id: {
      type: String,
      required: true,
    },
    icon: String,
  },
  computed: {
    iconClass() {
      if (this.icon === undefined) return {};
      const classes: { [clazz: string]: boolean } = {};
      classes["fas"] = true;
      classes["fa-lg"] = true;
      classes["fa-" + this.icon] = true;
      return classes;
    },
  },
});
</script>

<style scoped lang="scss">
@import "src/style/vars";

li {
  cursor: pointer;

  a,
  a:hover {
    color: white !important;
  }
}

li:hover {
  background-color: $topbar-bg-hover;
  color: white !important;
}
</style>
