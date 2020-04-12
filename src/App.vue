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
                        id: 'elem2',
                        label: 'Punkt 2'
                    }
                ]" v-bind:menu-click-handler="menuHandler" v-if="isLoggedIn"/>
            <hr/>
            <Login v-bind:login-handler="loginHandler" v-if="!isLoggedIn"/>
            <hr/>
            <Wall v-bind:images="['/dev/left.jpg', '/dev/center.jpg', '/dev/right.jpg']" v-if="isLoggedIn"/>
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
            <BoulderInfo name="Corona" creator="Virus" description="Ein Boulder für die Quarantäne" grade="6c"
                         rating="4"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from '@/components/Header.vue';
    import Wall from "@/components/wall/Wall.vue";
    import Login from "@/components/Login.vue";
    import Menu from "@/components/menu/Menu.vue";
    import Ranking from "@/components/ranking/Ranking.vue";
    import BoulderInfo from "@/components/BoulderInfo.vue";

    @Component({
        components: {
            BoulderInfo,
            Ranking,
            Menu,
            Login,
            Header,
            Wall
        },
    })
    export default class App extends Vue {
        private isLoggedIn = false;

        loginHandler(event: Event) {
            this.isLoggedIn = true;
            console.log("Login Handler executed");
            console.log("Login event: ", event);
        }

        menuHandler(id: string) {
            console.log("Menu entry with id " + id + " clicked")
        }
    }
</script>

<style lang="scss">

</style>
