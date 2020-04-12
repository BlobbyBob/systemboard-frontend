<template>
    <div id="app">
        <div class="container">
            <Header/>
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
            <Login v-bind:login-handler="loginHandler" v-if="!isLoggedIn"/>
            <Wall v-bind:images="['/dev/left.jpg', '/dev/center.jpg', '/dev/right.jpg']" v-if="isLoggedIn"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from '@/components/Header.vue';
    import Wall from "@/components/wall/Wall.vue";
    import Login from "@/components/Login.vue";
    import Menu from "@/components/menu/Menu.vue";

    @Component({
        components: {
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
