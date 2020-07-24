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
    <div id="app">
        <div class="container">
            <Header/>
            <hr/>
            <Menu v-bind:menu-data="[
                    {
                        id: 'elem1',
                        label: 'Punkt 1'
                    },
                    {
                        id: 'boulder',
                        label: 'Load Corona Boulder'
                    },
                    {
                        id: 'wall',
                        label: 'Load Wall'
                    },
                    {
                        id: 'search',
                        label: 'Search Boulders'
                    }
                ]" v-bind:menu-click-handler="menuHandler" v-if="isLoggedIn"/>
            <hr/>
            <Login v-bind:login-handler="loginHandler" v-if="!isLoggedIn"/>
            <hr/>
            <Wall v-if="isLoggedIn" v-bind:data="wallData" v-bind:types="holdTypes" v-bind:hold-click-handler="holdClickHandler"/>
            <hr/>
            <div class="container col-12">
                <Ranking v-bind:ranking-items="[
                    {
                        name: 'Mr. Doe',
                        points: 123
                    },
                    {
                        name: 'Ms. Doe',
                        points: 45,
                        icon: 'trophy',
                        iconTooltip: 'Tooltip'
                    }
                ]"/>
            </div>
            <hr/>
            <BoulderInfo v-if="boulder != null" v-bind:name="boulder.name" v-bind:creator="boulder.creator.name" v-bind:description="boulder.description"
                         v-bind:grade="gItoa(boulder.grade)" v-bind:rating="boulder.rating"/>
            <hr/>
            <SearchResults v-bind:search-results-data="searchResults" v-bind:click-handler="loadBoulder"/>
            <hr/>
            <BoulderAddForm v-bind:submit-handler="submitHandler" v-bind:cancel-handler="cancelHandler"/>
            <hr/>
            <SearchForm v-bind:submit-handler="submitHandler" v-bind:cancel-handler="cancelHandler"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from '@/components/Header.vue';
    import Wall from '@/components/wall/Wall.vue';
    import Login from '@/components/Login.vue';
    import Menu from '@/components/menu/Menu.vue';
    import Ranking from '@/components/ranking/Ranking.vue';
    import BoulderInfo from '@/components/BoulderInfo.vue';
    import SearchResults from '@/components/search/SearchResults.vue';
    import BoulderAddForm from '@/components/forms/BoulderAddForm.vue';
    import SearchForm from '@/components/forms/SearchForm.vue';
    import {ApiError} from '@/api';
    import {Boulder, Holds} from '@/api/types';
    import {getBoulder, getHolds, getWall, loginPassword, searchBoulder} from '@/api/interface';
    import {gradeItoa} from '@/types/grades';

    @Component({
        components: {
            SearchForm,
            BoulderAddForm,
            SearchResults,
            BoulderInfo,
            Ranking,
            Menu,
            Login,
            Header,
            Wall
        },
    })
    export default class App extends Vue {
        private isLoggedIn: boolean = (window.sessionStorage.getItem('auth') != null);
        private isSelectionMode = true;
        private wallLoaded = false;
        private wallData: Holds[] = [];
        private holdTypes: { [holdId: number]: 0 | 1 | 2 } = {};
        private searchResults: Boulder[] = [];
        private boulder: Boulder | null = null;

        async loadWall() {
            if (!this.wallLoaded) {
                const wall = await getWall();
                this.wallData = await getHolds(wall.id);

                this.holdTypes = {};
                for (const holds of this.wallData) {
                    for (const hold of holds.holds) {
                        this.holdTypes[hold.id] = 0;
                    }
                }

                this.wallLoaded = true;
            }
        }

        async loadBoulder(id: number) {
            this.boulder = await getBoulder(id);
            if (!this.boulder.holds) {
                console.warn('Loaded boulder is missing the holds list', this.boulder);
                return;
            }

            for (const holds of this.wallData) {
                for (const hold of holds.holds) {
                    if (this.boulder.holds[hold.id] != undefined)
                        this.holdTypes[hold.id] = this.boulder.holds[hold.id];
                    else
                        this.holdTypes[hold.id] = 0;
                }
            }
        }

        async search() {
            this.searchResults = await searchBoulder();
        }

        async loginHandler(email: string, password: string) {
            this.isLoggedIn = true;
            console.log('Login Handler executed');
            console.log('Login data: ', email, password);
            loginPassword(email, password).then(() => {
                console.log('Successful login');
            }).catch((error: ApiError) => {
                console.warn('API error occurred');
                console.warn(error);
            });
        }

        menuHandler(id: string) {
            console.log('Menu entry with id ' + id + ' clicked');
            switch (id) {
                case 'wall':
                    this.loadWall();
                    break;
                case 'boulder':
                    this.loadBoulder(171);
                    break;
                case 'search':
                    this.search();
                    break;
            }
        }

        submitHandler(e: Event) {
            console.log('Submit Handler executed');
            console.log('Submit event: ', e);
        }

        cancelHandler(e: Event) {
            console.log('Cancel Handler executed');
            console.log('Cancel event: ', e);
        }

        holdClickHandler(id: number, e: Event) {
            e.stopPropagation();
            const holdTypes = this.holdTypes;
            if (this.isSelectionMode) {
                if (holdTypes[id] == 2) holdTypes[id] = 0;
                else holdTypes[id] += 1;

                this.holdTypes = holdTypes;
            }
        }

        gItoa(grade: number): string {
            return gradeItoa(grade);
        }
    }
</script>

<style lang="scss">

</style>
