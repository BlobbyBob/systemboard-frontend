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
    <nav class="navbar submenu navbar-secondary" :class="navClasses">
        <div class="container justify-content-end">
            <ul v-for="(data, index) in subMenuData" :key="index" class="nav">
                <MenuItem :id="data.id" @action="menuClickHandler">
                    {{ data.label }}
                </MenuItem>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import MenuItem from '@/components/menu/MenuItem.vue';

@Component({
    components: {MenuItem}
})
export default class SubMenu extends Vue {
    @Prop() readonly menuClickHandler!: (id: string) => void;
    @Prop() readonly show!: boolean;
    @Prop() readonly subMenuData!: MenuItem[];

    get navClasses() {
        return {
            hidden: !this.show
        };
    }
}
</script>

<style scoped lang="scss">
@import 'src/style/custom';

.navbar-secondary {
    background-color: $secondary;
}

nav.submenu {
    padding-top: 0;
    padding-bottom: 0;
    max-height: 100px;
    transition: max-height 0.2s linear;
}

nav.submenu.hidden {
    max-height: 0;
    transition: max-height 0.35s linear;
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