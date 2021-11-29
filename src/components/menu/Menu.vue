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
    <b-navbar toggleable="lg" type="dark">
      <div class="container">
        <b-navbar-brand>
          <img src="/dev/favicon.png" alt="DBS" />
        </b-navbar-brand>

        <div class="navbar-brand d-lg-none text-center">Digitales <br class="d-sm-none" />Bouldersystem</div>

        <button
          type="button"
          class="navbar-toggler d-xl-none"
          @click.stop.prevent="$root.$emit('bv::toggle::collapse', 'nav-collapse')"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <b-collapse id="nav-collapse" class="justify-content-around" v-model="secondaryValue" is-nav>
          <b-navbar-nav v-for="(menuItemData, index) in menuData" :key="index">
            <MenuItem
              v-if="menuItemData.icon !== undefined"
              :id="menuItemData.id"
              :icon="menuItemData.icon"
              @action="$emit('click', menuItemData.id)"
            >
              {{ menuItemData.label }}
            </MenuItem>
            <MenuItem v-else :id="menuItemData.id" @action="menuClickHandler">
              {{ menuItemData.label }}
            </MenuItem>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <SubMenu :show="showSubMenu" :sub-menu-data="subMenuData" :menu-click-handler="menuClickHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubMenu from "@/components/menu/SubMenu.vue";
import MenuItem from "@/components/menu/MenuItem.vue";
import { MenuItemData } from "@/types/MenuItemData";

export default defineComponent({
  name: "HelloWorld",
  components: {
    SubMenu,
    MenuItem,
  },
  emits: ["input", "click"],
  props: {
    menuData: {
      type: Array as () => MenuItemData[],
      required: true,
    },
    showSubMenu: {
      type: Boolean,
      required: true,
    },
    subMenuData: {
      type: Array as () => MenuItemData[],
      required: true,
    },
  },
  data() {
    return {
      internalCollapseVisible: false,
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
      },
    },
  },
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
