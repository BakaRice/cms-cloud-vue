<template>
  <el-scrollbar>
    <div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="sidebarStatus"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#1890ff"
      >
        <template v-for="(menu1, m1index) in menuList" :key="`m1-${m1index}`">
          <el-submenu :index="menu1.index" style="text-align: start">
            <template #title>
              <i :class="menu1.i"></i>
              <span>{{ menu1.title }}</span>
            </template>
            <template v-if="menu1?.children.length > 0">
              <el-menu-item
                :index="menu2.index"
                v-for="(menu2, m2index) in menu1.children"
                :key="`${m1index}-${m2index}`"
              >
                <router-link :to="menu2?.path">{{ menu2.title }}</router-link>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>

    <!--    <el-menu-->
    <!--      default-active="1-4-1"-->
    <!--      class="el-menu-vertical-demo"-->
    <!--      @open="handleOpen"-->
    <!--      @close="handleClose"-->
    <!--      :collapse="sidebarStatus"-->
    <!--      :collapse-transition="false"-->
    <!--      background-color="#304156"-->
    <!--      text-color="#fff"-->
    <!--      active-text-color="#1890ff"-->
    <!--    >-->
    <!--      <el-submenu index="1">-->
    <!--        <template #title>-->
    <!--          <i class="el-icon-location"></i>-->
    <!--          <span>导航一</span>-->
    <!--        </template>-->
    <!--        <el-menu-item index="1-1">选项1</el-menu-item>-->
    <!--        <el-menu-item index="1-2">选项2</el-menu-item>-->
    <!--        <el-menu-item index="1-3">选项3</el-menu-item>-->
    <!--      </el-submenu>-->
    <!--      <el-menu-item index="2">-->
    <!--        <i class="el-icon-menu"></i>-->
    <!--        <template #title>导航二</template>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="3" disabled>-->
    <!--        <i class="el-icon-document"></i>-->
    <!--        <template #title>导航三</template>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="4">-->
    <!--        <i class="el-icon-setting"></i>-->
    <!--        <template #title>导航四</template>-->
    <!--      </el-menu-item>-->
    <!--      <el-submenu index="5">-->
    <!--        <template #title>-->
    <!--          <i class="el-icon-location"></i>-->
    <!--          <span>导航5</span>-->
    <!--        </template>-->
    <!--        <el-menu-item index="5-1">选项1</el-menu-item>-->
    <!--        <el-menu-item index="5-2">选项2</el-menu-item>-->
    <!--        <el-menu-item index="5-3">选项3</el-menu-item>-->
    <!--        <el-menu-item index="5-4">选项4</el-menu-item>-->
    <!--        <el-menu-item index="5-5">选项5</el-menu-item>-->
    <!--        <el-menu-item index="5-6">选项6</el-menu-item>-->
    <!--      </el-submenu>-->
    <!--    </el-menu>-->
  </el-scrollbar>
</template>

<script lang="ts">
import { State } from "@/store";
import { UPDATE_SIDEBAR_STATUS } from "@/store/VuexTypes";
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";

export default defineComponent({
  setup() {
    //登录后路由获取相关
    const state: State = useStore().state;
    const menuList = state.menuList;

    const store: Store<State> = useStore();
    const sidebarStatus = computed(() => store.state.sideBarStatus);
    const updateSideBarStatus = () => {
      store.commit(UPDATE_SIDEBAR_STATUS, !sidebarStatus.value);
    };
    return {
      sidebarStatus,
      updateSideBarStatus,
      menuList,
    };
  },
  methods: {
    handleOpen(key: unknown, keyPath: unknown) {
      console.log(key, keyPath);
    },
    handleClose(key: unknown, keyPath: unknown) {
      console.log(key, keyPath);
    },
  },
});
</script>

<style>
.el-menu {
  border-right: solid 0px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  width: auto;
  min-height: 400px;
}

#app .sidebar-container .el-submenu .el-menu-item,
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title {
  min-width: 210px !important;
  background-color: #1f2d3d !important;
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
