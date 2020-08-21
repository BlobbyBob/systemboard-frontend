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
                <b-form-radio name="rating" v-model="ratingSelection" value="all">Alle</b-form-radio>
                <b-form-radio name="rating" v-model="ratingSelection" value="limited">Eingeschränkt</b-form-radio>
                <div v-show="ratingSelection === 'limited'">
                    <Stars count="5" initial-value="1" dynamic="true" v-model="minRating"/>
                    <br>
                    <Stars count="5" initial-value="5" dynamic="true" v-model="maxRating"/>
                </div>
            </fieldset>
            <br/>
            <fieldset>
                <legend>Schwierigkeit</legend>
                <LabelledElement label="Alle" :before="false">
                    <input type="radio" name="grade" value="all" checked v-model="gradeSelection"/>
                </LabelledElement>
                <LabelledElement label="Eingeschränkt" :before="false">
                    <input type="radio" name="grade" value="limited" v-model="gradeSelection"/>
                </LabelledElement>
                <div v-show="gradeSelection === 'limited'">
                    <LabelledElement label="Zwischen:">
                        <select name="minGrade" v-model="minGrade">
                            <option v-for="grade in grades" :key="grade" :value="grade" :selected="grade === defaultMinGrade">
                                {{ grade }}
                            </option>
                        </select>
                    </LabelledElement>
                    <br/>
                    <LabelledElement label="Und:">
                        <select name="maxGrade" v-model="maxGrade">
                            <option v-for="grade in grades" :key="grade" :value="grade" :selected="grade === defaultMaxGrade">
                                {{ grade }}
                            </option>
                        </select>
                    </LabelledElement>
                    <br/>
                    <LabelledElement label="Und:">
                        <input type="number" name="maxRating" value="5" min="1" max="5" step="1"/>
                    </LabelledElement>
                </div>
            </fieldset>
            <button type="submit" class="btn btn-primary m-2">Suchen</button>
            <button type="button" class="btn btn-secondary m-2" @click="cancelHandler">Abbrechen</button>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import LabelledElement from './LabelledElement.vue';
import {gradeAtoi, gradeItoa, Grades} from '@/types/grades';
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
    private minGrade = '4';
    private maxGrade = '8a+';
    private ratingSelection = 'all';
    private gradeSelection = 'all';
    private readonly defaultMinGrade = '5';
    private readonly defaultMaxGrade = '6a';
    private readonly grades = Grades;

    @Prop() readonly submitHandler!: (data: BoulderSearch) => void;
    @Prop() readonly cancelHandler!: (e: Event) => void;

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