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
    <div class="stars" :class="{'dynamic': dynamic}">
        <span v-for="star in starArray" :key="star.id" :class="'star-'+star.id" @click="clickHandler(star.id)" @mouseenter="mouseenterHandler(star.id)"
              @mouseleave="mouseleaveHandler()">
            <i class="positive fas fa-star" v-show="star.selected"></i>
            <i class="negative far fa-star" v-show="!star.selected"></i>
        </span>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    model: {
        event: 'input'
    }
})
export default class Stars extends Vue {
    @Prop() readonly dynamic!: boolean;
    @Prop() readonly count!: number;
    @Prop({default: 0}) readonly initialValue!: number;

    private internalValue: number;
    private hoverValue = -1;

    constructor() {
        super();
        this.internalValue = this.initialValue;
    }

    get starArray(): { id: number; selected: boolean }[] {
        const stars = [];
        for (let i = 0; i < this.count; i++) {
            stars.push({
                id: i,
                selected: !this.dynamic || this.hoverValue < 0 ? i < this.value : i < this.hoverValue
            });
        }
        return stars;
    }

    get value(): number {
        return this.internalValue;
    }

    set value(value: number) {
        this.internalValue = value;
    }

    clickHandler(id: number) {
        if (this.dynamic) {
            this.internalValue = id + 1;
            this.$emit('input', {
                value: this.value
            });
        }
    }

    mouseenterHandler(id: number) {
        this.hoverValue = id + 1;
    }

    mouseleaveHandler() {
        this.hoverValue = -1;
    }
}
</script>

<style scoped lang="scss">
.stars {
    color: #ffbb00;
}

.stars.dynamic {
    .positive, .negative {
        cursor: pointer;
    }
}
</style>