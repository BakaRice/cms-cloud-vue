<template>
  <div class="plan-container">
    <div class="plan-container-right">
      <div style="text-align: start">
        <h2>供应商信息管理</h2>
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
    <div class="plan-container-left">
      <h2>操作列表</h2>
      <div class="link">
        <img
          class="link-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
        />
        <span>新建供应商</span>
      </div>
      <div class="link">
        <img
          class="link-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
        />
        <span>新建备货单</span>
      </div>
      <div class="link">
        <img
          class="link-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
        />
        <span>查看近期入库单</span>
      </div>
      <div class="link">
        <img
          class="link-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
        />
        <span>查看近期出库单</span>
      </div>
    </div>
  </div>
  <div style="text-align: start">
    <h1>库存计划管理</h1>
    <p>
      库存计划应该包含对供应商的管理，供应商信息的添加，修改等，添加待补充备件信息，（即需求单概念）
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import store from "@/store";
import axios from "@/axios/index";
import router from "@/router";
export default {
  setup() {
    //提前定义数据内容 列表格式
    //定义种类列表
    const typeTableLabel = [
      { label: "供应商编号", width: "80", prop: "supplierId" },
      { label: "供应商名称", width: "", prop: "supplierName" },

      { label: "供应总类数", width: "200", prop: "totalTypeNum" },
      { label: "供应总数", width: "", prop: "totalNum" },
    ];
    //提前定义操作内容 列表格式
    const tableOperationLabel = [{ label: "操作", width: "", prop: "detail" }];
    //读取页面数据 总数，总页数，当前页
    const tableData = ref([
      {
        id: 1,
        supplierName: "丹江铸力",
        supplierId: "1",
        cargoTypeTotal: "20",
        cargoTotal: "234546",
      },
      {
        id: 2,
        supplierName: "江西皓森",
        supplierId: "2",
        cargoTypeTotal: "13",
        cargoTotal: "2346",
      },
      {
        id: 3,
        supplierName: "湛江德利",
        supplierId: "3",
        cargoTypeTotal: "7",
        cargoTotal: "8740",
      },
      {
        id: 4,
        supplierName: "吉林靖宇工业",
        supplierId: "4",
        cargoTypeTotal: "4",
        cargoTotal: "564",
      },
      {
        id: 5,
        supplierName: "江西皓森",
        supplierId: "2",
        cargoTypeTotal: "13",
        cargoTotal: "2346",
      },
      {
        id: 6,
        supplierName: "襄阳三枫",
        supplierId: "3",
        cargoTypeTotal: "7",
        cargoTotal: "8740",
      },
      {
        id: 7,
        supplierName: "杭州铬装",
        supplierId: "4",
        cargoTypeTotal: "43",
        cargoTotal: "87865782",
      },
    ]);
    const total = ref<number>(0); //总数
    let totalPage = ref<number>(0); //总页数
    const currPage = ref<number>(1); //当前页

    //请求内容 默认分页从第一页开始 每页10项内容
    let req = { pageNum: 1, pageSize: 10 };

    const GET_SUPPILER_OVERVIEW_URI = "/pms/supplier";
    axios
      .get(
        `${GET_SUPPILER_OVERVIEW_URI}?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
      )
      .then((res) => {
        console.log(res);
        let data = res.data.data;
        tableData.value = data.list;
        total.value = data.total;
        totalPage.value = data.pages;
        currPage.value = data.pageNum;
      });

    //查询内容
    let findContent = ref({
      get: "",
    });
    const onFind = () => {
      console.log("userinfo查询接口", findContent.value);
      if (findContent.value.get === null || findContent.value.get === "") {
        store.commit(UPDATE_EXCEPTION, "查询内容不能为空！");
      } else {
        // axiosGetonFind();
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
      axios
        .get(
          `${GET_SUPPILER_OVERVIEW_URI}?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
        )
        .then((res) => {
          console.log(res);
          let data = res.data.data;
          tableData.value = data.list;
          total.value = data.total;
          totalPage.value = data.pages;
          currPage.value = data.pageNum;
        });
    };

    const getDetailRow = (index: number, rows: Array<any>) => {
      // rows.splice(index, 1);
      console.log(index, rows);
      const sid = rows[index].supplierId;
      console.log(sid);

      router.push({
        path: "/supplier/" + sid,
      });
    };

    const editDetailRow = (index: number, rows: Array<any>) => {
      // rows.splice(index, 1);
      console.log(index, rows);
      // const uid = rows[index].idString;
      // router.push({
      //   path: "/userEdit/" + uid,
      // });
    };

    return {
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
.plan-container {
  display: flex;
}
.plan-container-right {
  width: 70%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
}
.plan-container-left {
  background-color: white;
  width: 30%;
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
