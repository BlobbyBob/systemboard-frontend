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
  <div style="color: white; background-color: black">
    <div class="text-center p-4 mb-5">
      <div @click="$router.push('/')" class="cursor-pointer">
        <img src="/dev/favicon.png" alt="" />
        <h1 class="display-1">Digitales Bouldersystem</h1>
      </div>
      <h2>Impressum</h2>
    </div>
  </div>
  <article class="container">
    <div class="row bg-white">
      <div class="col">
        <div class="impressum">
          <h3>Kontaktadresse</h3>
          <p>{{ name }}</p>
          <p>{{ street }}</p>
          <p>{{ pcode }} {{ city }}</p>
          <p>E-Mail: <span v-html="email"></span></p>
          <h3>Haftungsausschluss</h3>
          <p>
            Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
            Zuverlässigkeit und Vollständigkeit der Informationen.
          </p>
          <p>
            Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff
            oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder
            durch technische Störungen entstanden sind, werden ausgeschlossen.
          </p>
          <p>
            Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das
            gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung
            zeitweise oder endgültig einzustellen.
          </p>
          <h3>Haftung für Links</h3>
          <p>
            Verweise und Links auf Webseiten Dritter liegen außerhalb unseres Verantwortungsbereichs. Es wird jegliche
            Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf
            eigene Gefahr des Nutzers oder der Nutzerin.
          </p>
          <h3>Urheberrechte</h3>
          <p>
            Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website
            gehören ausschließlich <strong>{{ name }}</strong> oder den speziell genannten Rechtsinhabern. Für die
            Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus
            einzuholen.
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Legal",
  setup() {
    return {
      name: process.env.VUE_APP_PERSONAL_NAME ?? "",
      street: process.env.VUE_APP_PERSONAL_STREET ?? "",
      pcode: process.env.VUE_APP_PERSONAL_PCODE ?? "",
      city: process.env.VUE_APP_PERSONAL_CITY ?? "",
      country: process.env.VUE_APP_PERSONAL_COUNTRY ?? "",
      email: process.env.VUE_APP_PERSONAL_EMAIL ?? "",
    };
  },
});
</script>

<style scoped lang="scss"></style>
