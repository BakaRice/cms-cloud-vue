<template>
  <div class="an-container">
    <div class="an-container-left">
      <h2>{{ part.name }}</h2>
      <div class="an-container-left-ul">
        <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
          <div>
            <el-checkbox
              v-for="city in quailtyCheckOptions"
              :label="city.id"
              :key="city.id"
              @change="clickBox(city.id)"
              class="an-container-left-ul-item"
            >
              <p>
                <span style="color: red">{{ city.name }}</span>
                <span>{{ city.tyepeName }}</span>
              </p>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="an-container-right">
      <div class="an-container-right-up">
        <div ref="myChart" :style="{ width: '700px', height: '500px' }"></div>
      </div>
      <div class="an-container-right-down">
        <h1>选取内容细节</h1>

        <div v-for="checkItem in checkDetail" :key="checkItem.id">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ checkItem.name }}</span>
                <el-button class="button" type="text">清除</el-button>
              </div>
            </template>
            <div style="display: flex">
              <div class="an-container-right-down-card-item">
                <p>x:{{ checkItem.x }}</p>
                <p>y:{{ checkItem.y }}</p>
                <p>z:{{ checkItem.z }}</p>
              </div>
              <div class="an-container-right-down-card-item">
                <p>x:{{ checkItem.x1 }}</p>
                <p>y:{{ checkItem.y1 }}</p>
                <p>z:{{ checkItem.z1 }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
  <div style="text-align: start">
    <h1>质量分析</h1>
    <p>人员质量分析，批次质量分析，时段质量分析，零件种类质量分析</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  setup() {
    /***********************
     * echarts
     ***********************/
    const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
    const myCharts = shallowRef<any>({
      chart1: {},
      chart2: {},
    });
    let mychartOption = {
      title: {
        text: "左侧下小孔形状公差圆度与左侧下小孔位置公差圆跳动对比",
        subtext: "2021/05/22",
      },
      grid: {
        left: "3%",
        right: "7%",
        bottom: "7%",
        containLabel: true,
      },
      tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        formatter: function (params: any) {
          if (params.value.length > 1) {
            return (
              params.seriesName +
              " :<br/>" +
              params.value[0] +
              "㎛ " +
              params.value[1] +
              "㎛ "
            );
          } else {
            return "" + params.name + " : " + params.value + "㎛ ";
          }
        },
        axisPointer: {
          show: true,
          type: "cross",
          lineStyle: {
            type: "dashed",
            width: 1,
          },
        },
      },
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ["rect", "polygon", "clear"],
          },
        },
      },
      brush: {},
      xAxis: [
        {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} ㎛",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} ㎛",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "effectScatter",
          symbolSize: 20,
          name: "不合格",
          data: [
            [172.7, 105.2],
            [182.9, 81.8],
          ],
        },
        {
          name: "误差",
          type: "scatter",
          emphasis: {
            focus: "series",
          },
          data: [
            [161.2, 51.6],
            [167.5, 59.0],
            [159.5, 49.2],
            [157.0, 63.0],
            [155.8, 53.6],
            [170.0, 59.0],
            [159.1, 47.6],
            [166.0, 69.8],
            [176.2, 66.8],
            [160.2, 75.2],
            [172.5, 55.2],
            [170.9, 54.2],
            [172.9, 62.5],
            [153.4, 42.0],
            [160.0, 50.0],
            [147.2, 49.8],
            [168.2, 49.2],
            [175.0, 73.2],
            [157.0, 47.8],
            [167.6, 68.8],
            [159.5, 50.6],
            [175.0, 82.5],
            [166.8, 57.2],
            [176.5, 87.8],
            [170.2, 72.8],
            [174.0, 54.5],
            [173.0, 59.8],
            [179.9, 67.3],
            [170.5, 67.8],
            [160.0, 47.0],
            [154.4, 46.2],
            [162.0, 55.0],
            [176.5, 83.0],
            [160.0, 54.4],
            [152.0, 45.8],
            [162.1, 53.6],
            [170.0, 73.2],
            [160.2, 52.1],
            [161.3, 67.9],
            [166.4, 56.6],
            [168.9, 62.3],
            [163.8, 58.5],
            [167.6, 54.5],
            [160.0, 50.2],
            [161.3, 60.3],
            [167.6, 58.3],
            [165.1, 56.2],
            [160.0, 50.2],
            [170.0, 72.9],
            [157.5, 59.8],
            [167.6, 61.0],
            [160.7, 69.1],
            [163.2, 55.9],
            [152.4, 46.5],
            [157.5, 54.3],
            [168.3, 54.8],
            [180.3, 60.7],
            [165.5, 60.0],
            [165.0, 62.0],
            [164.5, 60.3],
            [156.0, 52.7],
            [160.0, 74.3],
            [163.0, 62.0],
            [165.7, 73.1],
            [161.0, 80.0],
            [162.0, 54.7],
            [166.0, 53.2],
            [174.0, 75.7],
            [172.7, 61.1],
            [167.6, 55.7],
            [151.1, 48.7],
            [164.5, 52.3],
            [163.5, 50.0],
            [152.0, 59.3],
            [169.0, 62.5],
            [164.0, 55.7],
            [161.2, 54.8],
            [155.0, 45.9],
            [170.0, 70.6],
            [176.2, 67.2],
            [170.0, 69.4],
            [162.5, 58.2],
            [170.3, 64.8],
            [164.1, 71.6],
            [169.5, 52.8],
            [163.2, 59.8],
            [154.5, 49.0],
            [159.8, 50.0],
            [173.2, 69.2],
            [170.0, 55.9],
            [161.4, 63.4],
            [169.0, 58.2],
            [166.2, 58.6],
            [159.4, 45.7],
            [162.5, 52.2],
            [159.0, 48.6],
            [162.8, 57.8],
            [159.0, 55.6],
            [179.8, 66.8],
            [162.9, 59.4],
            [161.0, 53.6],
            [151.1, 73.2],
            [168.2, 53.4],
            [168.9, 69.0],
            [173.2, 58.4],
            [171.8, 56.2],
            [178.0, 70.6],
            [164.3, 59.8],
            [163.0, 72.0],
            [168.5, 65.2],
            [166.8, 56.6],
            [172.7, 105.2],
            [163.5, 51.8],
            [169.4, 63.4],
            [167.8, 59.0],
            [159.5, 47.6],
            [167.6, 63.0],
            [161.2, 55.2],
            [160.0, 45.0],
            [163.2, 54.0],
            [162.2, 50.2],
            [161.3, 60.2],
            [149.5, 44.8],
            [157.5, 58.8],
            [163.2, 56.4],
            [172.7, 62.0],
            [155.0, 49.2],
            [156.5, 67.2],
            [164.0, 53.8],
            [160.9, 54.4],
            [162.8, 58.0],
            [167.0, 59.8],
            [160.0, 54.8],
            [160.0, 43.2],
            [168.9, 60.5],
            [158.2, 46.4],
            [156.0, 64.4],
            [160.0, 48.8],
            [167.1, 62.2],
            [158.0, 55.5],
            [167.6, 57.8],
            [156.0, 54.6],
            [162.1, 59.2],
            [173.4, 52.7],
            [159.8, 53.2],
            [170.5, 64.5],
            [159.2, 51.8],
            [157.5, 56.0],
            [161.3, 63.6],
            [162.6, 63.2],
            [160.0, 59.5],
            [168.9, 56.8],
            [165.1, 64.1],
            [162.6, 50.0],
            [165.1, 72.3],
            [166.4, 55.0],
            [160.0, 55.9],
            [152.4, 60.4],
            [170.2, 69.1],
            [162.6, 84.5],
            [170.2, 55.9],
            [158.8, 55.5],
            [172.7, 69.5],
            [167.6, 76.4],
            [162.6, 61.4],
            [167.6, 65.9],
            [156.2, 58.6],
            [175.2, 66.8],
            [172.1, 56.6],
            [162.6, 58.6],
            [160.0, 55.9],
            [165.1, 59.1],
            [182.9, 81.8],
            [166.4, 70.7],
            [165.1, 56.8],
            [177.8, 60.0],
            [165.1, 58.2],
            [175.3, 72.7],
            [154.9, 54.1],
            [158.8, 49.1],
            [172.7, 75.9],
            [168.9, 55.0],
            [161.3, 57.3],
            [167.6, 55.0],
            [165.1, 65.5],
            [175.3, 65.5],
            [157.5, 48.6],
            [163.8, 58.6],
            [167.6, 63.6],
            [165.1, 55.2],
            [165.1, 62.7],
            [168.9, 56.6],
            [162.6, 53.9],
            [164.5, 63.2],
            [176.5, 73.6],
            [168.9, 62.0],
            [175.3, 63.6],
            [159.4, 53.2],
            [160.0, 53.4],
            [170.2, 55.0],
            [162.6, 70.5],
            [167.6, 54.5],
            [162.6, 54.5],
            [160.7, 55.9],
            [160.0, 59.0],
            [157.5, 63.6],
            [162.6, 54.5],
            [152.4, 47.3],
            [170.2, 67.7],
            [165.1, 80.9],
            [172.7, 70.5],
            [165.1, 60.9],
            [170.2, 63.6],
            [170.2, 54.5],
            [170.2, 59.1],
            [161.3, 70.5],
            [167.6, 52.7],
            [167.6, 62.7],
            [165.1, 86.3],
            [162.6, 66.4],
            [152.4, 67.3],
            [168.9, 63.0],
            [170.2, 73.6],
            [175.2, 62.3],
            [175.2, 57.7],
            [160.0, 55.4],
            [165.1, 104.1],
            [174.0, 55.5],
            [170.2, 77.3],
            [160.0, 80.5],
            [167.6, 64.5],
            [167.6, 72.3],
            [167.6, 61.4],
            [154.9, 58.2],
            [162.6, 81.8],
            [175.3, 63.6],
            [171.4, 53.4],
            [157.5, 54.5],
            [165.1, 53.6],
            [160.0, 60.0],
            [174.0, 73.6],
            [162.6, 61.4],
            [174.0, 55.5],
            [162.6, 63.6],
            [161.3, 60.9],
            [156.2, 60.0],
            [149.9, 46.8],
            [169.5, 57.3],
            [160.0, 64.1],
            [175.3, 63.6],
            [169.5, 67.3],
            [160.0, 75.5],
            [172.7, 68.2],
            [162.6, 61.4],
            [157.5, 76.8],
            [176.5, 71.8],
            [164.4, 55.5],
            [160.7, 48.6],
            [174.0, 66.4],
            [163.8, 67.3],
          ],
          markArea: {
            silent: true,
            itemStyle: {
              color: "transparent",
              borderWidth: 1,
              borderType: "dashed",
            },
            data: [
              [
                {
                  name: "合格数据区间",
                  xAxis: "min",
                  yAxis: "min",
                },
                {
                  xAxis: 180,
                  yAxis: 100,
                },
              ],
            ],
          },
          markPoint: {
            // data: [
            //     {type: 'max', name: 'Max'},
            //     {type: 'min', name: 'Min'}
            // ]
          },
          markLine: {
            lineStyle: {
              type: "solid",
            },
            data: [{ type: "average", name: "平均值" }, { xAxis: 160 }],
          },
        },
      ],
    };
    const getRandomArbitrary = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    console.log(getRandomArbitrary(100, 140));
    let fakeData: any[] = [];
    for (let p = 0; p < 100; p++) {
      fakeData.push([
        getRandomArbitrary(140, 180),
        getRandomArbitrary(40, 100),
      ]);
    }
    console.log(fakeData);

    setTimeout(() => {
      // 绘制图表 chart1
      myCharts.value.chart1 = echarts.init(myChart.value!, { renderer: "svg" });
      mychartOption.series[1].data = fakeData;
      myCharts.value.chart1.setOption(mychartOption);
      myCharts.value.chart1.on("click", function (params: { name: any }) {
        console.log(params);
      });
    });
    let quailtyCheckOptions = [
      { id: "1", name: "右侧上小孔", tyepeName: "形状公差直线度" },
      { id: "2", name: "左侧下小孔", tyepeName: "形状公差圆度" },
      { id: "3", name: "左侧下小孔", tyepeName: "位置公差圆跳动" },
      { id: "4", name: "内嵌嵌入面", tyepeName: "形状公差圆柱度" },
      { id: "5", name: "右侧上小孔", tyepeName: "形状公差直线度" },
      { id: "6", name: "左侧下小孔", tyepeName: "形状公差直线度" },
      { id: "7", name: "左侧下小孔", tyepeName: "形状公差圆柱度" },
      { id: "8", name: "内嵌嵌入面", tyepeName: "形状公差圆柱度" },
    ];
    let checkedCities = ref([]);
    const clickBox = (id: any) => {
      console.log(id);
      console.log(checkedCities);
    };
    //点击后的选取细节
    let checkDetail = ref([
      {
        id: "4",
        name: "右侧上小孔",
        tyepeName: "形状公差直线度",
        x: "43244",
        y: "32354366",
        z: "6o857765",
        x1: "7987575356",
        y1: "32543",
        z1: "3235346",
      },
    ]);
    let part = ref({
      name: "6D125E-2A-40四配套 大小瓦止推片",
    });
    return {
      checkedCities,
      part,
      quailtyCheckOptions,
      clickBox,
      checkDetail,
      myChart,
    };
  },
});
</script>

<style>
.an-container {
  display: flex;
}
.an-container-left {
  width: 30%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
.an-container-right {
  width: 70%;
  margin-left: 10px;
}
.an-container-right-up {
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.an-container-right-down {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.an-container-left-ul-item {
  width: 100%;
  text-align: start;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.an-container-right-down-card-item {
  padding: 10px;
  background-color: lightgray;
  border-radius: 10px;
  margin: 10px;
  text-align: start;
}
</style>
