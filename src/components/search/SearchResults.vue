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
            <SearchResult v-for="(result, index) in searchResultsData" v-bind:key="index" v-bind:data="result"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {SearchResultData} from '@/types/SearchResultData';
    import SearchResult from './SearchResult.vue';

    @Component({
        components: {SearchResult}
    })
    export default class SearchResults extends Vue {
        @Prop() readonly searchResultsData!: SearchResultData[];
    }
</script>

<style scoped lang="scss">

</style>