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
        <div v-if="!isLoggedIn" id="login-bg"></div>
        <div v-if="!isLoggedIn" id="login">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div id="login-form" class="col-auto">
                        <Login :login-handler="loginHandler" v-if="!isLoggedIn"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <Menu :menu-data="[
                    {
                        id: 'latest',
                        icon: 'clock',
                        label: 'Neuste'
                    },
                    {
                        id: 'search',
                        icon: 'search',
                        label: 'Suche',
                        modal: 'searchModal'
                    },
                    {
                        id: 'add',
                        icon: 'plus-circle',
                        label: 'Hinzufügen'
                    },
                    {
                        id: 'botd',
                        icon: 'calendar-alt',
                        label: 'Boulder des Tages'
                    },
                    {
                        id: 'ranking',
                        icon: 'sort-numeric-down',
                        label: 'Rangliste'
                    },
                    {
                        id: 'other',
                        icon: 'ellipsis-h',
                        label: 'Sonstiges'
                    }
                ]" :menu-click-handler="menuHandler" v-if="isLoggedIn"/>
            <div class="container">
                <Wall v-if="isLoggedIn" :data="wallData" :types="holdTypes" :hold-click-handler="holdClickHandler"/>
                <BoulderInfo v-if="boulder != null" :name="boulder.name" :creator="boulder.creator.name" :description="boulder.description" :grade="gItoa(boulder.grade)"
                             :rating="boulder.rating"/>
                <SearchResults v-if="showSearchResults" :search-results-data="searchResults" :click-handler="loadBoulder"/>
                <!--                <div class="container col-12">-->
                <!--                    <Ranking v-bind:ranking-items="[-->
                <!--                    {-->
                <!--                        name: 'Mr. Doe',-->
                <!--                        points: 123-->
                <!--                    },-->
                <!--                    {-->
                <!--                        name: 'Ms. Doe',-->
                <!--                        points: 45,-->
                <!--                        icon: 'trophy',-->
                <!--                        iconTooltip: 'Tooltip'-->
                <!--                    }-->
                <!--                ]"/>-->
                <!--                </div>-->
                <!--                <BoulderAddForm v-bind:submit-handler="addBoulder" v-bind:cancel-handler="cancelHandler"/>-->
                <!--                <hr/>-->
            </div>
            <b-modal id="searchModal">
                <SearchForm :submit-handler="searchBoulder" :cancel-handler="cancelHandler"/>
            </b-modal>
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
    import {Boulder, BoulderNew, BoulderSearch, Holds} from '@/api/types';
    import {getBoulder, getHolds, getWall, loginPassword, newBoulder, searchBoulder} from '@/api/interface';
    import {gradeItoa} from '@/types/grades';
    import '@fortawesome/fontawesome-svg-core';
    import '@fortawesome/free-solid-svg-icons';

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
        private isLoggedIn = (window.sessionStorage.getItem('auth') != null);
        private isSelectionMode = false;
        private wall?: Wall;
        private wallLoaded = false;
        private wallData: Holds[] = [];
        private holdTypes: { [holdId: number]: 0 | 1 | 2 } = {};
        private searchResults: Boulder[] = [];
        private showSearchResults = false;
        private boulder: Boulder | null = null;

        constructor() {
            super();
            // If reloaded and session still valid, reload wall
            if (window.sessionStorage.getItem('auth') != null) {
                this.loadWall();
            }
        }

        async loadWall() {
            if (!this.wallLoaded) {
                const wall = await getWall();
                this.wallData = await getHolds(wall.id);

                this.holdTypes = {};
                this.clearWall();

                this.wallLoaded = true;
            }
        }

        async loadBoulder(id: number) {
            this.boulder = await getBoulder(id);
            if (!this.boulder.holds) {
                console.warn('Loaded boulder is missing the holds list', this.boulder);
                return;
            }

            this.clearWall();
            for (const id in this.boulder.holds) {
                this.holdTypes[id] = this.boulder.holds[id];
            }
            this.refreshWall();
        }

        async addBoulder(data: BoulderNew) {
            for (const id in this.holdTypes) {
                if (this.holdTypes[id] > 0) {
                    data.holds.push({
                        id: +id,
                        type: this.holdTypes[id]
                    });
                }
            }
            console.log(data);
            // const response = await newBoulder(data);
            // await this.loadBoulder(response.id);
            this.isSelectionMode = false;
        }

        async searchBoulder(data: BoulderSearch) {
            this.showSearchResults = true;
            this.searchResults = await searchBoulder(data);
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
            }).finally(() => {
                this.loadWall();
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
                case 'selmode':
                    this.isSelectionMode = !this.isSelectionMode;
                    break;
                case 'clear':
                    this.clearWall();
                    break;
            }
        }

        clearWall() {
            this.boulder = null;
            for (const holds of this.wallData) {
                for (const hold of holds.holds) {
                    this.holdTypes[hold.id] = 0;
                }
            }
        }

        refreshWall() {
            if (!this.wall) {
                for (const child of this.$children) {
                    if (child.$options.name == 'Wall' && child instanceof Wall)
                        this.wall = child;
                }
            }
            this.wall?.refresh();
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
    #login-bg {
        position: absolute;
        background-image: url("../public/dev/bg_uni.jpg");
        background-size: cover;
        filter: blur(5px);
        min-height: 100vh;
        min-width: 100vw;
        z-index: -1;
    }

    #login-form {
        margin-top: auto;
        margin-bottom: auto;
        background-color: rgba(240, 240, 240, 0.85);
        padding: 2em;
        border-radius: 4px;
    }

    #login > div > div {
        min-height: 80vh;
    }
</style>
