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
    <div class="toggleMark" @click="clickHandler">
        <span v-show="state" class="positive"><i class="far fa-check-square"></i></span>
        <span v-show="!state" class="negative"><i class="far fa-square"></i></span>
        <span class="checkAnimation" :class="animationClass">&#128170;</span>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    model: {
        event: 'input'
    }
})
export default class ToggleMark extends Vue {
    @Prop({default: false}) readonly initialState!: boolean;

    private state: boolean;
    private animationActive: boolean;

    constructor() {
        super();
        this.state = this.initialState;
        this.animationActive = false;
    }

    get value() {
        return this.state ? 1 : 0;
    }

    set value(val) {
        this.state = !!val;
    }

    clickHandler() {
        this.state = !this.state;
        this.animationActive = this.state;
    }

    get animationClass() {
        return {
            active: this.animationActive
        };
    }
}
</script>

<style scoped lang="scss">
.toggleMark {
    cursor: pointer;
    font-size: 1.5em;
    position: relative;

    .checkAnimation {
        position: absolute;
        opacity: 0;
        display: none;
        user-select: none;
    }
    .checkAnimation.active {
        animation: checkAnimation 3s linear;
        display: block;
    }
    @keyframes checkAnimation {
        0% {
            opacity: 0;
            top: 0;
            left: 0;
            font-size: 1em;
        }
        20% {
            opacity: 0.8;
        }
        100% {
            opacity: 0;
            font-size: 2em;
            left: 100px;
            top: -50px;
        }
    }
}
</style>