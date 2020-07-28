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
    <li class="nav-item text-center">
        <a class="nav-link text-reset" @click.prevent="$emit('action', id)" href="#">
            <span v-if="icon !== undefined" :class="iconClass"></span>
            <br>
            <slot></slot>
        </a>
    </li>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        model: {
            event: 'action'
        }
    })
    export default class MenuItem extends Vue {
        @Prop() readonly id!: string;
        @Prop({default: undefined}) readonly icon?: string | undefined;

        get iconClass() {
            if (this.icon === undefined)
                return {};
            const classes: { [clazz: string]: boolean } = {};
            classes['fas'] = true;
            classes['fa-lg'] = true;
            classes['fa-' + this.icon] = true;
            return classes;
        }
    }
</script>

<style scoped lang="scss">
    @import 'src/style/custom';

    li {
        cursor: pointer;
        color: white;
        :hover {
            background-color: $topbar-bg-hover;
        }
    }
</style>