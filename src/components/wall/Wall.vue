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
        <div class="w-100 d-flex align-items-stretch">
            <div class="pl-2 pr-2 wall-nav d-flex align-items-center" :class="leftBlink">
                <span class="fas fa-3x fa-arrow-alt-circle-left" @click="prevSegment"></span>
            </div>
            <div class="wall-segments flex-grow-1">
                <div v-for="(holds, index) in data" :key="holds.filename">
                    <keep-alive>
                        <WallSegment :image="'/dev/' + holds.filename" :holds="holds.holds" :visible="index === currentIndex" :types="types" @action="holdClickHandlerWrapper"/>
                    </keep-alive>
                </div>
            </div>
            <div class="pl-2 pr-2 wall-nav d-flex align-items-center" :class="rightBlink">
                <span class="fas fa-3x fa-arrow-alt-circle-right" @click="nextSegment"></span>
            </div>
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
        this.refresh();
    }

    public refresh() {
        this.$children.forEach(v => v.$forceUpdate());
    }

    get currentIndex() {
        return this.internalCurrentIndex;
    }

    set currentIndex(value: number) {
        this.internalCurrentIndex = value;
        this.$emit('indexchange', value);
    }

    get leftBlink() {
        return {blink: true};
    }

    get rightBlink() {
        return {blink: true};
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
    min-width: 1000px;
    width: 100%;
}

.wall-nav {
    cursor: pointer;
}

.blink {
    animation: blink-animation 1.8s infinite ease-in-out;
}

@keyframes blink-animation {
    0%, 100% {
        color: inherit;
    }
    50% {
        color: #F3652C;
    }
}

</style>