<template>
  <div class="leave-request-container">
    <h1>请假申请单</h1>
    <div class="leave-request-date-picker">
      <el-date-picker
        v-model="lrdate"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: fit-content !important"
      ></el-date-picker>
    </div>

    <el-input
      type="textarea"
      :autosize="{ minRows: 19, maxRows: 20 }"
      placeholder="请输入请假理由"
      v-model="lrd"
      maxlength="200"
      show-word-limit
    ></el-input>
    <div class="leave-request-button-container">
      <el-button type="primary" @click="lrclick">确认</el-button>
      <el-button @click="lrcancle">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    //leave request describe 请假事由解释
    let lrd = ref("");

    let lrdate = ref();
    const lrclick = () => {
      console.log(lrd, lrdate);
    };
    const lrcancle = () => {
      router.push("/clockIn");
    };
    return { lrd, lrdate, lrclick, lrcancle };
  },
});
</script>

<style>
.leave-request-container {
  width: 25%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.leave-request-container > * {
  padding-bottom: 10px;
}
.leave-request-date-picker {
  width: fit-content !important;
}
</style>
