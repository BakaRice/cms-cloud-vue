<template>
  <div style="text-align: start">
    <h2>考勤管理</h2>
    <div class="attendance-progress">
      <!-- success -->
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.successp"
        status="success"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">正常考勤</span>
        </template>
      </el-progress>
      <!-- lat -->
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.latep"
        status="warning"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">当前迟到</span>
        </template>
      </el-progress>
      <!-- off -->
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.offp"
        status="warning"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">当前请假</span>
        </template>
      </el-progress>
      <!-- trip -->
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.tripp"
        status="warning"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">当前出差</span>
        </template>
      </el-progress>
      <!-- un -->
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.undealp"
        status="exception"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">当前未考勤</span>
        </template>
      </el-progress>
      <el-progress
        type="dashboard"
        :percentage="attendNumAn.earlyp"
        status="exception"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">当前早退</span>
        </template>
      </el-progress>
    </div>
  </div>
  <div class="chart-all-container">
    <div class="chart-container">
      <div ref="myChart" :style="{ width: '600px', height: '400px' }"></div>
      <div ref="myChart2" :style="{ width: '600px', height: '400px' }"></div>
    </div>

    <div class="chart-detail-contaner">
      <h2>{{ currDay }}详情</h2>
      <el-table :data="attendList" style="width: 100%">
        <el-table-column
          prop="uname"
          label="姓名"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="sname"
          label="排班"
          width="180"
        ></el-table-column>

        <el-table-column prop="statusName" label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
  <h1>考勤管理</h1>
  <p>
    查看所有员工的考勤和排班信息，能够按照日期对员工的考勤信息进行查看，员工考勤信息有“缺勤”，“迟到”，“出差”，“休假”，多种状态
    按照日期查看考勤时，能够显示查看当天的概况。
  </p>

  <p>P.S. 考勤管理应该还有一个H5端页面，其基本逻辑参照 tuhu企业微信的考勤</p>
</template>

<script lang="ts">
import { ref, shallowRef } from "vue";
import * as echarts from "echarts";
import axios from "@/axios/index";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default {
  name: "attendance",
  setup() {
    //某天的所有人的考勤信息的list

    /************************************************************
     * 数据与列表信息
     ************************************************************/
    let attendList = ref([
      {
        uid: 11568058953729,
        id: 6,
        currDate: "2021-05-16",
        status: 0,
        statusName: "0正常",
        uname: "普通用户18",
        sname: "冬令时白班",
      },
    ]);
    let attendNumAn = ref({
      successp: "10",
      latep: "17.9",
      earlyp: "10",
      undealp: "30.5",
      offp: "20",
      tripp: "23",
    });
    //-- /        考勤状态(0正常，1迟到，2早退，3旷工，4请假，5出差）
    let attdendNum = {
      success: 0,
      late: 0,
      undeal: 0,
      early: 0,
      off: 0,
      trip: 0,
      all: 1,
    };
    const calcu = (
      success: number,
      late: number,
      undeal: number,
      early: number,
      all: number,
      off: number,
      trip: number
    ) => {
      if (all == 0) all = 1;
      attendNumAn.value.successp = ((success * 100) / all).toFixed(1);
      attendNumAn.value.latep = ((late * 100) / all).toFixed(1);
      attendNumAn.value.undealp = ((undeal * 100) / all).toFixed(1);
      attendNumAn.value.earlyp = ((early * 100) / all).toFixed(1);
      attendNumAn.value.offp = ((off * 100) / all).toFixed(1);
      attendNumAn.value.tripp = ((trip * 100) / all).toFixed(1);
    };

    /************************************************************
     * 网络请求
     ************************************************************/
    let date = "2021/05/16";
    const total = ref<number>(0); //总数
    let totalPage = ref<number>(0); //总页数
    const currPage = ref<number>(1); //当前页
    axios.get("/pms/leader/attendances-overview?date=" + date).then(
      (resp) => {
        console.log(resp);
        attdendNum = resp.data.data;
        calcu(
          attdendNum.success,
          attdendNum.late,
          attdendNum.undeal,
          attdendNum.early,
          attdendNum.all,
          attdendNum.off,
          attdendNum.trip
        );
        console.log(attdendNum, attendNumAn);
      },
      (error) => {
        console.log(error);
      }
    );

    let getDayAttendance = () =>
      axios
        .get(
          `/pms/leader/attendances?date=${currDay.value}&pageNum=1&pageSize=10`
        )
        .then(
          (resp) => {
            console.log(resp);
            total.value = resp.data.data.total;
            currPage.value = resp.data.data.pageNum;
            totalPage.value = resp.data.data.pages;
            attendList.value = resp.data.data.list;
          },
          (error) => {
            console.log(error);
          }
        );
    /**
     * 员工考勤详情处理
     */
    let currDay = ref<string | number | boolean>("今日");

    /************************************************************
     * 表格内容处理
     ************************************************************/

    const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
    const myChart2 = ref<HTMLElement>();

    let mychartOption = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
      title: {
        text: "七日考勤状况图",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["正常", "请假", "出差", "未响应", "早退"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "10%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: [
            "2021/05/11",
            "2021/05/12",
            "2021/05/13",
            "2021/05/14",
            "2021/05/15",
            "2021/05/16",
            "2021/05/17",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "正常",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgba(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [10, 14, 15, 16, 20, 19, 36],
        },
        {
          name: "请假",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgba(77, 119, 255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [2, 4, 5, 1, 0, 10, 8],
        },
        {
          name: "出差",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgba(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [1, 2, 3, 4, 1, 2, 0],
        },
        {
          name: "未响应",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 0, 135)",
              },
              {
                offset: 1,
                color: "rgba(135, 0, 157)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [2, 3, 2, 4, 3, 5, 1],
        },
        {
          name: "早退",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 191, 0)",
              },
              {
                offset: 1,
                color: "rgba(224, 62, 76)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [2, 3, 4, 5, 5, 1, 0],
        },
      ],
    };

    let mychart2Option = {
      title: {
        text: "今日出勤状况",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          data: [
            { value: 235, name: "正常考勤" },
            { value: 274, name: "迟到" },
            { value: 310, name: "请假" },
            { value: 335, name: "出差" },
            { value: 400, name: "早退" },
            { value: 400, name: "未响应" },
          ],
          roseType: "angle",
          itemStyle: {
            normal: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    console.log(myChart);
    const myCharts = shallowRef<any>({
      chart1: {},
      chart2: {},
    });
    //表格绘制
    setTimeout(() => {
      // 绘制图表 chart1
      myCharts.value.chart1 = echarts.init(myChart.value!, { renderer: "svg" });
      myCharts.value.chart1.setOption(mychartOption);
      myCharts.value.chart1.on(
        "click",
        function (params: { name: string | number | boolean }) {
          console.log(params);
          currDay.value = params.name;
          getDayAttendance();
        }
      );
      //绘制图标 chart2
      myCharts.value.chart2 = echarts.init(myChart2.value!);
      myCharts.value.chart2.setOption(mychart2Option);
    }, 10);

    return {
      myChart,
      myChart2,
      attendNumAn,
      currDay,
      attendList,
    };
  },
};
</script>

<style>
.attendance-progress {
  text-align: justify;
  width: 100%;
  display: flex;
  margin: 24px 0;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 15px 0;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.chart-container {
  /* display: flex; */
  background-color: white;
  border: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
}
.chart-all-container {
  display: flex;
}

.chart-detail-contaner {
  background-color: white;
  width: 50%;
  margin-left: 10px;
  padding: 20px;
  border-radius: 10px;
}

/* charts */
</style>
