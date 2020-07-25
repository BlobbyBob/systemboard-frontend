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
        <h3>Boulder hinzufügen</h3>
        <form v-on:submit.prevent="submitHandlerWrapper">
            <LabelledElement label="Name:">
                <input type="text" name="name" maxlength="50" v-model="name"/>
            </LabelledElement>
            <br/>
            <LabelledElement label="Beschreibung:">
                <textarea name="description" v-model="description"></textarea>
            </LabelledElement>
            <br/>
            <LabelledElement label="Schwierigkeit:">
                <select name="grade" v-model="grade">
                    <option v-for="grade in grades" v-bind:key="grade" v-bind:value="grade" v-bind:selected="grade === defaultGrade">
                        {{ grade }}
                    </option>
                </select>
            </LabelledElement>
            <br/>
            <LabelledElement label="Bewertung">
                <input type="number" name="rating" min="1" max="5" step="1" v-model="rating"/>
            </LabelledElement>
            <br/>
            <button type="submit">Hinzufügen</button>
            <button type="button" v-on:click="cancelHandler">Abbrechen</button>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import LabelledElement from './LabelledElement.vue';
    import {gradeAtoi, Grades} from '@/types/grades';
    import {BoulderNew} from '@/api/types';

    @Component({
        components: {LabelledElement}
    })
    export default class BoulderAddForm extends Vue {
        private name = '';
        private description = '';
        private grade = '';
        private rating = 1;
        private readonly grades = Grades;
        private readonly defaultGrade = '5';

        @Prop() readonly submitHandler!: (data: BoulderNew) => void;
        @Prop() readonly cancelHandler!: (e: Event) => void;

        submitHandlerWrapper() {
            const data: BoulderNew = {
                name: this.name,
                grade: gradeAtoi(this.grade),
                stars: +this.rating,
                holds: []
            };
            this.submitHandler(data);
        }
    }
</script>

<style scoped lang="scss">
    .boulderAddForm {
        text-align: center;
    }
</style>