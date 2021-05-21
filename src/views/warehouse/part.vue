<template>
  <div class="part-container">
    <div class="part-container-left">left</div>
    <div class="part-container-right">
      <div class="part-container-right-up">
        <div ref="myChart" :style="{ width: '500px', height: '500px' }"></div>
      </div>
      <div class="part-container-right-down">
        <h2>操作列表</h2>

        <div class="link">
          <img
            class="link-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
          />
          <span>新建入库单</span>
        </div>
        <div class="link">
          <img
            class="link-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
          />
          <span>新建出库单</span>
        </div>
        <div class="link">
          <img
            class="link-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
          />
          <span>查看入库单列表</span>
        </div>
        <div class="link">
          <img
            class="link-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
          />
          <span>查看出库单列表</span>
        </div>
      </div>
    </div>
  </div>
  <div style="text-align: start">
    <h1>零件存储管理</h1>
    <div>
      <h4>零部件存储过程</h4>
      <p>
        当零部件的状态编码与入库指定的状态编码相同时，才可以进行入库操作。
        入库操作
        需要新建入库单，在入库单中填写相应的零件编号，入库的位置，对应的库存位置，对应的库存管理员，对应的生产操作人员，对应的操作时间。同时可以生产入库单，作为excel进行导出。
      </p>
    </div>

    <div>
      <h4>零部件生产流转过程</h4>
      <p>
        零件存储管理过程：生产工人进行零件的生产，每个零件在进入生产流程时就已经规定好对应的工序，在每个工序的流转过程中，
        都会产生对应的流转标志（二进制数字）
        <b>（0000 0000 0000 0000 0000 0000 0000 0000 ）</b>
      </p>
      <p>
        流转标志由一串长32位的数字表示,其前四位表示零件的检测级别，后四位表示零件的当前检测状态
      </p>

      <p>例子:</p>
      <p>
        某一零件的检测级别位为全部检查，全部检查的前四位代码为1111，后四位表示零件当前检测状态，当检测值为1111，表示通过最终检测，可以入库。
      </p>
      <p>
        由于中间24位的工序位，具有顺序性，当某一工序拿到零件时，对零件进行扫码，获取当前零件的状态，即可判断当前零件的工序执行情况，保障了工序的序列化操作，能够有效防止漏序现象的产生。
      </p>
      <figure>
        <table>
          <thead>
            <tr>
              <th>检测级别位</th>
              <th>1-4道工序</th>
              <th>5-8道工序</th>
              <th>9-12道工序</th>
              <th>13-16道工序</th>
              <th>17-20道工序</th>
              <th>21-24道工序</th>
              <th>检测状态位</th>
              <th>内容解释</th>
              <th>16进制表示</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1111</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>检测级别位最高级且未进行加工的零件</td>
              <td>73def7bdf0</td>
            </tr>
            <tr>
              <td>1111</td>
              <td>1000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>检测级别位最高级且进行了第一道工序加工的零件</td>
              <td>75def7bdf0</td>
            </tr>
            <tr>
              <td>1111</td>
              <td>1100</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>检测级别位最高级且进行了第一二道工序加工的零件</td>
              <td>76def7bdf0</td>
            </tr>
            <tr>
              <td>...</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>1111</td>
              <td>1111</td>
              <td>1111</td>
              <td>1000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>1111</td>
              <td>检测级别为最高级，且进行了九道工序和最终检测的零件</td>
              <td>77bd77bdff</td>
            </tr>
          </tbody>
        </table>
      </figure>
      <p>
        从上述表格，可知，仅当零件的状态编号为 77bd77bdff
        时，才能进行入库操作。否则不能进行库存，仅能存储零件流转区。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, shallowRef } from "vue";
import * as echarts from "echarts";
import axios from "@/axios/index";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
export default {
  name: "warehouse-part",
  setup() {
    /************************************
     * 列表数据格式定义
     */

    //定义种类列表
    let TypeTabelData = ref([
      {
        // id: "",
        name: "零件名称0001",
        // code: "PS20210521A0001",
        supplierName: "供应商名称1",
        supplierId: "1",
        cargoTypeId: "0",
        cargoTypeName: "零件",
      },
    ]);

    let CargoTableData = ref([
      {
        id: 0,
        name: "",
        code: "",
        typeCode: "",
        typeName: "",
        workId: "",
        workerName: "",
        supplierId: "",
        supplierName: "",
        status: 0,
        in_time: "",
        out_time: "",
        create_by: "",
        update_by: "",
        create_time: "",
        update_tieme: "",
        inbound_id: "",
        outbound_id: "",
      },
    ]);
    /************************************
     * 表格绘制
     */
    const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
    let mychartData = [{}];
    let mychartOption = {
      title: {
        text: "仓储管理概况旭日图",
        subtext: "提供类型、供应商、下属种类三级概况",
        textStyle: {
          fontSize: 14,
          align: "center",
        },
        subtextStyle: {
          align: "center",
        },
      },
      series: {
        type: "sunburst",

        data: mychartData,
        radius: [0, "95%"],
        sort: null,

        emphasis: {
          focus: "ancestor",
        },

        levels: [
          {},
          {
            r0: "15%",
            r: "35%",
            itemStyle: {
              borderWidth: 2,
            },
            label: {
              rotate: "tangential",
            },
          },
          {
            r0: "35%",
            r: "70%",
            label: {
              align: "right",
            },
          },
          {
            r0: "70%",
            r: "72%",
            label: {
              position: "outside",
              padding: 3,
              silent: false,
            },
            itemStyle: {
              borderWidth: 3,
            },
          },
        ],
      },
    };

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

    axios.get("/pms/warehouse/Sunburst").then(
      (resp) => {
        console.log(resp);
        mychartData = resp.data.data;
        console.log(mychartData);
        myCharts.value.chart1.hideLoading();
        myCharts.value.chart1.setOption({
          series: {
            type: "sunburst",

            data: resp.data.data,
            radius: [0, "95%"],
            sort: null,

            emphasis: {
              focus: "ancestor",
            },

            levels: [
              {},
              {
                r0: "15%",
                r: "35%",
                itemStyle: {
                  borderWidth: 2,
                },
                label: {
                  rotate: "tangential",
                },
              },
              {
                r0: "35%",
                r: "70%",
                label: {
                  align: "right",
                },
              },
              {
                r0: "70%",
                r: "72%",
                label: {
                  position: "outside",
                  padding: 3,
                  silent: false,
                },
                itemStyle: {
                  borderWidth: 3,
                },
              },
            ],
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return { myChart };
  },
};
</script>

<style>
.part-container {
  display: flex;
}
.part-container-left {
  width: 60%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.part-container-right {
  width: 40%;
  margin-left: 10px;
}
.part-container-right-up {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.part-container-right-down {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}

.link {
  text-align: start;
  padding: 10px;
  font-size: inherit;
}
.link-img {
  width: 20px;
  height: 20px;
  margin: 0 12px 0 24px;
}
</style>
