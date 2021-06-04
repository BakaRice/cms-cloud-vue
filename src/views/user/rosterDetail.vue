<template>
  <div class="roster-detail-container">
    <div class="roster-detail-calendar-container">
      <div ref="myChart" :style="{ width: '500px', height: '800px' }"></div>
    </div>
    <div class="roster-detail-list-container">
      <h2>{{ userId }}员工排班详情</h2>
      <el-card class="box-card" v-for="(link, index) in linksList" :key="index">
        <template #header>
          <div
            class="card-header"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span>排版信息{{ index }}</span>
            <el-button type="text" class="button">移除</el-button>
          </div>
        </template>
        <div>
          <p>开始时间:{{ schList[link.source].currDate }}</p>
          <p>开始时间:{{ schList[link.target].currDate }}</p>
        </div>
      </el-card>
      <p
        v-if="linksList == undefined || linksList.length <= 0"
        style="color: red"
      >
        该员工近40天内暂无排版信息
      </p>
    </div>
  </div>
  <p>
    测量上是显示当前前十天和后三十天的整体数据，每天每天的显示，然后右侧列表列出对应的所有区间的数据
  </p>
</template>

<script lang="ts">
import { ref, shallowRef, defineComponent } from "vue";
import * as echarts from "echarts";
import axios from "@/axios/index";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  props: {
    uid: String,
  },
  setup(props) {
    /**
     * 网络请求获取数据
     */
    let realDate = new Date();
    let currDate = `${realDate.getFullYear()}/${
      realDate.getMonth() + 1
    }/${realDate.getDate()}`;
    let startTime = ref();
    let endTime = ref();
    let realData = ref();
    let schList = ref();
    let linksList = ref();
    axios
      .get(`/pms/leader/60-schedules?date=${currDate}&userId=${props.uid}`)
      .then(
        (resp) => {
          console.log(resp);
          let data = resp.data.data;
          startTime.value = data.startTime;
          endTime.value = data.endTime;
          graphData = data.schedulesDtoList
            .filter((e: any) => e.point == true)
            .map((e: any) => [e.currDate, e.stypeId]);
          schList.value = data.schedulesDtoList.filter(
            (e: any) => e.point == true
          );
          let pl = data.schedulesDtoList.filter((e: any) => e.point == true)
            .length;
          let parr = [];
          console.log(pl);
          for (let i = 0; i < pl; i++) {
            parr.push(i);
          }
          let pl_set = new Set(parr);
          console.log("data.link", data.link);
          data.link.forEach((e: any) => {
            pl_set.delete(e.source);
            pl_set.delete(e.target);
          });
          console.log("pl_set", pl_set);

          linksList.value = data.link;
          for (let item of pl_set) {
            linksList.value.push({ source: item, target: item });
          }
          function compare(p: any) {
            //这是比较函数
            return function (m: any, n: any) {
              var a = m[p];
              var b = n[p];
              return a - b; //升序
            };
          }
          linksList.value.sort(compare("source"));
          realData.value = data.schedulesDtoList
            // .filter((e: any) => e.point == true)
            .map((e: any) => [e.currDate, e.stypeId]);
          // console.log(graphData, realData.value);

          //设置各个值
          mychartOption.title.subtext = `${startTime.value}至${endTime.value}`;
          mychartOption.calendar.range = [startTime.value, endTime.value];
          mychartOption.series[0].data = graphData;
          mychartOption.series[0].links = data.link;
          mychartOption.series[1].data = realData.value;
          mychartOption.series[2].data = realData.value;

          // console.log(links);

          myCharts.value.chart1.setOption(mychartOption);
          myCharts.value.chart1.hideLoading();
        },
        (error) => {
          console.log(error);
        }
      );

    // console.log(props.uid);
    /**
     * 日历图内容如下 ,graphData用来标记每个排班的起点和终点
     */
    let graphData: any[] = [
      // ["2021-02-01", "260"],
      // ["2021-02-04", 200],
      // ["2021-02-09", 279],
      // ["2021-02-13", 847],
      // ["2021-02-18", 241],
      // ["2021-02-23", 411],
      // ["2021-03-14", 985],
    ];

    /**
     * links用于链接各个排班的起点和终点
     */
    let links = graphData.map((item, idx) => {
      return {
        source: idx,
        target: idx + 1,
      };
    });
    links.pop();
    //获得虚拟排版数据
    // function getVirtulData(year?: string): any[] {
    //   year = year || "2021";
    //   var date = +echarts.number.parseDate(year + "-01-01");
    //   var end = +echarts.number.parseDate(+year + 1 + "-05-01");
    //   var dayTime = 3600 * 24 * 1000;
    //   var data = [];
    //   for (var time = date; time < end; time += dayTime) {
    //     // console.log(
    //     //   echarts.time.format(time, "{yyyy}-{MM}-{dd}", true).toString(),
    //     //   Math.floor(Math.random() * 1000)
    //     // );

    //     data.push([
    //       // echarts.time.format(time,'yyyy-MM-dd');
    //       echarts.time.format(time, "{yyyy}-{MM}-{dd}", true).toString(),
    //       Math.floor(Math.random() * 4),
    //     ]);
    //   }
    //   return data;
    // }
    /**
     * 表格option
     */
    let mychartOption = {
      title: {
        top: "40",
        text: "日历表",
        subtext: "20xx-0x至20xx-0x",
        textStyle: {
          fontSize: 14,
          align: "center",
        },
        subtextStyle: {
          align: "center",
        },
      },
      tooltip: {},
      calendar: {
        top: "140",
        left: "center",
        orient: "vertical",
        cellSize: 40,
        yearLabel: {
          margin: 50,
          fontSize: 30,
        },
        dayLabel: {
          firstDay: 1,
          nameMap: "cn",
        },
        monthLabel: {
          nameMap: "cn",
          margin: 15,
          fontSize: 20,
          color: "#999",
        },
        range: ["2021-05-03", "2021-07-04"],
      },
      visualMap: {
        min: 0,
        max: 5,
        type: "piecewise",
        left: "center",
        top: 20,
        pieces: [
          { value: 1, label: "白班01", color: "#C6E48B" },
          { value: 2, label: "夜班01", color: "#91e47f" },
          { value: 3, label: "白班02", color: "#a0d7ff" },
          { value: 4, label: "夜班02", color: "#ffa26b" },
          { value: 0, label: "未排班", color: "#ff1826" },
        ],
        seriesIndex: [1],
        orient: "horizontal",
      },
      series: [
        {
          type: "graph",
          edgeSymbol: ["none", "arrow"],
          coordinateSystem: "calendar",
          links: links,
          symbolSize: 15,
          calendarIndex: 0,
          itemStyle: {
            color: "pink",
            shadowBlur: 9,
            shadowOffsetX: 1.5,
            shadowOffsetY: 3,
            shadowColor: "#000",
          },
          lineStyle: {
            color: "#D10E00",
            width: 1,
            opacity: 1,
          },
          data: graphData,
          z: 20,
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: realData.value,
        },
        {
          type: "scatter",
          coordinateSystem: "calendar",
          symbolSize: 1,
          label: {
            show: true,
            formatter: function (params: any) {
              // console.log("params", params);
              return params.data[0].substring(8);
              // var d = echarts.number.parseDate(params);
              // return d.getDate();
            },
            color: "#000",
          },
          data: ["2017-02-23", "2017-02-24", "2017-03-31"],
        },
      ],
    };

    /**
     * 表格绘制
     */
    const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();

    const myCharts = shallowRef<any>({
      chart1: {},
    });

    setTimeout(() => {
      myCharts.value.chart1 = echarts.init(myChart.value!, { renderer: "svg" });
      myCharts.value.chart1.showLoading();
      myCharts.value.chart1.setOption(mychartOption);
      myCharts.value.chart1.on(
        "click",
        function (params: { name: string | number | boolean }) {
          console.log("click", params);
        }
      );
    }, 10);

    return { userId: ref(props.uid), myChart, schList, linksList };
  },
});
</script>

<style>
.roster-detail-container {
  display: flex;
}
.roster-detail-calendar-container {
  width: 35%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
.roster-detail-list-container {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  width: -webkit-fill-available;
}
</style>
