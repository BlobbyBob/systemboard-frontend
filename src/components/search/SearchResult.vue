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
  <div @click="$emit('action', data.id)" class="m-2 searchResult">
    <div class="searchResultHead pl-2 pr-2">
      <span class="name">{{ data.name }}</span> <small>von {{ data.creator.name }}</small>
    </div>
    <hr />
    <div class="pl-2 pr-2">
      Schwierigkeit: {{ gItoa(data.grade) }}
      <Stars :dynamic="false" count="5" :initial-value="data.rating" :refresh="refresh" />
      {{ data.ascents }}x geklettert
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Boulder } from "@/api/types";
import { gradeItoa } from "@/types/grades";
import Stars from "@/components/Stars.vue";

export default defineComponent({
  name: "SearchResult",
  components: { Stars },
  emits: ["action"],
  props: {
    data: {
      type: Object as () => Boulder,
      required: true,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    gItoa(grade: number): string {
      return gradeItoa(grade);
    },
  },
});
</script>

<style scoped lang="scss">
.searchResult {
  border: 1px solid black;
  cursor: pointer;
  padding: 0;
}

.searchResult:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.searchResultHead {
  font-size: 1.3em;
}

hr {
  margin: 0;
  border-color: black;
}
</style>
