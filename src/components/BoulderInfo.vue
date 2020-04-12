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
    <div class="boulderInfo container">
        <div class="row">
            <div class="col-6 property">Name:</div>
            <div class="col-6 value">{{ name }}</div>
        </div>
        <div class="row">
            <div class="col-6 property">Beschreibung:</div>
            <div class="col-6 value">{{ description }}</div>
        </div>
        <div class="row">
            <div class="col-6 property">Ersteller:</div>
            <div class="col-6 value">{{ creator }}</div>
        </div>
        <div class="row">
            <div class="col-6 property">Schwierigkeit:</div>
            <div class="col-6 value">{{ grade }}</div>
        </div>
        <div class="row">
            <div class="col-6 property">Bewertung:</div>
            <div class="col-6 value">{{ rating + " Sterne" }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class BoulderInfo extends Vue {
        @Prop() name!: string;
        @Prop() description!: string;
        @Prop() creator!: string;
        @Prop() grade!: string;
        @Prop() rating!: number;
    }
</script>

<style scoped lang="scss">
.boulderInfo {
    .property {
        text-align: right;
    }
}
</style>