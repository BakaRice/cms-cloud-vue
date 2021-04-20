<template>
  <div class="app-wrapper" v-bind:class="{ hideSidebar: sidebarStatus }">
    <sidebar />
    <div class="main-container">
      <div>
        <div class="navbar">
          <div
            id="hamburger-container"
            class="hamburger-container"
            style="padding: 0px 15px"
            @click="updateSideBarStatus"
          >
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              class="hamburger"
              v-bind:class="{ isActive: !sidebarStatus }"
            >
              <path
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
              ></path>
            </svg>
          </div>
          <!---->
          <div class="right-menu">
            <div
              class="avatar-container right-menu-item hover-effect el-dropdown"
            >
              <div
                class="avatar-wrapper el-dropdown-selfdefine"
                aria-haspopup="list"
                aria-controls="dropdown-menu-8685"
                role="button"
                tabindex="0"
              >
                <p class="user-name">谭文韬</p>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <ul
                class="el-dropdown-menu el-popper"
                id="dropdown-menu-8685"
                style="display: none"
              >
                <li tabindex="-1" class="el-dropdown-menu__item">
                  <!---->
                  <span style="display: block">登出</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section class="app-main">
        <h1>app-main</h1>
        <h1>for router-view</h1>
        <router-view />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/views/sidebar/sidebar.vue";
import { State } from "@/store";
import { UPDATE_SIDEBAR_STATUS } from "@/store/VuexTypes";
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const sidebarStatus = computed(() => store.state.sideBarStatus);
    const updateSideBarStatus = () => {
      store.commit(UPDATE_SIDEBAR_STATUS, !sidebarStatus.value);
    };
    return {
      sidebarStatus,
      updateSideBarStatus,
    };
  },
  methods: {
    handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
  components: {
    Sidebar,
  },
});
</script>

<style>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  min-height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
  overflow-x: hidden;
}
#app .hideSidebar .main-container {
  margin-left: 54px;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  border-bottom: 1px solid #f0f2f5;
}
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.hamburger.isActive {
  transform: rotate(180deg);
}

.navbar .hamburger-container {
  line-height: 46px;
  height: 100%;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.navbar .right-menu {
  align-self: center;
  display: flex;
  align-items: center;
}
.navbar .right-menu .right-menu-item.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
}
.navbar .right-menu .avatar-container {
  margin-right: 30px;
}
.navbar .right-menu .right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}
.navbar .right-menu .avatar-container .avatar-wrapper .user-name {
  cursor: pointer;
  display: inline-block;
}
.navbar .right-menu .avatar-container .avatar-wrapper .el-icon--right {
  font-size: 12px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
.el-icon--right {
  margin-left: 5px;
}

.app-main {
  width: 100%;
  position: relative;
  overflow: auto;
  padding: 24px !important;
  background: #f5f5f5;
  box-shadow: inset 0 0 6px 2px rgb(0 0 0 / 15%);
}
</style>
