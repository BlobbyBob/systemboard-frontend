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
                <div class="text-left">
                    <label for="loginemail">E-Mail Adresse:</label>
                    <input id="loginemail" type="email" class="form-control" v-model="email"><br>
                    <label for="loginpassword">Passwort:</label>
                    <input id="loginpassword" type="password" class="form-control" v-model="password"><br>
                </div>
                <div class="btn-group btn-block">
                    <button id="login" type="submit" class="btn btn-primary">Anmelden</button>
                    <button id="register" type="submit" class="btn btn-success">Registrieren</button>
                </div>
                <br>
                <button id="guestlogin" type="submit" class="btn btn-block btn-secondary">Als Gast anmelden</button>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

// Fix until TypeScript supports this
interface SubmitEvent extends Event {
    submitter: HTMLElement;
}

@Component({})
export default class Login extends Vue {
    @Prop() loginHandler!: (email: string, password: string, type: string) => void;
    private email = '';
    private password = '';

    loginHandlerWrapper(e: SubmitEvent) {
        this.loginHandler(this.email, this.password, e.submitter.id);
    }
}
</script>

<style scoped lang="scss">
button {
    padding: 5px;
    margin-top: 10px;
}
</style>