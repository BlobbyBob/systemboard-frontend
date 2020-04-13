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
        <h3>Boulder suchen</h3>
        <form v-on:submit.prevent="submitHandler">
            <LabelledElement label="Name:">
                <input type="text" name="name"/>
            </LabelledElement>
            <br/>
            <LabelledElement label="Ersteller:">
                <input type="text" name="creator"/>
            </LabelledElement>
            <br/>
            <fieldset>
                <legend>Bewertung</legend>
                <LabelledElement label="Alle" v-bind:before="false">
                    <input type="radio" name="rating" value="all" checked v-model="ratingSelection"/>
                </LabelledElement>
                <LabelledElement label="Eingeschränkt" v-bind:before="false">
                    <input type="radio" name="rating" value="limited" v-model="ratingSelection"/>
                </LabelledElement>
                <div v-show="ratingSelection === 'limited'">
                    <LabelledElement label="Zwischen:">
                        <input type="number" name="minRating" value="1" min="1" max="5" step="1"/>
                    </LabelledElement>
                    <br/>
                    <LabelledElement label="Und:">
                        <input type="number" name="maxRating" value="5" min="1" max="5" step="1"/>
                    </LabelledElement>
                </div>
            </fieldset>
            <br/>
            <fieldset>
                <legend>Schwierigkeit</legend>
                <LabelledElement label="Alle" v-bind:before="false">
                    <input type="radio" name="rating" value="all" checked v-model="gradeSelection"/>
                </LabelledElement>
                <LabelledElement label="Eingeschränkt" v-bind:before="false">
                    <input type="radio" name="rating" value="limited" v-model="gradeSelection"/>
                </LabelledElement>
                <div v-show="gradeSelection === 'limited'">
                    <LabelledElement label="Zwischen:">
                        <select name="minGrade">
                            <option v-for="grade in grades" v-bind:key="grade" v-bind:value="grade"
                                    v-bind:selected="grade === defaultMinGrade">
                                {{ grade }}
                            </option>
                        </select>
                    </LabelledElement>
                    <br/>
                    <LabelledElement label="Und:">
                        <select name="maxGrade">
                            <option v-for="grade in grades" v-bind:key="grade" v-bind:value="grade"
                                    v-bind:selected="grade === defaultMaxGrade">
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
            <button type="submit">Hinzufügen</button>
            <button type="button" v-on:click="cancelHandler">Abbrechen</button>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import LabelledElement from './LabelledElement.vue';
    import {Grades} from '@/types/grades';

    @Component({
        components: {LabelledElement}
    })
    export default class SearchForm extends Vue {
        private ratingSelection = 'all';
        private gradeSelection = 'all';
        private readonly defaultMinGrade = '5';
        private readonly defaultMaxGrade = '6a';
        private readonly grades = Grades;

        @Prop() readonly submitHandler!: (e: Event) => void;
        @Prop() readonly cancelHandler!: (e: Event) => void;
    }
</script>

<style scoped lang="scss">
    .searchForm {
        text-align: center;
    }
</style>