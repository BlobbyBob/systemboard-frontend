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
                <div v-if="registerMode" id="namefield">
                    <label for="loginname">Name:</label>
                    <input id="loginname" type="text" class="form-control" v-model="name" pattern="^[a-zA-Z0-9._-]{3,25}$|^[a-zA-Z0-9._-]{2,10} ?[a-zA-Z0-9._-]{3,14}$"><br>
                </div>
                <label for="loginemail">E-Mail Adresse:</label>
                <input id="loginemail" type="email" class="form-control" v-model="email"><br>
                <label for="loginpassword">Passwort:</label>
                <input id="loginpassword" type="password" class="form-control" v-model="password"><br>
            </div>
            <div class="btn-group btn-block">
                <button id="login" type="submit" class="btn btn-primary" :disabled="registerMode">Anmelden</button>
                <button id="register" type="submit" class="btn btn-success">Registrieren</button>
                <button id="cancel" type="submit" class="btn btn-dark" v-if="registerMode">Abbrechen</button>
            </div>
            <br>
            <button id="guestlogin" type="submit" class="btn btn-block btn-secondary" :disabled="registerMode">Als Gast anmelden</button>
        </form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

// Fix until TypeScript libraries support this natively
interface SubmitEvent extends Event {
    submitter: HTMLElement;
}

@Component({})
export default class Login extends Vue {
    @Prop({default: false}) registerMode!: boolean;
    @Prop() loginHandler!: (email: string, password: string, name: string, type: string) => void;
    private name = '';
    private email = '';
    private password = '';

    loginHandlerWrapper(e: SubmitEvent) {
        this.loginHandler(this.email, this.password, this.name, e.submitter.id);
    }
}
</script>

<style scoped lang="scss">
@import 'src/style/custom';

button {
    padding: 5px;
    margin-top: 10px;
}
form {
    input:focus {
        outline: none;
        border: 2px solid $secondary;
        box-shadow: 0 0 10px $secondary;
    }
}
#namefield {
    input {
        animation: highlight 2s linear;
    }

    @keyframes highlight {
        0% {
            box-shadow: 0 0 10px red;
            border-color: red;
            outline: none;
        }
        100% {
            box-shadow: 0 0 0 $secondary;
            border-color: inherit;
        }
    }
}
</style>