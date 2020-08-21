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
            <div class="col-6 value">
                <Stars count="5" :dynamic="false" :initial-value="rating"/>
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col-6 property">Bereits geklettert?</div>
            <div class="col-6 value">
                <ToggleMark v-model="climbed"/>
            </div>
        </div>
        <div class="row">
            <div class="col-6 property">Bewerten:</div>
            <div class="col-6 value">
                <Stars count="5" :dynamic="true" :initial-value="0" v-model="ratingVote"/>
            </div>
        </div>
        <div class="row">
            <div class="col-6 property">Schwierigkeit:</div>
            <div class="col-6 value">
                <b-form-select v-model="gradeVote" :options="gradeOptions"></b-form-select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Stars from '@/components/Stars.vue';
import {gradeAtoi, Grades} from '@/types/grades';
import ToggleMark from '@/components/ToggleMark.vue';

@Component({
    components: {ToggleMark, Stars}
})
export default class BoulderInfo extends Vue {
    @Prop() name!: string;
    @Prop() description!: string;
    @Prop() creator!: string;
    @Prop() grade!: string;
    @Prop() rating!: number;

    private internalGradeVote = this.grade;
    private internalRatingVote = this.rating;
    private internalClimbed = false; // todo

    get climbed() {
        return this.internalClimbed;
    }

    set climbed(climbed: boolean) {
        // todo make api call
        this.internalClimbed = climbed;
    }

    get gradeVote() {
        return this.internalGradeVote;
    }

    set gradeVote(grade: string) {
        // todo make api call
        this.internalGradeVote = grade;
    }

    get ratingVote() {
        return this.internalRatingVote;
    }

    set ratingVote(rating: number) {
        // todo make api call
        this.internalRatingVote = rating;
    }

    get gradeOptions() {
        const options = [];
        for (const grade of Grades) {
            options.push({
                text: grade,
                value: gradeAtoi(grade)
            });
        }
        return options;
    }
}
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