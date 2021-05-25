<template>
  <userAdd />
  <div class="bigCard">
    <div style="text-align: start">
      <h2>员工信息管理</h2>
      <el-form :inline="true" :model="findContent" class="demo-form-inline">
        <el-form-item label="查询内容">
          <el-input
            v-model="findContent.get"
            placeholder="姓名|手机号|地址|身份证"
            :width="200"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onFind">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="success" @click="onAdd">新增</el-button>
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
          v-for="(item, index) in tableLabel"
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
              编辑
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

  <p>
    在员工信息管理中，可以查看自己所在的用户权限的用户信息，如机构领导，可以查看当前机构下的所有员工信息，
    并对员工信息进行修改，班组领导可以查看当前班组下所有员工信息，并对员工信息进行修改。
    管理员可以查看所有用户信息并对用户信息进行新增、修改和删除操作。
  </p>
</template>

<script lang="ts">
import axios from "@/axios/index";
import router from "@/router";
import store from "@/store";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    //提前定义数据内容 列表格式
    const tableLabel = [
      { label: "用户编号", width: "", prop: "idString" },
      { label: "姓名", width: "", prop: "name" },
      { label: "身份证号码", width: "", prop: "idcardNumber" },
      { label: "账号状态", width: "", prop: "accountStateDesc" },
      { label: "手机号码", width: "", prop: "phone" },
      { label: "基础薪资", width: "", prop: "salary" },
    ];
    //提前定义操作内容 列表格式
    const tableOperationLabel = [{ label: "操作", width: "", prop: "detail" }];
    //读取页面数据 总数，总页数，当前页
    const tableData = ref();
    const total = ref<number>(0); //总数
    let totalPage = ref<number>(0); //总页数
    const currPage = ref<number>(1); //当前页

    //请求内容 默认分页从第一页开始 每页10项内容
    let req = { pageNum: 1, pageSize: 10 };

    //查询内容
    let findContent = ref({
      get: "",
    });

    const onFind = () => {
      console.log("userinfo查询接口", findContent.value);
      if (findContent.value.get === null || findContent.value.get === "") {
        store.commit(UPDATE_EXCEPTION, "查询内容不能为空！");
      } else {
        axiosGetonFind();
      }
    };
    const onAdd = () => {
      router.push({
        path: "/userAdd/",
      });
    };
    const onReset = () => {
      findContent.value.get = "";
      axios
        .get(
          `/pms/leader/infos?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
        )
        .then((resp) => {
          total.value = resp.data.data.total;
          currPage.value = resp.data.data.pageNum;
          totalPage.value = resp.data.data.pages;
          tableData.value = resp.data.data.list;
          console.log(tableData.value);
        });
    };
    const axiosGetonFind = () => {
      axios
        .get(
          `/pms/leader/info?find=${findContent.value.get}&pageNum=${req.pageNum}&pageSize=${req.pageSize}`
        )
        .then(
          (resp) => {
            console.log(resp);
            total.value = resp.data.data.total;
            currPage.value = resp.data.data.pageNum;
            totalPage.value = resp.data.data.pages;
            tableData.value = resp.data.data.list;
            console.log(tableData.value);
          },
          (error) => {
            console.log(error);
          }
        );
    };

    //获得初始化数据
    axios
      .get(`/pms/leader/infos?pageNum=${req.pageNum}&pageSize=${req.pageSize}`)
      .then((resp) => {
        total.value = resp.data.data.total;
        currPage.value = resp.data.data.pageNum;
        totalPage.value = resp.data.data.pages;
        tableData.value = resp.data.data.list;
        console.log(tableData.value);
      });
    //获取页面内容
    const getPageInfo = (cp: number) => {
      console.log("通用分页模板:改变页数:", cp, req, currPage.value);
      // if (cp == undefined) {
      //   cp = 1;
      // }
      req.pageNum = cp;
      currPage.value = cp;

      //进行内容查询
      axios
        .get(
          `/pms/leader/infos?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
        )
        .then((resp) => {
          total.value = resp.data.data.total;
          currPage.value = resp.data.data.pageNum;
          totalPage.value = resp.data.data.pages;
          tableData.value = resp.data.data.list;
        });
    };

    const getDetailRow = (index: number, rows: Array<any>) => {
      console.log(index, rows);
      const uid = rows[index].idString;
      router.push({
        path: "/userInfo/" + uid,
      });
    };

    const editDetailRow = (index: number, rows: Array<any>) => {
      console.log(index, rows);
      const uid = rows[index].idString;
      router.push({
        path: "/userEdit/" + uid,
      });
    };

    return {
      findContent,
      onFind,
      onReset,
      onAdd,
      total,
      totalPage,
      currPage,
      tableData,
      tableLabel,
      tableOperationLabel,
      getPageInfo,
      getDetailRow,
      editDetailRow,
    };
  },
});
</script>

<style>
.bigCard {
  min-height: 100%;
  padding: 20px;
  background: #fff;
  position: relative;
  margin-bottom: 64px;
}
</style>
