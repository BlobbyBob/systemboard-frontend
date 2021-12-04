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
        <SearchResult :data="result" @click="(id) => $emit('click', id)" :refresh="refresh" />
      </div>
    </div>
    <nav class="row mt-3" v-if="pages > 1">
      <ul class="pagination justify-content-center">
        <li
          v-for="pageItem of pageItems"
          class="page-item"
          :key="pageItem.id"
          :class="{ disabled: pageItem.disabled && !pageItem.active, active: pageItem.active }"
        >
          <a
            v-if="!pageItem.disabled"
            class="page-link"
            :class="{ 'fw-bold': pageItem.active }"
            href="#"
            @click.prevent="!pageItem.disabled && $emit('page', pageItem.id)"
          >
            {{ pageItem.label }}
          </a>
          <a v-else class="page-link" :class="{ 'fw-bold': pageItem.active }">
            {{ pageItem.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResult from "./SearchResult.vue";
import { Boulder } from "@/api/types";

export default defineComponent({
  name: "SearchResults",
  components: { SearchResult },
  emits: ["click", "page"],
  props: {
    searchResultsData: {
      type: Array as () => Boulder[],
      required: true,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    pages: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    searchResults() {
      if (this.refresh) true;
      return this.searchResultsData;
    },
    pageItems(): { label: string; active: boolean; disabled: boolean; id: number }[] {
      const items = [
        {
          label: "«",
          disabled: this.page == 1,
          active: false,
          id: -2,
        },
      ];

      if (this.pages <= 7) {
        for (let i = 1; i <= this.pages; i++) {
          items.push({
            label: i.toString(),
            disabled: this.page == i,
            active: this.page == i,
            id: i,
          });
        }
      } else {
        if (this.page <= 4) {
          for (let i = 1; i <= this.page + 1; i++) {
            items.push({
              label: i.toString(),
              disabled: this.page == i,
              active: this.page == i,
              id: i,
            });
          }
          items.push({
            label: "...",
            disabled: true,
            active: false,
            id: 0,
          });
          items.push({
            label: this.pages.toString(),
            disabled: false,
            active: false,
            id: this.pages,
          });
        } else if (this.page >= this.pages - 3) {
          items.push({
            label: "1",
            disabled: false,
            active: false,
            id: 1,
          });
          items.push({
            label: "...",
            disabled: true,
            active: false,
            id: 0,
          });
          for (let i = this.page - 1; i <= this.pages; i++) {
            items.push({
              label: i.toString(),
              disabled: this.page == i,
              active: this.page == i,
              id: i,
            });
          }
        } else {
          items.push({
            label: "1",
            disabled: false,
            active: false,
            id: 1,
          });
          items.push({
            label: "...",
            disabled: true,
            active: false,
            id: 0,
          });
          for (let i = this.page - 1; i <= this.page + 1; i++) {
            items.push({
              label: i.toString(),
              disabled: this.page == i,
              active: this.page == i,
              id: i,
            });
          }
          items.push({
            label: "...",
            disabled: true,
            active: false,
            id: 0,
          });
          items.push({
            label: this.pages.toString(),
            disabled: false,
            active: false,
            id: this.pages,
          });
        }
      }

      items.push({
        label: "»",
        disabled: this.page == this.pages,
        active: false,
        id: -1,
      });
      return items;
    },
  },
});
</script>

<style scoped lang="scss"></style>
