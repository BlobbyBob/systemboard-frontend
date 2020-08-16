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
    <div class="text-center">
        <h1 class="display-3">Digitales<br>Bouldersystem</h1>

        <form @submit.prevent="loginHandlerWrapper" class="pt-lg-3 pb-lg-3 pl-lg-5 pr-lg-5">
            <label>
                <div class="text-left">
                    E-Mail Adresse:<br>
                    <input type="email" class="form-control" v-model="email"><br>
                    Passwort:<br>
                    <input type="password" class="form-control" v-model="password"><br>
                </div>
                <div class="btn-group btn-block">
                    <button type="submit" class="btn btn-primary">Anmelden</button>
                    <button type="submit" class="btn btn-success">Registrieren</button>
                </div>
                <br>
                <button type="submit" class="btn btn-block btn-secondary">Als Gast anmelden</button>
            </label>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    @Prop() loginHandler!: (email: string, password: string) => void;
    private email = '';
    private password = '';

    loginHandlerWrapper() {
        this.loginHandler(this.email, this.password);
    }
}
</script>

<style scoped lang="scss">
button {
    padding: 5px;
    margin-top: 10px;
}
</style>