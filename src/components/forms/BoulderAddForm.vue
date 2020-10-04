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
                    <b-form-input type="text" maxlength="50" v-model="name" required/>
                </div>
            </div>
            <div class="row align-items-center mb-3">
                <div class="col-12 col-md-3">Beschreibung</div>
                <div class="col-12 col-md-9">
                    <b-form-textarea v-model="description" placeholder="optional"/>
                </div>
            </div>
            <div class="row align-items-center mb-3">
                <div class="col-12 col-md-3">Schwierigkeit</div>
                <div class="col-12 col-md-9">
                    <b-form-select v-model="grade" id="addGrade" :options="gradeOptions" required/>
                </div>
            </div>
            <div class="row align-items-center mb-3">
                <div class="col-12 col-md-3">Bewertung</div>
                <div class="col-12 col-md-9 text-center h4">
                    <Stars :dynamic="true" count="5" initial-value="1" v-model="rating"/>
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary m-2">Hinzufügen</button>
                <button type="button" class="btn btn-secondary m-2" @click="cancelHandler">Abbrechen</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import LabelledElement from './LabelledElement.vue';
import {gradeAtoi, gradeItoa, Grades} from '@/types/grades';
import {BoulderNew} from '@/api/types';
import Stars from '@/components/Stars.vue';

@Component({
    components: {Stars, LabelledElement}
})
export default class BoulderAddForm extends Vue {
    private name = '';
    private description = '';
    private grade = '';
    private rating = 1;
    private readonly grades = Grades;
    private readonly defaultGrade = gradeItoa('5');

    @Prop() readonly submitHandler!: (data: BoulderNew) => void;
    @Prop() readonly cancelHandler!: (e: Event) => void;

    submitHandlerWrapper() {
        const data: BoulderNew = {
            name: this.name,
            grade: this.grade,
            stars: +this.rating,
            holds: []
        };
        this.submitHandler(data);
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

</style>