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
    <div class="searchResults container">
        <div class="row">
            <SearchResult v-for="(result, index) in searchResultsData" v-bind:key="index" v-bind:data="result" v-on:action="clickHandler"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SearchResult from './SearchResult.vue';
    import {Boulder} from '@/api/types';

    @Component({
        components: {SearchResult}
    })
    export default class SearchResults extends Vue {
        @Prop() readonly searchResultsData!: Boulder[];
        @Prop() readonly clickHandler!: (id: number) => void;
    }
</script>

<style scoped lang="scss">

</style>