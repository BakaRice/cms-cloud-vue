<template>
  <div class="work-book-detail-container">
    <el-button type="primary" plain>
      <input type="file" @change="readFile" />
      添加作业流程信息
    </el-button>
    <div class="workflow-container" v-if="workBook.workNo != undefined">
      <div class="workflow-container-left">
        <h1>作业步骤分解</h1>
        <div v-for="o in process" :key="o" class="process-card">
          <el-card class="box-card">
            <h2>步骤{{ o.id }}</h2>
            <p>作业分解:{{ o.explanation }}</p>
            <p v-if="o.minutues != undefined || o.seconds != undefined">
              用时:
              <span v-if="o.minutues != undefined">{{ o.minutes }}分</span>
              <span v-if="o.seconds != undefined">{{ o.seconds }}秒</span>
            </p>
            <p>主要步骤：{{ o.MainSteps }}</p>
            <p>重点：{{ o.focus }}</p>
          </el-card>
        </div>
      </div>
      <div class="workflow-container-right">
        <h1>作业基本信息</h1>
        {{ workBook.workNo }}
        <p>作业名:{{ workBook.workName }}</p>
        <p>劳保工具:{{ workBook.userProtectionTools }}</p>
        <p>加工工具:{{ workBook.userTools }}</p>
        <p>零件名:{{ workBook.partName }}</p>
        <p>工序号:{{ workBook.sequence }}</p>
        <p>禁止事项:{{ workBook.ban }}</p>
        <p>其他事项:{{ workBook.other }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { readWorkFlowFile } from "@/util/ExcelUtils.js";
import { ref } from "vue";
import axios from "@/axios/index";
class Workbook {
  workNo;
  workName;
  userProtectionTools;
  userTools;
  partName;
  sequence;
  process;
  ban;
  other;
}

class WorkbookProcess {
  id;
  explanation;
  minutes;
  seconds;
  MainSteps;
  focus;
}

export default {

  setup() {
    let workBook = ref(new Workbook());
    let p = new WorkbookProcess();
    let process = ref([p]);
    const readFile = (e) => {
      //(e: Event) => {
      const target = e.target; //as HTMLInputElement;
      const file = target.files;
      readWorkFlowFile(file).then((data) => {
        workBook.value = data;
        console.log(workBook);
        process.value = workBook.value.process;
        axios.post("/pms/make/work-book", workBook.value).then(
          (resp) => {
            console.log(resp);
            console.log("work-book", resp);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    };
    return {
      readFile,
      workBook,
      process,
    };
  },
};
</script>

<style>
.process-card {
  text-align: start;
  margin-bottom: 10px;
}
.workflow-container {
  display: flex;
}
.workflow-container-left {
  background-color: white;
  border: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
}
.workflow-container-right {
  background-color: white;
  width: 30%;
  margin-left: 10px;
  padding: 20px;
  border-radius: 10px;
}
.workflow-container-three {
  background-color: antiquewhite;
  width: 100%;
}
.workflow-container-three-obj {
  width: 80%;
}
</style>
