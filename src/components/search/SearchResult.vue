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
    <div class="searchResult col-12 col-md-6 col-lg-4 col-xl-3" v-on:click="$emit('action', data.id)">
        <span class="name">{{ data.name }}</span> <small>von {{ data.creator.name }}</small><br>
        Schwierigkeit: {{ gItoa(data.grade) }}<br>
        {{ data.rating }} Sterne<br>
        {{ data.ascents }}x geklettert
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Boulder} from '@/api/types';
    import {gradeItoa} from '@/types/grades';

    @Component({
        model: {
            event: 'action'
        }
    })
    export default class SearchResult extends Vue {
        @Prop() readonly data!: Boulder;

        gItoa(grade: number): string {
            return gradeItoa(grade);
        }
    }
</script>

<style scoped lang="scss">

</style>