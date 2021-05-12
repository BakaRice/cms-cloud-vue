import { RouteRecordRaw } from "vue-router";
import { Menu } from "./Menu";
import router from "@/router/index";


const routes: Array<RouteRecordRaw> = [
  {
    name: "index",
    path: "/index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/p1",
        component: () => import("@/views/three/P1.vue")
      },
      {
        name:"three",
        path: "/three",
        component: () => import("@/views/three/three.vue")
      },
      {
        name:"link",
        path: "/linK",
        component: () => import("@/views/three/link.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "index" }
  }
];

// ----------------

const menuList: Menu[] = [
  {
    index: "1",
    i: "el-icon-location",
    title: "零部件管理模块",
    children: [
      {
        index: "1-1",
        title: "零件管理 three",
        path: "/three"
      },
      {
        index: "1-2",
        title: "连接 link",
        path: "/link"
      },
      {
        index: "1-3",
        title: "连接 P1",
        path: "/P1"
      }
    ]
  }
];

// --------------------

export function setUserRole() {
  router.removeRoute("nomatch");
  routes.forEach(r => router.addRoute(r));
  return menuList;
}
