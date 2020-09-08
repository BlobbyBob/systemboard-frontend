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
    <div class="ranking">
        <table class="table">
            <thead>
            <tr>
                <td class="rank">#</td>
                <td>Name</td>
                <td class="points">Punkte</td>
            </tr>
            </thead>
            <tbody v-for="(item, index) in rankingItems" :key="index">
            <RankingItem :rank="index + 1" :name="item.name" :badge="item.badge" :points="item.score"/>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import RankingItem from './RankingItem.vue';
import {Ranking as RankingType} from '@/api/types';

@Component({
    components: {RankingItem}
})
export default class Ranking extends Vue {
    @Prop() readonly rankingItems!: RankingType[];
}
</script>

<style scoped lang="scss">
.ranking {
    .rank {
        width: 50px;
    }

    .points {
        width: 100px;
    }
}
</style>