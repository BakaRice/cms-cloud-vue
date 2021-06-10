<template>
  <div class="work-lable-container">
    <div v-if="seqFinishFlag">
      <el-alert
        title="当前工序加工完成"
        type="success"
        effect="dark"
      ></el-alert>
    </div>
    <div class="work-lable-up-container">
      <div
        class="class-work-lable-left-container"
        style="display: flex; align-items: center"
      >
        <!-- 条形码 -->
        <div class="work-part-barcode">
          <div
            v-if="staticPartCode != undefined && staticPartCode != ''"
            style="display: flex; margin: 0 auto"
          >
            <barcode :cdata="staticPartCode" :key="staticPartCode"></barcode>
          </div>
          <div v-else style="margin: auto">扫码录入零件编号</div>
        </div>
        <!-- 零件基本信息 -->
        <div class="work-part-info" v-if="partInfo != null">
          <h1>{{ partInfo.name }}</h1>
          <p style="color: gray">{{ partInfo.code }}</p>

          <el-row>
            <el-col :span="4">
              <div>入库时间:</div>
            </el-col>
            <el-col :span="8">
              <div>{{ partInfo.inTime }}</div>
            </el-col>
            <el-col :span="4">
              <div>出库时间:</div>
            </el-col>
            <el-col :span="8">
              <div>{{ partInfo.outTime }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div>入库单号:</div>
            </el-col>
            <el-col :span="8">
              <div>{{ partInfo.inboudId }}</div>
            </el-col>
            <el-col :span="4">
              <div>出库单号</div>
            </el-col>
            <el-col :span="8">
              <div>{{ partInfo.outboudId }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>零件状态编码</div>
            </el-col>
            <el-col :span="12">
              <div>{{ partInfo.status }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>零件加工编码</div>
            </el-col>
            <el-col :span="18">
              <div>{{ workId }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="work-part-info" v-else><h1>请扫码录入零件信息</h1></div>
      </div>
      <div class="class-wrok-lable-right-container">
        <h2>工序加工时长</h2>
        <!-- 计时器 -->
        <div class="work-part-timer" :style="'color: ' + timerColor">
          {{ workMinu }}:{{ workSec }}
        </div>
        <!-- 零件编号输入框 -->
        <div class="work-part-code-input">
          <el-input
            placeholder="请输入内容"
            v-model="currPartCode"
            @keyup.enter="enterWork()"
          >
            <template #prepend>CARGO CODE</template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="work-lable-down-container">
      <div class="class-work-lable-left-container">
        <!-- 作业指导书内容 -->
        <div class="work-book-detail-container">
          <div class="workflow-container" v-if="workBook.workNo != undefined">
            <div class="workflow-container-left">
              <h1>作业步骤分解</h1>
              <div
                class="workflow-container-right"
                style="text-align: start; border-style: groove; padding: 10px"
              >
                <h1>作业基本信息</h1>
                {{ workBook.workNo }}
                <p style="color: red">作业名:{{ workBook.workName }}</p>
                <p>劳保工具:{{ workBook.userProtectionTools }}</p>
                <p>加工工具:{{ workBook.userTools }}</p>
                <p>零件名:{{ workBook.partName }}</p>
                <p style="color: red">工序号:{{ workBook.sequence }}</p>
                <p>禁止事项:{{ workBook.ban }}</p>
                <p>其他事项:{{ workBook.other }}</p>
              </div>
              <div v-for="o in process" :key="o" class="process-card">
                <el-card class="box-card">
                  <h2 v-if="o.processNo != null">步骤{{ o.processNo }}</h2>
                  <h2 v-else>步骤{{ o.id }}</h2>

                  <p>作业分解:{{ o.explanation }}</p>
                  <p v-if="o.minutues != undefined || o.seconds != undefined">
                    用时:
                    <span v-if="o.minutues != undefined">
                      {{ o.minutes }}分
                    </span>
                    <span v-if="o.seconds != undefined">{{ o.seconds }}秒</span>
                  </p>
                  <p>主要步骤：{{ o.MainSteps }}</p>
                  <p>重点：{{ o.focus }}</p>
                </el-card>
              </div>
            </div>
          </div>
          <div v-else>
            <p>暂无作业指导书信息</p>
          </div>
        </div>
      </div>
      <div class="class-wrok-lable-right-container">
        <!-- 工序列表 -->
        <div class="work-lable-seq-list-container">
          <h4>工序列表</h4>
          <div v-if="currSeqDetail != null">
            <ul style="text-align: start">
              <li v-for="(seqDetail, idx) in currSeqDetail" :key="idx">
                {{ seqDetail.seqCode }}:{{ seqDetail.workName }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p>暂无工序信息</p>
          </div>
        </div>
        <!-- 加工详情 -->
        <hr />
        <div>
          <h4>加工详情</h4>
          <!-- {{ processInfo }} -->
          <div v-if="processInfo != null">
            <el-row>
              <el-col :span="4">加工编号</el-col>
              <el-col :span="20">{{ processInfo.workId }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">开始时间</el-col>
              <el-col :span="20">{{ processInfo.startTime }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">流程编号</el-col>
              <el-col :span="8">{{ processInfo.flowCode }}</el-col>
              <el-col :span="4">完成状态</el-col>
              <el-col :span="8">{{ processInfo.status }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">终止时间</el-col>
              <el-col :span="20">{{ processInfo.endTime }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4">完成时间</el-col>
              <el-col :span="20">{{ processInfo.finishTime }}</el-col>
            </el-row>
          </div>
          <div v-else>
            <p>暂无加工信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ partInfo }}
  <hr />
  {{ processInfo }} -->
  <hr />
</template>

<script lang="ts">
import axios from "@/axios";
import barcode from "@/views/make/barcode-js.vue";
import { ElNotification } from "element-plus";
import { defineComponent, onBeforeMount, onMounted, onUpdated, ref } from "vue";

interface Process {
  id?: number | null;
  work_id: string; //零件加工编码
  status: number | null;
  code_id: string; //零件编号
  start_time: string; //时间
  end_time: string;
  finish_time: string;
  flow_code: string;
  done: number | null;
  test_id: number | null;
}
class Workbook {
  workNo?: any;
  workName?: any;
  userProtectionTools?: any;
  userTools?: any;
  partName?: any;
  sequence?: any;
  process?: any;
  ban?: any;
  other?: any;
}

class WorkbookProcess {
  id?: any;
  explanation?: any;
  minutes?: any;
  seconds?: any;
  MainSteps?: any;
  focus?: any;
}

export default defineComponent({
  components: {
    barcode,
  },
  props: {
    cargoCode: String,
  },
  setup(prop) {
    //内容显示变量
    let code: string = prop.cargoCode || "ERROR";
    let currPartCode = ref<string>(code);
    let staticPartCode = ref<string>("");
    let workMinu = ref(0);
    let workSec = ref(0);
    let limitTimeSec = 30;
    let timerColor = ref("black");
    let partInfo = ref();
    let processInfo = ref();
    let workId = ref("");

    let currSeqDetail = ref();

    let workBook = ref(new Workbook());
    let p = new WorkbookProcess();
    let process = ref([p]);
    let finshFlag = false;

    let seqFinishFlag = ref(false);

    //工序列表
    let seqList: any[] = [];

    let sureStatus = ref(false);

    console.log("currPartCode", currPartCode);

    // 计时器
    let totalSec = 0;
    let timer: any = "";

    //网络请求
    const enterWork = () => {
      if (processInfo.value != null && processInfo.value.status == 3) {
        ElNotification({
          title: "加工已完成",
          type: "error",
          message: "该零件已经完成加工！",
        });
        open("/#/detect");
        return;
      }
      seqFinishFlag.value = false;
      console.log("输入零件编号");
      //第二次扫码
      if (staticPartCode.value == currPartCode.value) {
        sureStatus.value = true;
        //判断是否有加工信息 以此判断是否进行初始化加工
        if (processInfo.value == null) {
          //初始化加工
          axios
            .get(`/pms/make/init?code=${staticPartCode.value}`)
            .then((resp) => {
              console.log(resp);
              //请求获取加工信息
              axios
                .get(`/pms/make/workInfo?code=${staticPartCode.value}`)
                .then((resp) => {
                  console.log(resp);
                  let data = resp.data.data;
                  if (data == null) {
                    ElNotification({
                      title: "当前零件无加工记录",
                      type: "info",
                      message:
                        "当前零件无加工记录，再次扫码将进行零件加工初始化",
                    });
                    //当不存在加工信息时 就显示第一工序详情

                    getWorkBookByNo(currSeqDetail.value[0].workNo);
                  } else {
                    processInfo.value = data;
                    let fc = processInfo.value.flowCode;
                    console.log(parseInt(fc, 16).toString(2));
                  }
                });
            });
        }
        //定时器
        if (sureStatus.value == true && finshFlag == false) {
          timer = setInterval(() => {
            //   var d = new Date();
            //   var t = d.toLocaleTimeString();
            //   console.log(t);
            console.log("开始了");
            workSec.value++;
            if (workSec.value == 60) {
              workSec.value = 0;
              workMinu.value++;
            }
            totalSec++;
            if (totalSec > limitTimeSec / 2) {
              // console.log("PART OUT", totalSec);
              timerColor.value = "#ebb563";
            }
            if (totalSec > limitTimeSec) {
              // console.log("OUT", totalSec);
              timerColor.value = "#f56c6c";
            }
          }, 1000);
        }
        //是否是第三次扫码 【结束！】
        if (finshFlag == true) {
          axios
            .get(`/pms/make/end-step?code=${staticPartCode.value}`)
            .then((resp) => {
              console.log(resp);
              let data = resp.data.data;
              processInfo.value = data;
              let fc = processInfo.value.flowCode;
              console.log(parseInt(fc, 16).toString(2));
              console.log("时间停止", timer);

              clearInterval(timer);
              let msgEnd = `本工序加工时长总计为【${totalSec}】秒`;
              ElNotification({
                title: "零件完成",
                type: "success",
                message: msgEnd,
              });

              //工序完成 恢复默认值
              workMinu.value = 0;
              workSec.value = 0;
              totalSec = 0;
              seqFinishFlag.value = true;
              staticPartCode.value = "";
              processInfo.value = null;
              finshFlag = false;
            });
        } else {
          let msg = `本工序加工时长总计为【${limitTimeSec}】秒,请注意安全生产完成加工。`;
          ElNotification({
            title: "零件加工开始",
            type: "success",
            message: msg,
          });
          finshFlag = true;
        }
      } else {
        //第一次扫码
        partInfo.value = null;
        processInfo.value = null;
        staticPartCode.value = "";
        //1. 网络获取code=>零件信息
        axios.get(`/pms/make/part?code=${currPartCode.value}`).then((resp) => {
          console.log(resp);
          let data = resp.data.data;
          //零件信息不为空时 请求查询加工信息
          if (data != null) {
            console.log("no-null", data);
            staticPartCode.value = data.code;
            partInfo.value = data;
            console.log("partInfo", partInfo.value);
            //修正时间格式
            partInfo.value.inTime = partInfo.value.inTime
              .substring(0, 19)
              .replace("T", " ");
            partInfo.value.outTime = partInfo.value.outTime
              .substring(0, 19)
              .replace("T", " ");
            ElNotification({
              title: "零件扫码成功",
              type: "warning",
              message: "请确认零件信息和工序内容正确，并再次扫码条形码",
            });
            //2. 网络请求name=>查询工序信息
            axios
              .get(`/pms/make/stepDto?name=${partInfo.value.name}`)
              .then((resp) => {
                console.log(resp);
                currSeqDetail.value = resp.data.data;
                //3. 网络请求code=>加工信息
                axios
                  .get(`/pms/make/workInfo?code=${staticPartCode.value}`)
                  .then((resp) => {
                    console.log(resp);
                    let data = resp.data.data;
                    if (data == null) {
                      ElNotification({
                        title: "当前零件无加工记录",
                        type: "info",
                        message:
                          "当前零件无加工记录，再次扫码将进行零件加工初始化",
                      });
                      //当不存在加工信息时 就显示第一工序详情

                      getWorkBookByNo(currSeqDetail.value[0].workNo);
                    } else {
                      //有加工信息
                      processInfo.value = data;
                      let fc = processInfo.value.flowCode;
                      console.log(parseInt(fc, 16).toString(2));
                      let binCode = parseInt(fc, 16).toString(2);
                      let subBinCode = binCode.substring(4);
                      let i = subBinCode.lastIndexOf("1");
                      console.log("idx", i, binCode);
                      if (currSeqDetail.value[i + 1] != null) {
                        getWorkBookByNo(currSeqDetail.value[i + 1].workNo);
                      }
                    }
                  });
              });
          } else {
            ElNotification({
              title: "零件信息读取失败",
              type: "error",
              message:
                "请确认零件信息和工序内容正确，当前不存在该编码且已出库零件",
            });
          }
        });
      }
      console.log(sureStatus, finshFlag);

      currPartCode.value = "";
    };

    //获取工序信息
    const getSeq = (name: string) => {
      axios.get(`/pms/make/stepDto?name=${name}`).then((resp) => {
        console.log(resp);
        currSeqDetail.value = resp.data.data;
      });
      //   axios.get(`/pms/quality?name=${name}`).then((resp) => {
      //     console.log(resp);
      //     currLevel.value = resp.data.data;
      //   });
    };
    const getWorkBookByNo = (No: string) => {
      console.log("getWorkBookByNo", No);
      axios.get(`/pms/make/work-book?workNo=${No}`).then((resp) => {
        console.log(`获取工序${No}`, resp);
        workBook.value = resp.data.data;
        workBook.value.process = resp.data.data.process;
        process.value = resp.data.data.process;
        console.log(process.value);
        let pv = process.value;
        let totalM = 0;
        let totalS = 0;
        pv.forEach((e) => {
          if (e.minutes != null) totalM += e.minutes * 1;
        });
        pv.forEach((e) => {
          if (e.seconds != null) totalS += e.seconds * 1;
        });
        limitTimeSec = totalM * 60 + totalS;
        console.log("计算出总用时", limitTimeSec);
      });
    };

    onBeforeMount(() => {
      console.log("onBeforeMount");
      //   getCargo;
    });
    onMounted(() => {
      console.log("onMounted");
    });

    return {
      currPartCode,
      enterWork,
      staticPartCode,
      workMinu,
      workSec,
      sureStatus,
      timerColor,
      partInfo,
      workId,
      processInfo,
      currSeqDetail,
      process,
      workBook,
      seqFinishFlag,
    };
  },
});
</script>

<style>
.work-lable-up-container {
  display: flex;
}
.work-lable-down-container {
  display: flex;
  margin-top: 10px;
}
.class-wrok-lable-right-container {
  width: 40%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
}
.class-work-lable-left-container {
  width: 60%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
.work-part-barcode {
  width: 250px;
  border-style: dashed none dashed none;
  height: 104px;
  display: flex;
  margin-left: 15px;
}
.work-part-timer {
  font-size: 80px;
}
.work-part-info {
  text-align: start;
  margin: 0px 30px;
}
.work-part-info > * {
  margin: 0px;
}
</style>
