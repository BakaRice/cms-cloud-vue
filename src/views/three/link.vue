<template>
  <el-table
    :data="this.taleData_ref"
    border
    style="width: 100%"
    row-class-name="row"
    cell-class-name="column"
    :row-style="setRowStyle"
    :cell-style="setColumnStyle"
    :highlight-current-row="true"
    @cell-click="cellClick"
    fit
  >
    <el-table-column
      v-for="(item, index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :width="item.width"
      :label="item.label"
    ></el-table-column>
  </el-table>
  {{ total_ref }},{{ pageNum_ref }}
</template>

<script lang="ts">
import axios from "@/axios/index";
import { reactive, defineComponent, ref } from "vue";
import { Chen } from "@/datasource/Types";

export default defineComponent({
  setup() {
    const tableLabel = [
      { label: "id", width: "40", prop: "id" },
      { label: "name", width: "", prop: "name" },
      { label: "rece", width: "", prop: "rece" },
      { label: "send", width: "", prop: "send" },
    ];
    const taleData_ref = ref();
    const total_ref = ref(10);
    const pageNum_ref = ref(1);
    const req = {};
    axios.post("/data", req).then((resp) => {
      total_ref.value = resp.data.total;
      pageNum_ref.value = resp.data.pages;
      taleData_ref.value = resp.data.list;
      console.log(
        "通用分页查询:pageNum" +
          pageNum_ref.value +
          ",total:" +
          taleData_ref.value
      );
    });

    return {
      total_ref,
      pageNum_ref,
      taleData_ref,
      tableLabel,
    };
  },
});
</script>
