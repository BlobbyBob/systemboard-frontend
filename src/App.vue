<template>
    <div id="app">
        <div class="container">
            <Header/>
            <Login v-bind:login-handler="loginHandler" v-if="!isLoggedIn"/>
            <Wall v-bind:images="['/dev/left.jpg', '/dev/center.jpg', '/dev/right.jpg']" v-if="isLoggedIn"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Header from './components/Header.vue';
    import Wall from "./components/wall/Wall.vue";
    import Login from "@/components/Login.vue";

    @Component({
        components: {
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
    }
</script>

<style lang="scss">

</style>
