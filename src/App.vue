<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "src/style/custom";

body {
  min-width: 100%;
  min-height: 100%;
}

@include media-breakpoint-up(xl) {
  body {
    background-image: url("/dev/bg.png");
    background-repeat: repeat;
  }
}

#app {
  min-width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

#progress {
  position: absolute;
  background-color: $primary;
  top: 0;
  left: 0;
  height: 5px;
  z-index: 100;
}

#progress.start {
  width: 30vw !important;
  transition: width 1s ease-out;
}

#progress.progress {
  width: 60vw !important;
  transition: width 1s ease-out;
}

#progress.finish {
  width: 100vw !important;
  transition: width 100ms ease-out;
}

#progress.done {
  width: 0;
  background-color: transparent;
  transition: background-color 50ms linear, width 1s linear;
}

.bg-white {
  background-color: white;
}

.cursor-pointer {
  cursor: pointer;
}

#login-bg {
  position: absolute;
  background-image: url("/dev/bg_uni.jpg");
  background-size: cover;
  filter: blur(5px);
  min-height: 100%;
  min-width: 100%;
  z-index: -1;
}

#login-form {
  margin-top: auto;
  margin-bottom: auto;
  background-color: rgba(240, 240, 240, 0.85);
  padding: 2em;
  border-radius: 4px;
}

#login > div > div {
  min-height: 80vh;
}
</style>
