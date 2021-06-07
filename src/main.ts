import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

import {
  SET_MENULIST,
  SET_ROLE,
  SET_ROLE_NAME,
  UPDATE_USER_NAME,
} from "./store/VuexTypes";
// process.env.NODE_ENV == "development" && require("@/mock/index");

const role = sessionStorage.getItem("role");
const roleName = sessionStorage.getItem("roleName");
const name = sessionStorage.getItem("name");

if (role && roleName && name) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const user = require("@/role/UserRole.ts");
  const menuList = user.setUserRole(role);
  store.commit(SET_ROLE, role);
  store.commit(SET_MENULIST, menuList);
  store.commit(UPDATE_USER_NAME, name);
  store.commit(SET_ROLE_NAME, roleName);
}
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .mount("#app");
