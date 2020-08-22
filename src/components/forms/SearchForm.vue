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
    <div class="searchForm">
        <form @submit.prevent="submitHandlerWrapper">
            <label for="searchName">Name:</label>
            <b-form-input id="searchName" v-model="name" type="text"/>
            <br/>
            <label for="searchCreator">Ersteller:</label>
            <b-form-input id="searchCreator" v-model="creator" type="text"/>
            <br/>
            <fieldset>
                <legend>Bewertung</legend>
                <b-form-radio-group v-model="ratingSelection" name="rating">
                    <b-form-radio value="all">Alle</b-form-radio>
                    <b-form-radio value="limited">Eingeschränkt</b-form-radio>
                </b-form-radio-group>
                <div v-if="ratingSelection === 'limited'" class="d-flex justify-content-center align-items-center">
                    <Stars count="5" initial-value="1" dynamic="true" v-model="minRating"/>
                    <span class="p-3">bis</span>
                    <Stars count="5" initial-value="5" dynamic="true" v-model="maxRating"/>
                </div>
            </fieldset>
            <br/>
            <fieldset>
                <legend>Schwierigkeit</legend>
                <b-form-radio-group v-model="gradeSelection" name="grade">
                    <b-form-radio value="all">Alle</b-form-radio>
                    <b-form-radio value="limited">Eingeschränkt</b-form-radio>
                </b-form-radio-group>
                <div v-if="gradeSelection === 'limited'" class="d-flex justify-content-center align-items-center">
                    <b-form-select v-model="minGrade" :options="gradeOptions"/>
                    <span class="p-3">bis</span>
                    <b-form-select v-model="maxGrade" :options="gradeOptions"/>
                </div>
            </fieldset>
            <!--Todo: Ordering-->
            <button type="submit" class="btn btn-primary m-2">Suchen</button>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import LabelledElement from './LabelledElement.vue';
import {gradeAtoi, Grades} from '@/types/grades';
import {BoulderSearch} from '@/api/types';
import Stars from '@/components/Stars.vue';

@Component({
    components: {Stars, LabelledElement}
})
export default class SearchForm extends Vue {
    private name = '';
    private creator = '';
    private minRating = 1;
    private maxRating = 5;
    private ratingSelection = 'all';
    private gradeSelection = 'all';
    private minGrade: string;
    private maxGrade: string;

    @Prop() readonly submitHandler!: (data: BoulderSearch) => void;

    constructor() {
        super();
        this.minGrade = '5a';
        this.maxGrade = '6a+';
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

    submitHandlerWrapper() {
        const data: BoulderSearch = {};
        if (this.name) data.name = this.name;
        if (this.creator) data.creator = this.creator;
        if (this.gradeSelection == 'limited') {
            data.minGrade = gradeAtoi(this.minGrade);
            data.maxGrade = gradeAtoi(this.maxGrade);
        }
        if (this.ratingSelection == 'limited') {
            data.minRating = +this.minRating;
            data.maxRating = +this.maxRating;
        }
        this.submitHandler(data);
    }
}
</script>

<style scoped lang="scss">
.searchForm {
    text-align: center;
}
</style>