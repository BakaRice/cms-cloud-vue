<template>
  <h1>员工排班详情</h1>
  <p>{{ userId }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    uid: String,
  },
  setup(props) {
    console.log(props.uid);
    return { userId: ref(props.uid) };
  },
});
</script>

<style></style>
