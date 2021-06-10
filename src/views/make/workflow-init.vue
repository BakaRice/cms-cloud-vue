<template>
  <div style="display: flex">
    <div class="workflow-init-input-container">
      <el-input placeholder="请输入检查级别" v-model="level">
        <template #prepend>检查级别</template>
      </el-input>
      <!-- <el-button type="success" @click="pushCheck()">插入检查级别</el-button> -->
      <el-input placeholder="请输入工序名称" v-model="seqName">
        <template #prepend>工序名称</template>
      </el-input>
      <el-button type="success" @click="pushseq()">添加工序</el-button>
    </div>
    <div class="workflow-init-list-container">
      <h1>零件名: {{ partName }}</h1>
      <h1>级别: {{ level }}</h1>

      <!-- {{ seq }} -->
      <ul v-for="(item, index) in seq" :key="index" style="text-align: start">
        <!-- {{ item }} -->
        <li>工序{{ index }}:{{ item.name }}</li>
      </ul>
      <el-button type="success" @click="postseq()">初始化工序</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "@/axios";
import router from "@/router";
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    paname: String,
  },
  setup(prop) {
    let partName = ref();
    let parname = prop.paname!;
    console.log(prop);

    partName.value = parname;
    let level = ref();
    let seq = ref<any[]>([]);
    let seqName = ref();
    const pushseq = () => {
      if (seqName.value == null || seqName.value == "") {
        return;
      }
      let idx = seq.value.length;
      let puname = seqName.value;
      console.log(puname);
      seq.value.push({ name: puname, value: idx + 1 });
      console.log(seq);
      seqName.value = "";
    };
    const postseq = () => {
      let data = { partName: parname, seqList: seq.value };
      axios.post("/pms/make/steps", data).then((resp) => {
        console.log(resp);
        router.push("/workflow");
      });
    };
    const pushCheck = () => {
      // level.
      //   checkLevel.value =
    };
    return {
      level,
      pushseq,
      partName,
      seqName,
      seq,
      pushCheck,
      postseq,
    };
  },
});
</script>

<style>
.workflow-init-input-container {
  width: 30%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}

.workflow-init-list-container {
  width: -webkit-fill-available;
  background-color: white;
  padding: 10px;
  margin-left: 10px;
  border-radius: 10px;
}
</style>
