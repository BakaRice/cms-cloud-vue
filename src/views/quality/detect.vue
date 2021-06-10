<template>
  <div style="text-align: start">
    <h1>质量检测管理</h1>
    <el-row>
      <el-input placeholder="请输入内容" v-model="input1">
        <template #prepend>备注</template>
      </el-input>
    </el-row>
    <el-row v-for="(item, index) in quailtyCheckOptions" :key="index">
      <el-col :span="3">
        <p>{{ item.id }}:{{ item.name }}</p>
      </el-col>
      <el-col :span="3">
        <p>{{ item.tyepeName }}</p>
      </el-col>
      <el-col :span="18">
        <el-input></el-input>
      </el-col>
    </el-row>
    <el-button type="success" @click="pushAnalysis()">质检提交</el-button>
  </div>
  <!-- <div style="text-align: start">
    <h1>质量检测管理</h1>
    <p>
      质量检测管理指的是对零件设置质量级别，规定某一批次的零件使用某一段质量级别。
      同时质量检测管理应该包含对抽检的管理，（批次抽检，时段随机抽检，人员随机抽检）
    </p>
    <p>加上echarts的旭日图</p>
  </div> -->
</template>

<script lang="ts">
import { ref } from "vue";
import router from "@/router";
export default {
  setup() {
    const pushAnalysis = () => {
      router.push("/analysis");
    };
    let quailtyCheckOptions = ref([
      { id: "1", name: "右侧上小孔", tyepeName: "形状公差直线度" },
      { id: "2", name: "左侧下小孔", tyepeName: "形状公差圆度" },
      { id: "3", name: "左侧下小孔", tyepeName: "位置公差圆跳动" },
      { id: "4", name: "内嵌嵌入面", tyepeName: "形状公差圆柱度" },
      { id: "5", name: "右侧上小孔", tyepeName: "形状公差直线度" },
      { id: "6", name: "左侧下小孔", tyepeName: "形状公差直线度" },
      { id: "7", name: "左侧下小孔", tyepeName: "形状公差圆柱度" },
      { id: "8", name: "内嵌嵌入面", tyepeName: "形状公差圆柱度" },
    ]);
    return {
      quailtyCheckOptions,
      pushAnalysis,
    };
  },
};
</script>

<style></style>
