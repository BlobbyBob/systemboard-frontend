<!--
  --  systemboard
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
    <div class="wall row">
        <button class="btn back" v-on:click="prevSegment">Zurück</button>
        <button class="btn forward" v-on:click="nextSegment">Vor</button>
        <br>
        <div v-for="(holds, index) in data" v-bind:key="index">
            <keep-alive>
                <WallSegment v-bind:image="'/dev/' + holds.filename" v-bind:holds="holds.holds" v-bind:visible="index === currentIndex" v-bind:types="types"
                             v-on:action="holdClickHandlerWrapper"/>
            </keep-alive>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import WallSegment from './WallSegment.vue';
    import {Holds} from '@/api/types';

    @Component({
        components: {
            WallSegment
        }
    })
    export default class Wall extends Vue {
        @Prop() readonly data!: Holds[];
        @Prop() readonly types!: { [holdId: number]: 0 | 1 | 2 };
        @Prop() readonly holdClickHandler!: (id: number, e: Event) => void;

        holdClickHandlerWrapper(id: number, e: Event) {
            this.holdClickHandler(id, e);
            this.$children.forEach(v => v.$forceUpdate());
        }

        get currentIndex() {
            return this.internalCurrentIndex;
        }

        set currentIndex(value: number) {
            this.internalCurrentIndex = value;
            this.$emit('indexchange', value);
        }

        private internalCurrentIndex = 0;

        nextSegment() {
            if (this.currentIndex + 1 < this.data.length)
                this.currentIndex++;
        }

        prevSegment() {
            if (this.currentIndex - 1 >= 0)
                this.currentIndex--;
        }
    }
</script>

<style scoped lang="scss">
    .wall {
        min-height: 600px;
    }
</style>