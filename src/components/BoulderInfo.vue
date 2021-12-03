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
  <div class="boulderInfo container mb-4">
    <div class="row">
      <div class="col-12 text-center">
        <h3>Boulder Info</h3>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-6 property">Name:</div>
      <div class="col-6 value">{{ name }}</div>
    </div>
    <div class="row align-items-center" v-show="description">
      <div class="col-6 property">Beschreibung:</div>
      <div class="col-6 value">{{ description }}</div>
    </div>
    <div class="row align-items-center">
      <div class="col-6 property">Ersteller:</div>
      <div class="col-6 value">{{ creator }}</div>
    </div>
    <div class="row align-items-center">
      <div class="col-6 property">Schwierigkeit:</div>
      <div class="col-6 value">{{ grade }}</div>
    </div>
    <div class="row align-items-center">
      <div class="col-6 property">Bewertung:</div>
      <div class="col-6 value">
        <Stars :count="5" :dynamic="false" :initial-value="rating" :refresh="true" />
      </div>
    </div>
    <div v-if="boulderOfTheDay" class="row align-items-center">
      <div class="col-6 property">Boulder des Tages geklettert?</div>
      <div class="col-6 value">
        <ToggleMark :initial-state="false" v-model="botdVote" />
      </div>
    </div>
    <div v-if="!boulderOfTheDay" class="row align-items-center">
      <div class="col-6 property">Bereits geklettert?</div>
      <div class="col-6 value">
        <ToggleMark :initial-state="climbed" v-model="climbedVote" />
      </div>
    </div>
    <div v-if="!boulderOfTheDay" class="row align-items-center">
      <div class="col-6 property">Bewerten:</div>
      <div class="col-6 value">
        <Stars :count="5" :dynamic="true" :initial-value="0" v-model="ratingVote" :refresh="true" />
      </div>
    </div>
    <div v-if="!boulderOfTheDay" class="row align-items-center">
      <div class="col-6 property">Schwierigkeit:</div>
      <div class="col-6 value">
        <select v-model="gradeVote" class="form-select w-auto">
          <option v-for="option of gradeOptions" :value="option.value" :key="option.value">{{ option.value }}</option>
        </select>
      </div>
    </div>
    <div class="text-center">
      <button v-if="deletable" class="btn btn-danger" @click="$emit('delete', id)">Boulder löschen</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stars from "@/components/Stars.vue";
import { gradeAtoi, Grades } from "@/types/grades";
import ToggleMark from "@/components/ToggleMark.vue";
import { putBoulderOfTheDay, putClimbed, putVote } from "@/api/interface";

export default defineComponent({
  name: "BoulderInfo",
  components: { ToggleMark, Stars },
  model: {
    event: "delete",
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: String,
    description: String,
    creator: String,
    deletable: {
      type: Boolean,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    climbed: {
      type: Boolean,
      required: true,
    },
    boulderOfTheDay: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      botdClimbed: false,
      internalClimbed: false,
      internalGradeVote: 0,
      internalRatingVote: 0,
    };
  },
  created() {
    this.internalGradeVote = gradeAtoi(this.grade);
    this.internalRatingVote = this.rating;
    this.internalClimbed = this.climbed;
  },
  computed: {
    botdVote: {
      get(): boolean {
        return this.botdClimbed;
      },
      set(climbed: boolean) {
        this.botdClimbed = climbed;
        putBoulderOfTheDay({ climbed: this.botdClimbed });
      },
    },
    climbedVote: {
      get(): boolean {
        return this.internalClimbed;
      },
      set(climbed: boolean) {
        this.internalClimbed = climbed;
        putClimbed(this.id, { climbed: climbed });
      },
    },
    gradeVote: {
      get(): number {
        return this.internalGradeVote;
      },
      set(grade: number) {
        this.internalGradeVote = grade;
        putVote(this.id, { grade: grade });
      },
    },
    ratingVote: {
      get(): number {
        return this.internalRatingVote;
      },
      set(rating: number) {
        this.internalRatingVote = rating;
        putVote(this.id, { rating: rating });
      },
    },
    gradeOptions(): { text: string; value: number }[] {
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
});
</script>

<style scoped lang="scss">
.boulderInfo {
  .property {
    text-align: right;
  }

  > div {
    margin-bottom: 0.5rem;
  }
}
</style>
