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
    <div id="progress"></div>
    <div v-if="!isLoggedIn" id="login-bg"></div>
    <div v-if="!isLoggedIn" id="login">
      <div class="container loginContainer">
        <div class="row justify-content-center align-items-center">
          <div id="login-form" class="col-auto">
            <Login @login="loginHandler" :register-mode="registerMode" v-if="!isLoggedIn" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Menu
        :menu-data="[
          {
            id: 'latest',
            icon: 'clock',
            label: 'Neuste',
          },
          {
            id: 'search',
            icon: 'search',
            label: 'Suche',
            modal: 'searchModal',
          },
          {
            id: 'notdoneyet',
            icon: 'list',
            label: 'Noch nicht gemacht',
          },
          {
            id: 'botd',
            icon: 'calendar-alt',
            label: 'Boulder des Tages',
          },
          {
            id: 'add',
            icon: 'plus-circle',
            label: 'Hinzufügen',
          },
          {
            id: 'ranking',
            icon: 'sort-numeric-down',
            label: 'Rangliste',
          },
          {
            id: 'other',
            icon: 'ellipsis-h',
            label: 'Sonstiges',
          },
        ]"
        :sub-menu-data="[
          {
            id: 'faq',
            label: 'FAQ',
          },
          {
            id: 'about',
            label: 'Über DBS',
          },
          {
            id: 'editor',
            label: 'Editor',
          },
          {
            id: 'impressum',
            label: 'Impressum',
          },
          {
            id: 'privacy',
            label: 'Datenschutzerklärung',
          },
          {
            id: 'logout',
            label: 'Abmelden',
          },
        ]"
        @click="menuHandler"
        :show-sub-menu="showSubMenu"
        v-if="isLoggedIn"
      />
      <div class="container bg-white pr-0 pl-0 pt-lg-4 pb-5">
        <Wall
          v-if="isLoggedIn"
          :data="wallData"
          :types="holdTypes"
          @click="holdClickHandler"
          :refresh-arrows="refreshArrows"
          ref="wall"
        />
        <div class="mt-3"></div>
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl4">
            <BoulderAddForm v-if="isSelectionMode" @submit="addBoulder" @cancel="cancelSelectionMode" />
          </div>
        </div>
        <BoulderInfo
          v-if="boulder != null"
          :id="boulder.id"
          :name="boulder.name"
          :creator="boulder.creator.name"
          :description="boulder.description"
          :grade="gItoa(boulder.grade)"
          :rating="boulder.rating"
          :climbed="boulder.climbed"
          :boulder-of-the-day="isBoulderOfTheDay"
          :deletable="boulder.deletable"
          @delete="askForDeletion"
        />
        <div class="mt-3"></div>
        <SearchResults
          v-if="showSearchResults"
          :search-results-data="searchResults.results"
          :refresh="searchResultsRefresh"
          :pages="searchResults.pages"
          :page="searchResultsPage"
          @click="loadBoulder"
          @page="paginationHandler"
        />
      </div>
      <b-modal id="searchModal" title="Boulder Suchen" hide-footer>
        <SearchForm @submit="searchBoulder" />
      </b-modal>
      <b-modal id="rankingModal" title="Rangliste" ok-only ok-title="Schließen">
        <Ranking :ranking-items="ranking" />
      </b-modal>
      <b-modal id="faqModal" title="FAQ" ok-only ok-title="Schließen">
        <p class="question">
          <strong>Wie komme ich auf Platz 1 der Rangliste?</strong><br />
          <i>Spenden können gerne in der Unihalle hinterlegt werden.</i>
        </p>
      </b-modal>
      <b-modal id="statsModal" :title="stats ? stats.version : ''" size="lg" ok-only ok-title="Schließen">
        <Statistics :stats="stats" :refresh="statsRefresh" />
      </b-modal>
      <b-modal
        id="deleteModal"
        title="Boulder löschen"
        ok-variant="danger"
        ok-title="Löschen"
        cancel-title="Abbrechen"
        @ok="reallyDeleteBoulder"
        @cancel="boulderToDelete = undefined"
      >
        Möchtest du diesen Boulder wirklich löschen?
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import Wall from "@/components/wall/Wall.vue";
import Login from "@/components/Login.vue";
import Menu from "@/components/menu/Menu.vue";
import Ranking from "@/components/ranking/Ranking.vue";
import BoulderInfo from "@/components/BoulderInfo.vue";
import SearchResults from "@/components/search/SearchResults.vue";
import BoulderAddForm from "@/components/forms/BoulderAddForm.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import Statistics from "@/components/Statistics.vue";
import BModal from "@/components/bootstrap/BModal.vue";
import {
  Boulder,
  BoulderNew,
  BoulderSearch,
  Holds,
  Ranking as RankingType,
  SearchResults as SearchResultsType,
  Stats,
} from "@/api/types";
import {
  deleteBoulder,
  getBoulder,
  getBoulderOfTheDay,
  getHolds,
  getRanking,
  getStats,
  getWall,
  loginPassword,
  logout,
  newBoulder,
  postRegistration,
  searchBoulder,
} from "@/api/interface";
import { gradeItoa } from "@/types/grades";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import { setApiVue, setAuthentication } from "@/api";
import { bControls } from "@/plugins/BootstrapControls";
import { useToast } from "vue-toastification";
import { ProgressStatus } from "@/plugins/ProgressStatus";
import { max, min } from "@popperjs/core/lib/utils/math";

export default defineComponent({
  name: "Systemboard",
  components: {
    BModal,
    Statistics,
    SearchForm,
    BoulderAddForm,
    SearchResults,
    BoulderInfo,
    Ranking,
    Menu,
    Login,
    Wall,
  },
  setup() {
    let bControls = {} as bControls;
    const x: bControls | undefined = inject("bControls");
    if (x !== undefined) {
      bControls = x;
    } else {
      console.warn("Plugin bControls missing");
    }

    let progress = (() => true) as (status: ProgressStatus) => void;
    const y: ((status: ProgressStatus) => void) | undefined = inject("progress");
    if (y !== undefined) {
      progress = y;
    } else {
      console.warn("Plugin progress missing");
    }

    const toast = useToast();
    return {
      bControls,
      toast,
      progress,
    };
  },
  beforeMount() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setApiVue(this);
    if (this.isLoggedIn) {
      this.loadWall();
    }
    setTimeout(() => {
      this.mail = decodeURIComponent("%6d%61%69lto%3A%73y%73te%6dbo%61rd%40d%69g%69t%61lbre%61d.de");
    }, 1500);
  },
  data() {
    return {
      isLoggedIn: window.sessionStorage.getItem("auth") != null && window.sessionStorage.getItem("auth") != "Login",
      isGuest: window.sessionStorage.getItem("auth")?.toLowerCase() == "guest",
      isPrivileged: window.sessionStorage.getItem("privileged")?.toLowerCase() == "1",
      isSelectionMode: false,
      isBoulderOfTheDay: false,
      wall: undefined as typeof Wall | undefined,
      wallLoaded: false,
      wallData: [] as Holds[],
      holdTypes: {} as { [holdId: number]: 0 | 1 | 2 },
      searchResults: { results: [], pages: 0 } as SearchResultsType,
      searchResultsPage: 1,
      searchLastQuery: {} as BoulderSearch,
      searchResultsRefresh: false,
      showSearchResults: false,
      boulder: null as Boulder | null,
      boulderToDelete: undefined as number | undefined,
      ranking: [] as RankingType[],
      refreshArrows: false,
      showSubMenu: false,
      mail: "",
      stats: null as Stats | null,
      statsRefresh: false,
      registerMode: false,
    };
  },
  methods: {
    async loadWall() {
      if (!this.wallLoaded) {
        const wall = await getWall();
        if (!wall) return;
        this.wallData = (await getHolds(wall.id)) ?? [];

        this.holdTypes = {};
        this.clearWall();

        this.wallLoaded = true;
      }
    },

    async loadBoulderOfTheDay() {
      this.clearWall();
      this.boulder = (await getBoulderOfTheDay()) ?? null;
      this.isBoulderOfTheDay = true;
      this.showBoulder();
    },

    async loadBoulder(id: number) {
      this.clearWall();
      this.boulder = (await getBoulder(id)) ?? null;
      this.isBoulderOfTheDay = false;
      this.showBoulder();
    },

    showBoulder() {
      if (this.boulder) {
        this.isSelectionMode = false;
        if (!this.boulder.holds) {
          console.warn("Loaded boulder is missing the holds list", this.boulder);
          return;
        }
        for (const id in this.boulder.holds) {
          this.holdTypes[id] = this.boulder.holds[id];
        }
        this.refreshWall(true);
        document.querySelector(".wallWrapper")?.scrollIntoView({ behavior: "smooth" });
      }
    },

    async addBoulder(data: BoulderNew) {
      for (const id in this.holdTypes) {
        if (this.holdTypes[id] > 0) {
          data.holds.push({
            id: +id,
            type: this.holdTypes[id],
          });
        }
      }
      const response = await newBoulder(data);
      if (!response) return;
      await this.loadBoulder(response.id);
      this.isSelectionMode = false;
    },

    async searchBoulder(data: BoulderSearch) {
      this.bControls.hideModal("searchModal");
      this.searchResultsPage = data.page ?? 1;
      this.showSearchResults = true;
      this.searchLastQuery = data;
      this.searchResults = (await searchBoulder(data)) ?? { pages: 0, results: [] };
      document.querySelector(".boulderInfo")?.scrollIntoView({ behavior: "smooth" });
    },

    async loginHandler(email: string, password: string, name: string, type: string) {
      switch (type) {
        case "login":
          if (await loginPassword(email, password)) {
            this.isLoggedIn = true;
            this.isPrivileged = window.sessionStorage.getItem("privileged")?.toLowerCase() == "1";
            await this.loadWall();
          }
          break;
        case "guestlogin":
          setAuthentication("guest", false);
          this.isLoggedIn = true;
          await this.loadWall();
          break;
        case "register":
          if (!this.registerMode) {
            this.registerMode = true;
          } else {
            await postRegistration({
              name: name,
              email: email,
              password: password,
            });
            this.registerMode = false;
          }
          break;
        case "cancel":
          this.registerMode = false;
          break;
      }
    },

    async showRanking() {
      this.ranking = (await getRanking()) ?? [];
      this.bControls.showModal("rankingModal");
    },

    askForDeletion(id: number) {
      this.boulderToDelete = id;
      this.bControls.showModal("deleteModal");
    },

    reallyDeleteBoulder() {
      if (this.boulderToDelete) {
        deleteBoulder(this.boulderToDelete).then(() => {
          this.boulderToDelete = undefined;
          this.showSearchResults = false;
          this.boulder = null;
        });
      }
    },

    menuHandler(id: string) {
      switch (id) {
        case "latest":
          this.searchBoulder({});
          break;
        case "search":
          this.bControls.showModal("searchModal");
          break;
        case "add":
          this.boulder = null;
          this.clearWall();
          this.refreshWall();
          this.isSelectionMode = true;
          break;
        case "botd":
          this.loadBoulderOfTheDay();
          break;
        case "notdoneyet":
          this.searchBoulder({
            notDoneYet: true,
          });
          break;
        case "ranking":
          this.showRanking();
          break;
        case "other":
          this.showSubMenu = !this.showSubMenu;
          break;
        case "report":
          this.bControls.toggleCollapse("nav-collapse");
          this.showSubMenu = false;
          break;
        case "faq":
          this.bControls.toggleCollapse("nav-collapse");
          this.showSubMenu = false;
          this.bControls.showModal("faqModal");
          break;
        case "about":
          this.bControls.toggleCollapse("nav-collapse");
          this.showSubMenu = false;
          getStats().then((stats) => {
            this.stats = stats ?? null;
            this.statsRefresh = !this.statsRefresh;
            this.bControls.showModal("statsModal");
          });
          break;
        case "impressum":
          this.bControls.toggleCollapse("nav-collapse");
          this.showSubMenu = false;
          this.$router.push("/impressum");
          break;
        case "privacy":
          this.bControls.toggleCollapse("nav-collapse");
          this.showSubMenu = false;
          this.$router.push("/datenschutz");
          break;
        case "editor":
          this.bControls.toggleCollapse("nav-collapse");
          this.$router.push("/editor");
          break;
        case "logout":
          this.bControls.toggleCollapse("nav-collapse");
          logout().then(() => {
            this.isLoggedIn = false;
            this.isPrivileged = false;
          });
          break;
        default:
          console.warn(`No menu handler for menu id ${id}`);
      }
    },

    async paginationHandler(id: number) {
      if (id) {
        if (id == -1) {
          this.searchLastQuery.page = min(this.searchResultsPage + 1, this.searchResults.pages);
        } else if (id == -2) {
          this.searchLastQuery.page = max(this.searchResultsPage - 1, 1);
        } else {
          this.searchLastQuery.page = id;
        }
        await this.searchBoulder(this.searchLastQuery);
      }
    },

    clearWall() {
      this.boulder = null;
      for (const holds of this.wallData) {
        for (const hold of holds.holds) {
          this.holdTypes[hold.id] = 0;
        }
      }
    },

    refreshWall(jumpToMainWall = false) {
      if (!this.wall) {
        this.wall = this.$refs.wall as typeof Wall;
      }
      this.wall?.refresh(jumpToMainWall ? this.boulder?.location?.main : undefined);
      this.refreshArrows = !this.refreshArrows;
    },

    refreshSearchResults() {
      this.searchResultsRefresh = !this.searchResultsRefresh;
    },

    cancelSelectionMode() {
      this.isSelectionMode = false;
      this.clearWall();
      this.refreshWall();
    },

    holdClickHandler(id: number, e: Event) {
      e.stopPropagation();
      const holdTypes = this.holdTypes;
      if (this.isSelectionMode) {
        if (holdTypes[id] == 2) holdTypes[id] = 0;
        else holdTypes[id] += 1;

        this.holdTypes = holdTypes;
      }
    },

    gItoa(grade: number): string {
      return gradeItoa(grade);
    },

    openExternal(url: string) {
      window.open(url, "_blank");
    },
  },
});
</script>

<style lang="scss"></style>
