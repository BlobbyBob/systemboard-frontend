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
    <div class="wallSegment col-12" v-bind:class="{ hidden: !visible }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 670">
            <image x="0" y="0" width="1000px" height="670px" :xlink:href="image"></image>
            <g class="holds">
                <Hold v-for="(hold, index) in holdsFiltered" v-bind:key="index" v-bind:id="hold.id" v-bind:tag="hold.tag" v-bind:attr="hold.attr" v-bind:type="types[hold.id]"/>
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Hold as HoldType} from '@/api/types';
    import Hold from '@/components/wall/Hold.vue';

    @Component({
        components: {
            Hold
        }
    })
    export default class WallSegment extends Vue {
        @Prop() readonly image!: string;
        @Prop() readonly holds!: HoldType[];
        @Prop() readonly types!: {[holdId: number]: 0 | 1 | 2};
        @Prop() visible!: boolean;

        get holdsFiltered(): HoldType[] {
            return this.holds;
        }
    }
</script>

<style scoped lang="scss">
    .hidden {
        display: none;
    }
</style>