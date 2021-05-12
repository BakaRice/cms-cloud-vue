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
        component: () => import("@/views/three/P1.vue"),
      },
      {
        name: "three",
        path: "/three",
        component: () => import("@/views/three/three.vue"),
      },
      {
        name: "link",
        path: "/linK",
        component: () => import("@/views/three/link.vue"),
      },
      //user相关 员工信息，考勤与排班
      {
        name: "userInfo",
        path: "/userInfo",
        component: () => import("@/views/user/userInfo.vue"),
      },
      {
        name: "roster",
        path: "/roster",
        component: () => import("@/views/user/roster.vue"),
      },
      {
        name: "attendance",
        path: "/attendance",
        component: () => import("@/views/user/attendance.vue"),
      },
      //wms 库存相关 零件 备件存储 出入库管理
      {
        //零件存储管理
        name: "part",
        path: "/part",
        component: () => import("@/views/warehouse/part.vue"),
      },
      {
        //备件存储管理
        name: "space-part",
        path: "/space-part",
        component: () => import("@/views/warehouse/spacePart.vue"),
      },
      {
        // 库存计划管理
        name: "plan",
        path: "/plan",
        component: () => import("@/views/warehouse/plan.vue"),
      },
      {
        // stream => 出入库计划管理
        name: "stream",
        path: "/stream",
        component: () => import("@/views/warehouse/stream.vue"),
      },
      //device 设备管理相关
      {
        // 加工设备管理
        name: "processDevice",
        path: "/processDevice",
        component: () => import("@/views/device/processDevice.vue"),
      },
      {
        // 检测设备管理
        name: "testDevice",
        path: "/testDevice",
        component: () => import("@/views/device/testDevice.vue"),
      },
      {
        // 设备使用计划管理
        name: "planDevice",
        path: "/planDevice",
        component: () => import("@/views/device/planDevice.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "index" },
  },
];

// ----------------

const menuList: Menu[] = [
  {
    index: "1",
    i: "el-icon-location",
    title: "测试开发模块",
    children: [
      {
        index: "1-1",
        title: "零件管理 three",
        path: "/three",
      },
      {
        index: "1-2",
        title: "连接 link",
        path: "/link",
      },
      {
        index: "1-3",
        title: "连接 P1",
        path: "/P1",
      },
    ],
  },
  {
    index: "2",
    i: "el-icon-user-solid",
    title: "员工管理模块",
    children: [
      {
        index: "2-1",
        title: "员工信息",
        path: "/userInfo",
      },
      {
        index: "2-2",
        title: "排班信息",
        path: "/roster",
      },
      {
        index: "2-3",
        title: "考勤信息",
        path: "/attendance",
      },
    ],
  },
  {
    index: "3",
    i: "el-icon-house",
    title: "仓储管理模块",
    children: [
      {
        index: "3-1",
        title: "零件存储管理",
        path: "/part",
      },
      {
        index: "3-2",
        title: "备件存储管理",
        path: "/space-part",
      },
      {
        index: "3-3",
        title: "库存计划管理",
        path: "/plan",
      },
      {
        index: "3-4",
        title: "出入库计划管理",
        path: "/stream",
      },
    ],
  },
  {
    index: "4",
    i: "el-icon-cpu",
    title: "设备管理模块",
    children: [
      {
        index: "4-1",
        title: "加工设备管理",
        path: "/processDevice",
      },
      {
        index: "4-2",
        title: "检测仪器管理",
        path: "/testDevice",
      },
      {
        index: "4-3",
        title: "设备使用计划管理",
        path: "/planDevice",
      },
    ],
  },
  {
    index: "5",
    i: "el-icon-notebook-2",
    title: "质量管理模块",
    children: [
      {
        index: "5-1",
        title: "质量级别管理",
        path: "/userInfo",
      },
      {
        index: "5-2",
        title: "质量检测管理",
        path: "/sc",
      },
    ],
  },
  {
    index: "6",
    i: "el-icon-location",
    title: "生产加工管理模块",
    children: [
      {
        index: "6-1",
        title: "生产作业流程管理",
        path: "/userInfo",
      },
      {
        index: "6-2",
        title: "零件加工数据管理",
        path: "/sc",
      },
    ],
  },
];

// --------------------

export function setUserRole(): Menu[] {
  router.removeRoute("nomatch");
  routes.forEach((r) => router.addRoute(r));
  return menuList;
}
