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
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand">
          <img src="/dev/favicon.png" alt="DBS" />
        </a>

        <div class="navbar-brand d-lg-none text-center">Digitales <br class="d-sm-none" />Bouldersystem</div>

        <button type="button" class="navbar-toggler d-xl-none" @click.stop.prevent="toggleCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <nav id="nav-collapse" class="navbar-collapse collapse">
          <div class="container">
            <ul class="navbar-nav justify-content-around">
              <MenuItem
                v-for="(menuItemData, index) in menuData"
                :key="index"
                :id="menuItemData.id"
                :icon="menuItemData.icon"
                @click="$emit('click', menuItemData.id)"
              >
                {{ menuItemData.label }}
              </MenuItem>
            </ul>
          </div>
        </nav>
      </div>
    </nav>
    <SubMenu :show="showSubMenu" :sub-menu-data="subMenuData" @click="(id) => $emit('click', id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import SubMenu from "@/components/menu/SubMenu.vue";
import MenuItem from "@/components/menu/MenuItem.vue";
import { MenuItemData } from "@/types/MenuItemData";
import { bControls } from "@/plugins/BootstrapControls";

export default defineComponent({
  name: "Menu",
  components: {
    SubMenu,
    MenuItem
  },
  emits: ["input", "click"],
  props: {
    menuData: {
      type: Array as () => MenuItemData[],
      required: true
    },
    showSubMenu: {
      type: Boolean,
      required: true
    },
    subMenuData: {
      type: Array as () => MenuItemData[],
      required: true
    }
  },
  setup() {
    let bControls = {} as bControls;
    const x: bControls | undefined = inject("bControls");
    if (x !== undefined) {
      bControls = x;
    }
    return {
      bControls
    };
  },
  data() {
    return {
      internalCollapseVisible: false
    };
  },
  computed: {
    value: {
      get(): boolean {
        return this.internalCollapseVisible;
      },
      set(val: boolean) {
        this.internalCollapseVisible = val;
        this.$attrs.value = val ? "true" : "";
      }
    }
  },
  methods: {
    toggleCollapse() {
      this.bControls.toggleCollapse("nav-collapse");
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/style/custom";

nav {
  background-color: $topbar-bg;

  .navbar-brand img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
