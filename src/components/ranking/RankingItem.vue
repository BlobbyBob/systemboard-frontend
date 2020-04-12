<!--
  --  systemboard
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
    <tr>
        <td>{{ rank }}</td>
        <td>
            {{ name }}
            <span v-if="icon !== undefined">
                &nbsp;
                <span v-bind:class="iconClass"></span>
                <span v-if="iconTooltip !== undefined">&nbsp;({{ iconTooltip }})</span>
            </span>
        </td>
        <td>{{ points }}</td>
    </tr>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class RankingItem extends Vue {
        @Prop() rank!: number;
        @Prop() name!: string;
        @Prop() icon?: string | undefined;
        @Prop() iconTooltip?: string | undefined;
        @Prop() points!: number;

        get iconClass() {
            if (this.icon === undefined)
                return {};
            // eslint-disable-next-line
            const classes: any = {};
            classes['icon-' + this.icon] = true;
            return classes;
        }
    }
</script>

<style scoped lang="scss">

</style>