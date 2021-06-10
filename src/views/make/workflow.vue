<template>
  <div class="work-seq-container">
    <!-- 用于列出所有的零件和概况 -->
    <div class="part-work-seq-list">
      <el-table :data="parttableData" stripe>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="工序" width="180">
          <template #default="scope">
            <div v-if="scope.row.code !== null">
              <el-button type="text" @click="seqDeatil(scope.row.name)">
                查看工序详情
              </el-button>
            </div>
            <div v-else>
              <el-button
                type="text"
                style="color: red"
                @click="seqInit(scope.row.name)"
              >
                初始化工序
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-row is-justify-end el-row--flex">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :page-count="totalPage"
          :page-size="10"
          :current-page="currPage"
          @current-change="getPageInfo"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 用于展示细节 -->
    <div class="part-work-seq-detail">
      <h2>工序内容</h2>

      <!-- 检查级别 -->
      <!-- {{ currLevel }} -->
      <div>
        检查级别：
        <el-select v-model="currLevel" placeholder="请选择隔离级别" disabled>
          <el-option
            v-for="item in leveloptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="success" @click="pushThree()">查看三维模型</el-button>

      <!-- 上传文件按钮 -->
      <div
        v-if="
          currSeqDetail == null || currSeqDetail[activeIndex].workName == null
        "
      >
        <el-button type="primary" plain>
          <input type="file" @change="readFile" />
          添加作业流程信息
        </el-button>
      </div>
      <div v-if="currSeqDetail != null">
        <!-- {{ currSeqDetail }} -->
        <div style="height: 500px">
          <el-steps direction="vertical" :active="activeIndex">
            <el-step
              v-for="(seqDetail, index) in currSeqDetail"
              :key="index"
              :title="seqDetail.seqCode"
              :description="seqDetail.workName"
              space="50%"
              @click="clickStep(index)"
            ></el-step>
          </el-steps>
        </div>
      </div>
      <div v-else><p>暂无工序信息</p></div>
    </div>
  </div>

  <div class="work-book-detail-container">
    <div class="workflow-container" v-if="workBook.workNo != undefined">
      <div class="workflow-container-left">
        <h1>作业步骤分解</h1>
        <div v-for="o in process" :key="o" class="process-card">
          <el-card class="box-card">
            <h2 v-if="o.processNo != null">步骤{{ o.processNo }}</h2>
            <h2 v-else>步骤{{ o.id }}</h2>

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

<script>
import { readWorkFlowFile } from "@/util/ExcelUtils.js";
import { ref } from "vue";
import axios from "@/axios/index";
import router from "@/router";
import { ElNotification } from "element-plus";
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
  methods: {
    open1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    },
  },
  setup() {
    let workBook = ref(new Workbook());
    let p = new WorkbookProcess();
    let process = ref([p]);
    let currSeqDetail = ref();
    const pushThree = () => {
      router.push("/three");
    };
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
            ElNotification({
              title: "工序上传成功",
              type: "success",
              message: "当前工序作业流程成功生产",
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    };
    let parttableData = ref();
    let req = {
      pageSize: 10,
      pageNum: 1,
    };
    //获取零件列表
    axios
      .get(
        `/pms/warehouse/part/make?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
      )
      .then((resp) => {
        console.log(resp);
        parttableData.value = resp.data.data.list;
        total.value = resp.data.data.total;
        currPage.value = resp.data.data.pageNum;
        totalPage.value = resp.data.data.pages;
      });
    const total = ref(0); //总数
    let totalPage = ref(0); //总页数
    const currPage = ref(1); //当前

    const getPageInfo = (cp) => {
      console.log("通用分页模板:改变页数:", cp, req, currPage.value);
      // if (cp == undefined) {
      //   cp = 1;
      // }
      req.pageNum = cp;
      currPage.value = cp;
      axios
        .get(
          `/pms/warehouse/part/make?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
        )
        .then((resp) => {
          console.log(resp);
          parttableData.value = resp.data.data.list;
          total.value = resp.data.data.total;
          currPage.value = resp.data.data.pageNum;
          totalPage.value = resp.data.data.pages;
        });
    };

    let activeIndex = ref(1);
    const clickStep = (data) => {
      let workNo = currSeqDetail.value[data].workNo;
      activeIndex.value = data;
      console.log(data, workNo);
      activeIndex.value = data;
      if (workNo != null) {
        axios.get(`/pms/make/work-book?workNo=${workNo}`).then((resp) => {
          console.log(resp);
          workBook.value = resp.data.data;
          workBook.value.process = resp.data.data.process;
          process.value = resp.data.data.process;
        });
      } else {
        workBook.value = new Workbook();
        let p = new WorkbookProcess();
        process.value = [p];
      }
    };
    const seqDeatil = (name) => {
      console.log(name);
      getSeq(name);
    };
    const seqInit = (name) => {
      console.log(name, `/workflow-init/${name}`);
      router.push(`/workflow-init/${name}`);
    };
    const getSeq = (name) => {
      axios.get(`/pms/make/stepDto?name=${name}`).then((resp) => {
        console.log(resp);
        currSeqDetail.value = resp.data.data;
      });
      axios.get(`/pms/quality?name=${name}`).then((resp) => {
        console.log(resp);
        currLevel.value = resp.data.data;
      });
    };

    // 隔离级别与当前隔离级别
    let currLevel = ref();
    let leveloptions = ref([
      {
        value: "1111",
        label: "检查级别1111",
      },
      {
        value: "1110",
        label: "检查级别1110",
      },
      {
        value: "1100",
        label: "检查级别1100",
      },
      {
        value: "1000",
        label: "检查级别1000",
      },
      {
        value: "0000",
        label: "检查级别0000",
      },
    ]);

    return {
      readFile,
      workBook,
      process,
      parttableData,
      seqDeatil,
      seqInit,
      total,
      totalPage,
      getPageInfo,
      currSeqDetail,
      clickStep,
      activeIndex,
      currLevel,
      leveloptions,
      pushThree,
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
.part-work-seq-list {
  width: 30%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}
.work-seq-container {
  display: flex;
}

.part-work-seq-detail {
  margin-left: 10px;
  border-radius: 10px;
  background-color: white;
  width: 70%;
  padding: 10px;
}

.work-book-detail-container {
  padding-top: 10px;
}
</style>
