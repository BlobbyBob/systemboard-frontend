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
    <div class="login">
        <h3>Login</h3>
        <form v-on:submit.prevent="loginHandler">
            <label>
                E-Mail Adresse:<br>
                <input type="email"><br>
                Password:<br>
                <input type="password"><br>
                <button type="submit" class="btn btn-success">Anmelden</button>
            </label>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Login extends Vue {
        @Prop() loginHandler!: (event: Event) => void;
    }
</script>

<style scoped lang="scss">
    .login {
        text-align: center;
    }
</style>