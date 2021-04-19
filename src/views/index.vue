<template>
  <div class="app-wrapper">
    <sidebar />
    <div class="main-container"></div>
  </div>
</template>

<script>
import Sidebar from "@/views/sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
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
}
</style>
