import { RouteRecordRaw } from "vue-router";
import { Menu } from "./Menu";
import router from "@/router/index";
import component from "*.vue";

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
      //INDEX WELCOME
      {
        name: "welcome",
        path: "/index/welcome",
        component: () => import("@/views/welcome.vue"),
      },
      //user相关 员工信息，考勤与排班
      {
        name: "clockIn",
        path: "/clockIn",
        component: () => import("@/views/user/clockIn.vue"),
      },
      {
        name: "userInfo",
        path: "/userInfo",
        component: () => import("@/views/user/userInfo.vue"),
      },
      {
        name: "userInfoDetail",
        path: "/userInfo/:uid",
        props: true,
        component: () => import("@/views/user/userInfoDetail.vue"),
      },
      {
        name: "userInfoEdit",
        path: "/userEdit/:uid",
        props: true,
        component: () => import("@/views/user/userInfoEdit.vue"),
      },
      {
        name: "userInfoAdd",
        path: "/userAdd",
        props: true,
        component: () => import("@/views/user/userAdd.vue"),
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
      {
        name: "leaveRequest",
        path: "/leave-request",
        component: () => import("@/views/user/leaveRequest.vue"),
      },
      //工单处理
      {
        name: "ticketDeal",
        path: "/ticket-deal",
        component: () => import("@/views/user/ticketDeal.vue"),
      },
      {
        name: "rosterDetail",
        path: "/roster-detail/:uid",
        props: true,
        component: () => import("@/views/user/rosterDetail.vue"),
      },
      //wms 库存相关 零件 备件存储 出入库管理
      {
        //零件存储管理
        name: "part",
        path: "/part",
        component: () => import("@/views/warehouse/part.vue"),
      },
      //供应商相关
      {
        name: "supplier",
        path: "/supplier",
        component: () => import("@/views/warehouse/supplier/supplier.vue"),
      },
      //供应商相关
      {
        name: "supplier-detail",
        path: "/supplier/:sid",
        component: () => import("@/views/warehouse/supplier/supplier.vue"),
      },
      //入库单
      {
        name: "inbound",
        path: "/inbound",
        component: () => import("@/views/warehouse/supplier/inbound.vue"),
      },
      //入库单
      {
        name: "outbound",
        path: "/outbound",
        component: () => import("@/views/warehouse/supplier/outbound.vue"),
      },
      {
        name: "boundDetail",
        path: "/boundDetail/:inboundId",
        props: true,
        component: () => import("@/views/warehouse/boundDetail.vue"),
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
      //quality 质量管理相关
      {
        //"质量级别",
        name: "level",
        path: "/level",
        component: () => import("@/views/quality/level.vue"),
      },
      {
        // "质量检测",
        name: "detect",
        path: "/detect",
        component: () => import("@/views/quality/detect.vue"),
      },
      {
        //"质量分析",
        name: "analysis",
        path: "/analysis",
        component: () => import("@/views/quality/analysis.vue"),
      },
      //make 生产过程相关
      {
        name: "workflow",
        path: "/workflow",
        component: () => import("@/views/make/workflow.vue"),
      },
      {
        name: "barcode-js",
        path: "/barcode-js/:cdata",
        props: true,
        component: () => import("@/views/make/barcode-js.vue"),
      },
      {
        // 加工数据分析
        name: "makeAnalysis",
        path: "/makeAnalysis",
        component: () => import("@/views/make/makeAnalysis.vue"),
      },
      {
        // 加工数据管理
        name: "data",
        path: "/data",
        component: () => import("@/views/make/data.vue"),
      },
      {
        name: "makeflow",
        path: "/makeflow",
        component: () => import("@/views/make/makeflow.vue"),
      },
      {
        name: "work-label",
        path: "/work-label/:cargoCode",
        props: true,
        component: () => import("@/views/make/user/work-label.vue"),
      },
      {
        name: "workflow-init",
        path: "/workflow-init/:paname",
        props: true,
        component: () => import("@/views/make/workflow-init.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "index" },
  },
];
//所有用户均有的权限
const defaultRouter: Array<RouteRecordRaw> = [
  {
    name: "index",
    path: "/index",
    component: () => import("@/views/index.vue"),
    children: [
      // {
      //   path: "/p1",
      //   component: () => import("@/views/three/P1.vue"),
      // },
      // {
      //   name: "three",
      //   path: "/three",
      //   component: () => import("@/views/three/three.vue"),
      // },
      // {
      //   name: "link",
      //   path: "/linK",
      //   component: () => import("@/views/three/link.vue"),
      // },
      //INDEX WELCOME
      {
        name: "welcome",
        path: "/index/welcome",
        component: () => import("@/views/welcome.vue"),
      },
      //user相关 员工信息，考勤与排班
      {
        name: "clockIn",
        path: "/clockIn",
        component: () => import("@/views/user/clockIn.vue"),
      },
      // {
      //   name: "userInfo",
      //   path: "/userInfo",
      //   component: () => import("@/views/user/userInfo.vue"),
      // },
      // {
      //   name: "userInfoDetail",
      //   path: "/userInfo/:uid",
      //   props: true,
      //   component: () => import("@/views/user/userInfoDetail.vue"),
      // },
      // {
      //   name: "userInfoEdit",
      //   path: "/userEdit/:uid",
      //   props: true,
      //   component: () => import("@/views/user/userInfoEdit.vue"),
      // },
      // {
      //   name: "userInfoAdd",
      //   path: "/userAdd",
      //   props: true,
      //   component: () => import("@/views/user/userAdd.vue"),
      // },
      // {
      //   name: "roster",
      //   path: "/roster",
      //   component: () => import("@/views/user/roster.vue"),
      // },
      // {
      //   name: "attendance",
      //   path: "/attendance",
      //   component: () => import("@/views/user/attendance.vue"),
      // },
      // {
      //   name: "leaveRequest",
      //   path: "/leave-request",
      //   component: () => import("@/views/user/leaveRequest.vue"),
      // },
      // //工单处理
      // {
      //   name: "ticketDeal",
      //   path: "/ticket-deal",
      //   component: () => import("@/views/user/ticketDeal.vue"),
      // },
      // {
      //   name: "rosterDetail",
      //   path: "/roster-detail/:uid",
      //   props: true,
      //   component: () => import("@/views/user/rosterDetail.vue"),
      // },
      // //wms 库存相关 零件 备件存储 出入库管理
      // {
      //   //零件存储管理
      //   name: "part",
      //   path: "/part",
      //   component: () => import("@/views/warehouse/part.vue"),
      // },
      // {
      //   //备件存储管理
      //   name: "space-part",
      //   path: "/space-part",
      //   component: () => import("@/views/warehouse/spacePart.vue"),
      // },
      // {
      //   // 库存计划管理
      //   name: "plan",
      //   path: "/plan",
      //   component: () => import("@/views/warehouse/plan.vue"),
      // },
      // {
      //   // stream => 出入库计划管理
      //   name: "stream",
      //   path: "/stream",
      //   component: () => import("@/views/warehouse/stream.vue"),
      // },
      // //device 设备管理相关
      // {
      //   // 加工设备管理
      //   name: "processDevice",
      //   path: "/processDevice",
      //   component: () => import("@/views/device/processDevice.vue"),
      // },
      // {
      //   // 检测设备管理
      //   name: "testDevice",
      //   path: "/testDevice",
      //   component: () => import("@/views/device/testDevice.vue"),
      // },
      // {
      //   // 设备使用计划管理
      //   name: "planDevice",
      //   path: "/planDevice",
      //   component: () => import("@/views/device/planDevice.vue"),
      // },
      // //quality 质量管理相关
      // {
      //   //"质量级别",
      //   name: "level",
      //   path: "/level",
      //   component: () => import("@/views/quality/level.vue"),
      // },
      // {
      //   // "质量检测",
      //   name: "detect",
      //   path: "/detect",
      //   component: () => import("@/views/quality/detect.vue"),
      // },
      // {
      //   //"质量分析",
      //   name: "analysis",
      //   path: "/analysis",
      //   component: () => import("@/views/quality/analysis.vue"),
      // },
      // //make 生产过程相关
      // {
      //   name: "workflow",
      //   path: "/workflow",
      //   component: () => import("@/views/make/workflow.vue"),
      // },
      // {
      //   // 加工数据分析
      //   name: "makeAnalysis",
      //   path: "/makeAnalysis",
      //   component: () => import("@/views/make/makeAnalysis.vue"),
      // },
      // {
      //   // 加工数据管理
      //   name: "data",
      //   path: "/data",
      //   component: () => import("@/views/make/data.vue"),
      // },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "index" },
  },
];

// ----------------
//无权限菜单
const nullMenuList: Menu[] = [];
//系统权限菜单
const adminMenuList: Menu[] = [
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
      // {
      //   index: "2-2",
      //   title: "排班信息",
      //   path: "/roster",
      // },
      // {
      //   index: "2-3",
      //   title: "考勤信息",
      //   path: "/attendance",
      // },
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
      // {
      //   index: "3-2",
      //   title: "备件存储管理",
      //   path: "/space-part",
      // },
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
        title: "质量级别",
        path: "/level",
      },
      {
        index: "5-2",
        title: "质量检测",
        path: "/detect",
      },
      {
        index: "5-3",
        title: "质量分析",
        path: "/analysis",
      },
    ],
  },
  {
    index: "6",
    i: "el-icon-odometer",
    title: "生产加工管理模块",
    children: [
      {
        index: "6-1",
        title: "生产作业流程管理",
        path: "/workflow",
      },
      {
        index: "6-2",
        title: "加工数据管理",
        path: "/data",
      },
      {
        index: "6-3",
        title: "加工数据分析",
        path: "/makeAnalysis",
      },
      {
        index: "6-4",
        title: "生产流程管理",
        path: "/makeflow",
      },
      {
        index: "6-5",
        title: "加工面板",
        path: "/work-label/init",
      },
    ],
  },
];
const leaderMenuList: Menu[] = [
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
      {
        index: "2-4",
        title: "考勤打卡",
        path: "/clockIn",
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
        title: "仓库存储管理",
        path: "/part",
      },
      // {
      //   index: "3-2",
      //   title: "备件存储管理",
      //   path: "/space-part",
      // },
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
        title: "质量级别",
        path: "/level",
      },
      {
        index: "5-2",
        title: "质量检测",
        path: "/detect",
      },
      {
        index: "5-3",
        title: "质量分析",
        path: "/analysis",
      },
    ],
  },
  {
    index: "6",
    i: "el-icon-odometer",
    title: "生产加工管理模块",
    children: [
      {
        index: "6-1",
        title: "生产作业流程管理",
        path: "/workflow",
      },
      {
        index: "6-2",
        title: "加工数据管理",
        path: "/data",
      },
      {
        index: "6-3",
        title: "加工数据分析",
        path: "/makeAnalysis",
      },
      {
        index: "6-4",
        title: "生产流程管理",
        path: "/makeflow",
      },

      {
        index: "6-5",
        title: "加工面板",
        path: "/work-label/init",
      },
    ],
  },
];
//普通用户菜单
const defaultMenuList: Menu[] = [
  {
    index: "2",
    i: "el-icon-user-solid",
    title: "员工管理模块",
    children: [
      {
        index: "2-4",
        title: "考勤打卡",
        path: "/clockIn",
      },
    ],
  },
];
// --------------------

export function setUserRole(roleId: string): Menu[] {
  if (roleId == "1") {
    console.log("系统管理员");
    router.removeRoute("nomatch");
    routes.forEach((r) => router.addRoute(r));
    return adminMenuList;
  }
  if (roleId == "5") {
    console.log("系统管理员");
    router.removeRoute("nomatch");
    routes.forEach((r) => router.addRoute(r));
    return leaderMenuList;
  }
  if (roleId == "6") {
    console.log("班组主管");
    return adminMenuList;
  }
  if (roleId == "7") {
    console.log("普通用户");
    router.removeRoute("nomatch");
    defaultRouter.forEach((r) => router.addRoute(r));
    return defaultMenuList;
  }
  console.log("null!");
  return nullMenuList;
}
