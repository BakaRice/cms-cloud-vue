import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue")
  },
  {
    name:"index",
    path: "/index",
    component: () => import("@/views/index.vue")
  },
  {
    name:"three",
    path: "/three",
    component: () => import("@/views/three/three.vue")
  },
  {
    name: "nomatch",
    path: "/:pathMatch(.*)*",
    redirect: { name: "login" }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
