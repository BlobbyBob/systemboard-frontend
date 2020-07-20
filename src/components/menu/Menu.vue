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
    <div class="menu">
        <ul v-for="(menuItemData, index) in menuData" v-bind:key="index">
            <MenuItem v-if="menuItemData.icon !== undefined" v-bind:id="menuItemData.id" v-bind:icon="menuItemData.icon" v-on:action="menuClickHandler">
                {{ menuItemData.label }}
            </MenuItem>
            <MenuItem v-else v-bind:id="menuItemData.id" v-on:action="menuClickHandler">
                {{ menuItemData.label }}
            </MenuItem>
        </ul>
    </div>
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

</style>