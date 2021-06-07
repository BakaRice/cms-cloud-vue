<template>
  <barcode cdata="wwww"></barcode>
  <div>生产流程管理</div>
  <p>与作业流程的粒度不同，生产流程的粒度是在工序层面的，需要对工序进行控制</p>
  <el-button @click="pu()"></el-button>
  <!-- :msg="data.msg" -->
</template>

<script lang="ts">
import router from "@/router";
import barcode from "@/views/make/barcode-js.vue";
export default {
  components: {
    barcode,
  },
  setup() {
    const pu = () => {
      router.push("/barcode-js/aaaaaaas");
    };
    return { pu };
  },
};
</script>

<style></style>
