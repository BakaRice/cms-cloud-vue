<template>
  <router-view />
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
export default defineComponent({});
</script>
<style>
html {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
