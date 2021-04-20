<template>
  <div class="sidebar-container">
    <div class="sidebar-logo-container">
      <a href="#/index" class="sidebar-logo-link router-link-active">
        <img src="@/assets/cms-logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">门店系统</h1>
      </a>
    </div>
    <div class="el-scrollbar">
      <sidebarItem />
    </div>
  </div>
</template>

<script>
import sidebarItem from "@/views/sidebar/sidebar-item.vue";
export default {
  components: {
    sidebarItem,
  },
};
</script>

<style>
.sidebar-logo-container .sidebar-logo-link .sidebar-logo {
  width: 40px;
  vertical-align: middle;
  /* margin-right: 12px; */
}
#app .sidebar-container a {
  display: inline-block;
  width: 100%;
  overflow: hidden;
}

.sidebar-logo-container.collapse .sidebar-logo {
  margin-right: 0;
}

.sidebar-logo-container .sidebar-logo-link {
  height: 100%;
  width: 100%;
  /* padding: 0 15px; */
}
a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
}
#app .hideSidebar .sidebar-container {
  width: 54px !important;
}

.sidebar-container {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  width: 210px !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.sidebar-logo-container .sidebar-logo-link .sidebar-title {
  overflow: hidden;
  display: inline-block;
  width: 60%;
  margin-left: 10px;
  margin: 0;
  color: #e1e1e1;
  font-weight: 600;
  line-height: 50px;
  font-size: 16px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
