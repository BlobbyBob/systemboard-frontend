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
        <form v-on:submit.prevent="submitHandler">
            <LabelledElement label="Name:">
                <input type="text" name="name" maxlength="50"/>
            </LabelledElement>
            <br/>
            <LabelledElement label="Beschreibung:">
                <textarea name="description"></textarea>
            </LabelledElement>
            <br/>
            <LabelledElement label="Schwierigkeit:">
                <select name="grade">
                    <option v-for="grade in grades" v-bind:key="grade" v-bind:value="grade">
                        {{ grade }}
                    </option>
                </select>
            </LabelledElement>
            <br/>
            <LabelledElement label="Bewertung">
                <input type="number" name="rating" min="1" max="5" step="1"/>
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
    import {Grades} from '@/types/grades';

    @Component({
        components: {LabelledElement}
    })
    export default class BoulderAddForm extends Vue {
        private readonly grades = Grades;

        @Prop() readonly submitHandler!: (e: Event) => void;
        @Prop() readonly cancelHandler!: (e: Event) => void;
    }
</script>

<style scoped lang="scss">
    .boulderAddForm {
        text-align: center;
    }
</style>