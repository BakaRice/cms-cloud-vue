<template>
  <router-view />

  <alertdialog v-if="exception !== undefined && exception.length > 0" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapState } from "vuex";
const alertdialog = defineAsyncComponent(
  () => import("@/components/AlertDialog.vue")
);
export default defineComponent({
  components: { alertdialog },
  computed: {
    ...mapState(["exception"]),
  },
});
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
