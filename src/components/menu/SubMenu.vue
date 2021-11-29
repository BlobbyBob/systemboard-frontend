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
  <b-navbar class="submenu navbar-secondary" :class="navClasses">
    <div class="container">
      <b-navbar-nav v-for="(data, index) in subMenuData" :key="index">
        <MenuItem :id="data.id" @action="$emit('click', data.id)">
          {{ data.label }}
        </MenuItem>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuItem from "@/components/menu/MenuItem.vue";
import { MenuItemData } from "@/types/MenuItemData";

export default defineComponent({
  name: "SubMenu",
  components: { MenuItem },
  emits: ["click"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    subMenuData: {
      type: Array as () => MenuItemData[],
      required: true,
    },
  },
  computed: {
    navClasses() {
      return { hidden: !this.show };
    },
  },
});
</script>

<style scoped lang="scss">
@import "src/style/custom";

.navbar-secondary {
  background-color: $secondary;
}

nav.submenu {
  padding-top: 0;
  padding-bottom: 0;
  max-height: 100px;
  transition: max-height 0.2s linear;

  li {
    flex-basis: 100%;
  }
}

nav.submenu.hidden {
  max-height: 0;
  transition: max-height 0.35s linear;
  z-index: -1;
}

nav.submenu > * {
  transition: opacity 0.15s ease-in;
}

nav.submenu.hidden > * {
  opacity: 0;
  transition: opacity 0.1s ease-out;
}

ul {
  color: white;
}
</style>
