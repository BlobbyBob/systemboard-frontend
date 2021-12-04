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
  <div class="boulderAddForm">
    <h3 class="text-center mb-4">Boulder hinzufügen</h3>
    <form @submit.prevent="submitHandlerWrapper">
      <div class="row align-items-center mb-3">
        <div class="col-12 col-md-3">Name</div>
        <div class="col-12 col-md-9">
          <b-form-input type="text" maxlength="50" v-model="name" required />
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-12 col-md-3">Beschreibung</div>
        <div class="col-12 col-md-9">
          <b-form-textarea v-model="description" placeholder="optional" />
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-12 col-md-3">Schwierigkeit</div>
        <div class="col-12 col-md-9">
          <b-form-select v-model="grade" id="addGrade" :options="gradeOptions" required />
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-12 col-md-3">Bewertung</div>
        <div class="col-12 col-md-9 text-center h4">
          <Stars :dynamic="true" count="5" initial-value="1" v-model="rating" />
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary m-2">Hinzufügen</button>
        <button type="button" class="btn btn-secondary m-2" @click="(e) => $emit('cancel', e)">Abbrechen</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gradeAtoi, Grades } from "@/types/grades";
import { BoulderNew } from "@/api/types";
import Stars from "@/components/Stars.vue";

export default defineComponent({
  name: "BoulderAddForm",
  components: { Stars },
  emits: ["submit", "cancel"],
  data() {
    return {
      name: "",
      description: "",
      grade: 10,
      rating: 1,
      grades: Grades,
    };
  },
  computed: {
    gradeOptions() {
      const options = [];
      for (const grade of Grades) {
        options.push({
          text: grade,
          value: gradeAtoi(grade),
        });
      }
      return options;
    },
  },
  methods: {
    submitHandlerWrapper() {
      const data: BoulderNew = {
        name: this.name,
        grade: this.grade,
        stars: +this.rating,
        holds: [],
      };
      this.$emit("submit", data);
    },
  },
});
</script>

<style scoped lang="scss"></style>
