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
    <div class="row">
        <div class="col-12 mb-3" v-for="change in stats.changelog" :key="change.version">
            <h5>DBS {{ change.version }} vom <em>{{ change.date }}</em></h5>
            <p class="ml-3">{{ change.description }}</p>
            <ul>
                <li v-for="(detail, index) in change.changes" :key="index">{{ detail }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Stats} from '@/api/types';

@Component
export default class Statistics extends Vue {
    @Prop() readonly stats!: Stats | undefined;
    @Prop() readonly refresh!: boolean;

    get statsComputed(): Stats {
        if (this.refresh) true;
        if (!this.stats) return {version: '', changelog: []};
        return this.stats;
    }
}
</script>

<style scoped lang="scss">
li {
    list-style: none;
}
</style>