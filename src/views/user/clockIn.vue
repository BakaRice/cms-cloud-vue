<template>
  <div class="clock-in-big-container">
    <div class="clock-in-container" v-loading="loading">
      <h1>考勤打卡</h1>
      <p>
        当前日期:{{ nowTime.getFullYear() }}年 {{ nowTime.getMonth() }}月
        {{ nowTime.getDate() }}日
      </p>
      <p>{{ clockInfo.userName }}-{{ clockInfo.uid }}</p>
      <div>
        <el-steps direction="vertical" :active="2" style="height: 180px">
          <el-step title="上班" :description="clockInfo.startTime"></el-step>
          <el-step title="下班" :description="clockInfo.endTime"></el-step>
        </el-steps>
      </div>
      <div>
        <el-button type="primary" round @click="ua" :disabled="disabelButton">
          考勤打卡
        </el-button>
        <el-button round @click="lr">请假申请</el-button>
      </div>
    </div>
    <div v-if="clockInfo.attendance != null" style="width: 70%">
      <div
        v-if="clockInfo.attendance.startTime != null"
        class="clock-in-in-container"
      >
        <h3>上班打卡信息</h3>
        <p>时间:{{ clockInfo.attendance.startTime }}</p>
      </div>
      <div
        v-if="clockInfo.attendance.endTime != null"
        class="clock-in-out-container"
      >
        <h3>下班打卡信息</h3>
        <p>时间:{{ clockInfo.attendance.endTime }}</p>
      </div>
    </div>
  </div>
  {{ clockInfo }}
</template>

<script lang="ts">
import axios from "@/axios/index";
import router from "@/router";
import { defineComponent, ref } from "vue";
interface ClockInDto {
  uid: number;
  userName: string;
  statusDesc: string | null;
  statusCode: string | null;
  schedulingTypeDesc: string;
  startTime: string;
  endTime: string;
  attendance: Attendance;
}
interface Attendance {
  startTime: string | null;
  endTime: string | null;
}
export default defineComponent({
  setup() {
    //获取预处理信息
    let nowTime = new Date(Date.parse(new Date().toString()));
    let activeStep = 0;
    let disabelButton = ref(false);
    let clockInfo = ref<ClockInDto>({
      uid: 0,
      userName: "",
      statusDesc: null,
      statusCode: null,
      schedulingTypeDesc: "",
      startTime: "",
      endTime: "",
      attendance: {
        startTime: null,
        endTime: null,
      },
    });
    let loading = ref<boolean>(true);
    let ga = () => {
      axios.get("/pms/user/clock-in").then(
        (resp): void => {
          console.log(resp);
          let prevClock: ClockInDto = resp.data.data;
          clockInfo.value = prevClock;

          if (
            resp.data.data.attendance != null &&
            resp.data.data.attendance.endTime != null
          ) {
            console.log(resp.data.data.attendance.endTime);
            disabelButton.value = true;
          }
          loading.value = false;
        },
        (error) => {
          console.log(error);
        }
      );
    };
    //leave request 请假申请
    let lr = () => {
      router.push("/leave-request");
    };
    axios.get("/pms/user/clock-in").then(
      (resp): void => {
        console.log(resp);
        let prevClock: ClockInDto = resp.data.data;
        clockInfo.value = prevClock;
        loading.value = false;
        if (
          resp.data.data.attendance != null &&
          resp.data.data.attendance.endTime != null
        ) {
          console.log(resp.data.data.attendance.endTime);
          disabelButton.value = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    let ua = () => {
      axios.post("/pms/user/attendance", {}).then(
        (res) => {
          console.log("/pms/user/attendance", res);
          ga();
        },
        (error) => {
          console.log(error);
        }
      );
    };
    // const TimeSelect = (start: string, end: string) => {};
    return { clockInfo, loading, nowTime, ua, disabelButton, lr };
  },
});
</script>

<style>
.clock-in-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  height: 100%;
}
.clock-in-big-container {
  display: flex;
}
.clock-in-in-container {
  border-radius: 10px;
  /* width: 30%; */
  padding: 10px;
  background-color: white;
  margin-left: 10px;
  margin-bottom: 10px;
}

.clock-in-out-container {
  border-radius: 10px;
  padding: 10px;
  /* width: 30%; */
  background-color: white;
  margin-left: 10px;
}
</style>
