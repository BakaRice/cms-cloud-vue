import { Course, User } from "@/datasource/Types";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";
import { Menu } from "@/role/Menu";
import router from "@/router";
import { ResultVO } from "@/mock";
import axios from "@/axios/index";

export interface State {
  user: User;
  courses: Course[];
  exception: string;
  userCourses: Course[];
  sideBarStatus: boolean;
  //权限相关
  role?: number | null;
  menuList?: Menu[];
}

const myState: State = {
  user: {
    name: "BO",
    address: "956",
    level: 1,
    phone: "13251612723",
    password: "pwd",
  },
  courses: [],
  userCourses: [],
  exception: "",
  sideBarStatus: true,
};
const myMutations: MutationTree<State> = {
  //设置sidebar状态
  [vxt.UPDATE_SIDEBAR_STATUS]: (state, data: boolean) =>
    (state.sideBarStatus = data),
  //权限相关
  [vxt.SET_ROLE](state: State, data: number) {
    state.role = data;
  },
  [vxt.SET_MENULIST](state: State, data: Menu[]) {
    state.menuList = data;
  },
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  //异常处理
  [vxt.UPDATE_EXCEPTION]: (state, data: string) => (state.exception = data),
};
const myActions: ActionTree<State, State> = {
  //登录
  async [vxt.LOGIN]({ commit }, user: User) {
    try {
      console.log("axios登录操作");
      const resp = await axios.post<ResultVO>("user/login", user);
      // const resp = await axios.post("user/login", user);
      console.log(resp);
      console.log(resp.data);
      console.log(resp.headers.token);
      sessionStorage.setItem("token", resp.headers.token);
      // commit(vxt.UPDATE_USER, resp.data.data.user);
      if (resp.headers.token != null || resp.data.data == true) {
        commit(vxt.SET_ROLE, 3);
        sessionStorage.setItem("role", "3");
        const { setUserRole } = await import("@/role/UserRole.ts");
        const menuList = setUserRole();
        commit(vxt.SET_MENULIST, menuList);
        router.push("/index");
      }
    } catch (e) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
      console.log(e);
    }
    // 此处向后端发出登录请求。后端返回token以及加密role，置于sessionstorage
    // 每次请求在header中携带token
    // 并基于role加载对应的角色权限路由/功能列表等信息，也可加载对应的API请求操作
  },
};
const myGetters: GetterTree<State, State> = {
  //权限相关
  premission: (state: State) => (level: number[]) =>
    level.some((l) => l == state.role),
};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters,
  modules: {},
});
