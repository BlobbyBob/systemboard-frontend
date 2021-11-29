import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bootstrap";
import "./style/custom.scss";

createApp(App).use(router).mount("#app");
