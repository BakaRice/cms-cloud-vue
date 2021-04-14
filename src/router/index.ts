import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/example01",
    component: () => import("@/views/example01/example01.vue"),
  },
  {
    path: "/example02",
    component: () => import("@/views/example02/example02.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
