import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bootstrap";
import "./style/custom.scss";
import Progress from "@/plugins/Progress";
import BootstrapControls from "@/plugins/BootstrapControls";
import Toast from "vue-toastification";

const app = createApp(App);
for (const plugin of [/*router,*/ Progress, BootstrapControls, Toast]) {
  app.use(plugin);
}
app.mount("#app");
