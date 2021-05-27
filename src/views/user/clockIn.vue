<template>
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
      <el-button type="primary" round @click="ua">考勤打卡</el-button>
    </div>
  </div>
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
}
export default defineComponent({
  setup() {
    //获取预处理信息
    let nowTime = new Date(Date.parse(new Date().toString()));
    let activeStep = 0;
    let clockInfo = ref<ClockInDto>({
      uid: 0,
      userName: "",
      statusDesc: "",
      statusCode: "",
      schedulingTypeDesc: "",
      startTime: "",
      endTime: "",
    });
    let loading = ref<boolean>(true);
    axios.get("/pms/user/clock-in").then(
      (resp): void => {
        console.log(resp);
        let prevClock: ClockInDto = resp.data.data;
        clockInfo.value = prevClock;
        loading.value = false;
      },
      (error) => {
        console.log(error);
      }
    );
    let ua = () => {
      axios.post("/pms/user/attendance", {}).then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    // const TimeSelect = (start: string, end: string) => {};
    return { clockInfo, loading, nowTime, ua };
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
</style>
