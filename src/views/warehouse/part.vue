<template>
  <div class="part-container">
    <div class="part-container-left">
      <div style="text-align: start">
        <h2>零件信息管理</h2>
        <el-form :inline="true" :model="findContent" class="demo-form-inline">
          <el-form-item label="查询内容">
            <el-input
              v-model="findContent.get"
              placeholder="类型|供应商|编号"
              :width="200"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onFind">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-table
          :data="this.tableData"
          border
          style="width: 100%"
          :highlight-current-row="true"
          :size="mini"
        >
          <!-- 通用数据列表 -->
          <el-table-column
            v-for="(item, index) in typeTableLabel"
            :key="index"
            :prop="item.prop"
            :width="item.width"
            :label="item.label"
          ></el-table-column>
          <!-- 通用操作列表 -->
          <el-table-column
            v-for="(itemOp, indexOp) in tableOperationLabel"
            :key="indexOp"
            :index="indexOp"
            :prop="itemOp.prop"
            :width="itemOp.width"
            :label="itemOp.label"
          >
            <!-- <el-button type="info" @click="getUserdetail(itemOp)">详情</el-button> -->
            <template #default="scope">
              <el-button
                @click.enter.prevent="getDetailRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                详情
              </el-button>
              <!-- <el-button
                @click.enter.prevent="editDetailRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                编辑
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- pageNum:{{ pageNum }},totalPage:{{ totalPage }},currPage:{{ currPage }} -->

        <div class="el-row is-justify-end el-row--flex">
          <el-pagination
            background
            layout="total,prev, pager, next"
            :page-count="totalPage"
            :page-size="10"
            :current-page="currPage"
            :currentPage="currPage"
            @current-change="getPageInfo"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
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
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import store from "@/store";
import router from "@/router";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
export default {
  name: "warehouse-part",
  setup() {
    //提前定义数据内容 列表格式
    //定义种类列表
    const typeTableLabel = [
      { label: "idx", width: "40", prop: "id" },
      { label: "零件名称", width: "", prop: "name" },
      { label: "供应商名称", width: "", prop: "supplierName" },
      { label: "供应商编号", width: "", prop: "supplierId" },
      { label: "零件类型编号", width: "200", prop: "cargoTypeId" },
      { label: "零件类型名称", width: "", prop: "cargoTypeName" },
    ];
    //提前定义操作内容 列表格式
    const tableOperationLabel = [{ label: "操作", width: "", prop: "detail" }];
    //读取页面数据 总数，总页数，当前页
    const tableData = ref([
      {
        id: 1,
        name: "Z482曲轴前油封",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "GS456807468GA",
        cargoTypeName: "零件",
      },
      {
        id: 2,
        name: "V2403活塞",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "AS206807468GA",
        cargoTypeName: "零件",
      },
      {
        id: 3,
        name: "洋马3TNM74缸盖总成",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "AS2068078786AA",
        cargoTypeName: "零件",
      },
      {
        id: 4,
        name: "曲轴密封-68078786AA",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "PS20243251A3571",
        cargoTypeName: "零件",
      },
      {
        id: 5,
        name: "6D125E-2A-40四配套 大小瓦止推片",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "PS20243251A0001",
        cargoTypeName: "零件",
      },
      {
        id: 6,
        name: "曲轴密封-68078786AA",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "PS2043221A0001",
        cargoTypeName: "零件",
      },
      {
        id: 7,
        name: "6D125E-2A-40四配套 大小瓦止推片",
        // code: "PS20210521A0001",
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeId: "PS20210521A0001",
        cargoTypeName: "零件",
      },
    ]);
    const total = ref<number>(0); //总数
    let totalPage = ref<number>(0); //总页数
    const currPage = ref<number>(1); //当前页

    //请求内容 默认分页从第一页开始 每页10项内容
    let req = { pageNum: 1, pageSize: 10 };

    //查询内容
    let findContent = ref({
      get: "",
    });

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
          // console.log("click", params);
          check(params);
        }
      );
    }, 10);

    let check = async (params: any) => {
      console.log("check", params.data.name);
      let currCheck = params.data.name;
      if (currCheck == "零件") {
        let resp = await axios.get(
          `/pms/warehouse/parts?pageNum=1&pageSize=10`
        );
        let data = resp.data.data.list;

        tableData.value = data;
        console.log("备件", data);
      } else if (currCheck == "备件") {
        let resp = await axios.get(
          `/pms/warehouse/space-parts?pageNum=1&pageSize=10`
        );
        let data = resp.data.data.list;

        tableData.value = data;
        console.log("备件", data);
      }

      // await axios.get()
    };

    const onFind = () => {
      console.log("userinfo查询接口", findContent.value);
      if (findContent.value.get === null || findContent.value.get === "") {
        store.commit(UPDATE_EXCEPTION, "查询内容不能为空！");
      } else {
        // axiosGetonFind();
        console.log("PART 查询功能未实现！");
      }
    };

    const onReset = () => {
      findContent.value.get = "";
      console.log("PART 查询功能重置！");
      // axios
      //   .get(
      //     "/pms/leader/infos?pageNum=" +
      //       req.pageNum +
      //       "&pageSize=" +
      //       req.pageSize
      //   )
      //   .then((resp) => {
      //     total.value = resp.data.data.total;
      //     currPage.value = resp.data.data.pageNum;
      //     totalPage.value = resp.data.data.pages;
      //     tableData.value = resp.data.data.list;
      //     console.log(tableData.value);
      //   });
    };

    //获取页面内容
    const getPageInfo = (cp: number) => {
      console.log("通用分页模板:改变页数:", cp, req, currPage.value);
      // if (cp == undefined) {
      //   cp = 1;
      // }
      req.pageNum = cp;
      currPage.value = cp;
      console.log("获取分页内容未实现!");

      // //进行内容查询
      // axios
      //   .get(
      //     "/pms/leader/infos?pageNum=" +
      //       req.pageNum +
      //       "&pageSize=" +
      //       req.pageSize
      //   )
      //   .then((resp) => {
      //     total.value = resp.data.data.total;
      //     currPage.value = resp.data.data.pageNum;
      //     totalPage.value = resp.data.data.pages;
      //     tableData.value = resp.data.data.list;
      //   });
    };

    const getDetailRow = (index: number, rows: Array<any>) => {
      // rows.splice(index, 1);
      console.log(index, rows);
      // const uid = rows[index].idString;
      // router.push({
      //   path: "/userInfo/" + uid,
      // });
    };

    const editDetailRow = (index: number, rows: Array<any>) => {
      // rows.splice(index, 1);
      console.log(index, rows);
      // const uid = rows[index].idString;
      // router.push({
      //   path: "/userEdit/" + uid,
      // });
    };

    axios.get("/pms/warehouse/Sunburst").then(
      (resp) => {
        console.log(resp);
        mychartData = resp.data.data;
        console.log("mychartData", mychartData);
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
    return {
      myChart,
      findContent,
      onFind,
      onReset,
      total,
      totalPage,
      currPage,
      tableData,
      typeTableLabel,
      tableOperationLabel,
      getPageInfo,
      getDetailRow,
      editDetailRow,
    };
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
