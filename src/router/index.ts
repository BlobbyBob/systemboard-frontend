import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Systemboard from "@/components/views/Systemboard.vue";
import Legal from "@/components/views/Legal.vue";
import GDPR from "@/components/views/GDPR.vue";
import Editor from "@/components/views/Editor.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Digitales Bouldersystem",
    component: Systemboard,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: Legal,
  },
  {
    path: "/datenschutz",
    name: "Datenschutz",
    component: GDPR,
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
