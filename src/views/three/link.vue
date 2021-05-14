<template>
  <!-- 通用分页及查询模板 -->
  <div style="text-align: start">
    <h4>通用分页查询模板 标题</h4>
    <el-form :inline="true" :model="findContent" class="demo-form-inline">
      <el-form-item label="xxxx">
        <el-input v-model="findContent.send" placeholder="xxxx"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="findContent.xxx" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addConditions">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="removeConditions">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table
    :data="this.tableData"
    border
    style="width: 100%"
    row-class-name="row"
    cell-class-name="column"
    :highlight-current-row="true"
    fit
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
      :prop="itemOp.prop"
      :width="itemOp.width"
      :label="itemOp.label"
    >
      <el-button type="info">从业人员</el-button>
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
</template>

<script lang="ts">
import axios from "@/axios/index";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    //提前定义数据内容 列表格式
    const tableLabel = [
      { label: "id", width: "40", prop: "id" },
      { label: "name", width: "", prop: "name" },
      { label: "rece", width: "", prop: "rece" },
      { label: "send", width: "", prop: "send" },
    ];
    ////提前定义操作内容 列表格式
    const tableOperationLabel = [
      { label: "OPERATION", width: "", prop: "operation" },
    ];
    //读取页面数据 总数，总页数，当前页
    const tableData = ref<number>();
    const total = ref<number>(0); //总数
    let totalPage = ref<number>(0); //总页数
    const currPage = ref<number>(0); //当前页

    //请求内容 默认分页从第一页开始 每页10项内容
    let req = { pageNum: 1, pageSize: 10, send: "", xxx: "xxx" };

    //查询内容
    let findContent = ref({
      send: "?",
      xxx: "xxx",
    });

    //获得初始化数据
    axios.post("/data", req).then((resp) => {
      total.value = resp.data.total;
      currPage.value = resp.data.pageNum;
      totalPage.value = resp.data.pages;
      tableData.value = resp.data.list;
    });

    const initPost = () => {
      axios.post("/data", req).then((resp) => {
        total.value = resp.data.total;
        currPage.value = resp.data.pageNum;
        totalPage.value = resp.data.pages;
        tableData.value = resp.data.list;
      });
    };

    //获取页面内容
    const getPageInfo = (cp: number) => {
      console.log("通用分页模板:改变页数:", cp, req);
      req.pageNum = cp;
      currPage.value = cp;

      //进行内容查询
      axios.post("/data", req).then((resp) => {
        total.value = resp.data.total;
        currPage.value = resp.data.pageNum;
        totalPage.value = resp.data.pages;
        tableData.value = resp.data.list;
      });
    };

    //添加查询条件
    const addConditions = () => {
      req.send = findContent.value.send;
      req.xxx = findContent.value.xxx;
      console.log("添加查询条件", req);
      initPost();
    };

    //重置查询条件
    const removeConditions = () => {
      req.send = "";
      req.xxx = "";
      //ref findContent的内容也要清空或设置为初始值
      findContent.value.send = "";
      findContent.value.xxx = "";
      console.log("重置查询条件", req);
      initPost();
    };

    return {
      addConditions,
      removeConditions,
      findContent,
      total,
      totalPage,
      currPage,
      tableData,
      tableLabel,
      tableOperationLabel,
      getPageInfo,
    };
  },
});
</script>
