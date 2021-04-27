import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/three",
    component: () => import("@/views/three/three.vue"),
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
