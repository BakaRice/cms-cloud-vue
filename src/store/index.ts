import { Course, User } from "@/datasource/Types";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";

export interface State {
  user: User;
  courses: Course[];
  exception: string;
  userCourses: Course[];
  sideBarStatus: boolean;
}

const myState: State = {
  user: {
    name: "BO",
    address: "956",
    level: 1,
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
};
const myActions: ActionTree<State, State> = {};
const myGetters: GetterTree<State, State> = {};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters,
  modules: {},
});
