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
                    <img src="/dev/favicon.png" alt="DBS"/>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"/>

                <b-collapse id="nav-collapse" v-model="secondaryValue" is-nav>
                    <b-navbar-nav v-for="(menuItemData, index) in menuData" :key="index">
                        <MenuItem v-if="menuItemData.icon !== undefined" :id="menuItemData.id" :icon="menuItemData.icon" @action="menuClickHandler">
                            {{ menuItemData.label }}
                        </MenuItem>
                        <MenuItem v-else :id="menuItemData.id" @action="menuClickHandler">
                            {{ menuItemData.label }}
                        </MenuItem>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
        <SubMenu :show="showSubMenu" :sub-menu-data="subMenuData" :menu-click-handler="menuClickHandler"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import MenuItem from './MenuItem.vue';
import {MenuItemData} from '@/types/MenuItemData';
import SubMenu from '@/components/menu/SubMenu.vue';

@Component({
    components: {
        SubMenu,
        MenuItem
    },
    model: {
        event: 'input'
    }
})
export default class Menu extends Vue {
    @Prop() readonly menuData!: MenuItemData[];
    @Prop() readonly menuClickHandler!: (id: string) => void;
    @Prop() readonly showSubMenu!: boolean;
    @Prop() readonly subMenuData!: MenuItemData[];
    private internalCollapseVisible = false;

    get value() {
        return this.internalCollapseVisible;
    }

    set value(val: boolean) {
        this.internalCollapseVisible = val;
        this.$attrs.value = val ? 'true': '';
    }

    get secondaryValue() {
        return this.internalCollapseVisible;
    }

    set secondaryValue(val: boolean) {
        this.internalCollapseVisible = val;
        this.$emit('input', val);
    }
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