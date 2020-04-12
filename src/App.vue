<template>
    <div id="app">
        <div class="container">
            <Header/>
            <Wall v-bind:images="['/dev/left.jpg', '/dev/center.jpg', '/dev/right.jpg']"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Header from './components/Header.vue';
    import Wall from "./components/wall/Wall.vue";

    @Component({
        components: {
            Header,
            Wall
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">

</style>
