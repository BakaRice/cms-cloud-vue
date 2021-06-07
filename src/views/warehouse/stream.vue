<template>
  <div class="plan-container">
    <div class="plan-container-right">
      <div style="text-align: start">
        <h2>出入库单列表</h2>
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
            <el-button type="primary" @click="createBound('/inbound')">
              新增入库
            </el-button>
            <el-button type="primary" @click="onReset">新增出库</el-button>
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
              <el-button
                @click.enter.prevent="editDetailRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                下载excel
              </el-button>
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
  </div>
  <div style="text-align: start">
    <h1>出入库管理</h1>
    <p>
      对所有出入库单进行基本的列表分页显示，同时能够对相应的单据进行excel下载，带有查询条件
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    //提前定义数据内容 列表格式
    //定义种类列表
    const typeTableLabel = [
      { label: "id", width: "40", prop: "id" },
      { label: "类型", width: "", prop: "type" },
      { label: "操作人", width: "", prop: "userName" },
      { label: "操作时间", width: "", prop: "time" },
      { label: "所属库", width: "200", prop: "warehouseName" },
      { label: "相关供应商", width: "200", prop: "supplierName" },
    ];
    //提前定义操作内容 列表格式
    const tableOperationLabel = [{ label: "操作", width: "", prop: "detail" }];
    //读取页面数据 总数，总页数，当前页
    const tableData = ref([
      {
        id: "1",
        type: "出库",
        userName: "张武醒",
        time: "2021-05-12T07:26:33 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "2",
        type: "出库",
        userName: "谭文韬",
        time: "2021-05-12T07:26:33 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "3",
        type: "出库",
        userName: "谭文韬",
        time: "2021-05-11T07:26:33 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "4",
        type: "入库",
        userName: "谭文韬",
        time: "2021-05-10T08:51:17 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "5",
        type: "出库",
        userName: "谭文韬",
        time: "2019-09-12T07:26:33 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "6",
        type: "出库",
        userName: "谭文韬",
        time: "2020-09-10T08:51:17 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
      },
      {
        id: "7",
        type: "出库",
        userName: "谭文韬",
        time: "2017-02-25T04:34:52 -08:00",
        warehouseName: "中央仓库01",
        supplierName: "丹江铸力",
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
    const createBound = (URI: string) => {
      router.push(URI);
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
      createBound,
    };
  },
};
</script>

<style>
.plan-container {
  display: flex;
}
.plan-container-right {
  width: 100%;
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
