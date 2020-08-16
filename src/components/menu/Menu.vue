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
    <nav class="navbar navbar-dark navbar-expand-lg sticky-top">
        <div class="container">
            <ul class="nav">
                <li class="navbar-brand"><img src="/dev/favicon.png" alt="DBS"/></li>
            </ul>
            <ul v-for="(menuItemData, index) in menuData" :key="index" class="nav">
                <MenuItem v-if="menuItemData.icon !== undefined" :id="menuItemData.id" :icon="menuItemData.icon" @action="menuClickHandler">
                    {{ menuItemData.label }}
                </MenuItem>
                <MenuItem v-else :id="menuItemData.id" @action="menuClickHandler">
                    {{ menuItemData.label }}
                </MenuItem>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import MenuItem from './MenuItem.vue';
import {MenuItemData} from '@/types/MenuItemData';

@Component({
    components: {
        MenuItem
    }
})
export default class Menu extends Vue {
    @Prop() readonly menuData!: MenuItemData[];
    @Prop() readonly menuClickHandler!: (id: string) => void;
}
</script>

<style scoped lang="scss">
@import 'src/style/custom';

nav {
    background-color: $topbar-bg;

    .navbar-brand img {
        width: 3rem;
        height: 3rem;
    }
}
</style>