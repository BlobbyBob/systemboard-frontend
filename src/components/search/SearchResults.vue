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
      <h3 class="col-12 text-center">Suchergebnisse</h3>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4" v-for="(result, index) in searchResults" :key="index">
        <SearchResult :data="result" @action="clickHandler" :refresh="refresh" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResult from "./SearchResult.vue";
import { Boulder } from "@/api/types";

export default defineComponent({
  name: "SearchResults",
  components: { SearchResult },
  emits: ["click"],
  props: {
    searchResultsData: {
      type: Array as () => Boulder[],
      required: true,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    searchResults() {
      if (this.refresh) true;
      return this.searchResultsData;
    },
  },
});
</script>

<style scoped lang="scss"></style>
