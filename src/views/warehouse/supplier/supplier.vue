<template>
  <div style="display: flex">
    <div class="supplier-detail-edit-container">
      <h1>供应商创建与编辑页面</h1>
      <el-form :model="supplierRef" :rules="supplierEditrules">
        <el-form-item label="名称" prop="supplierName">
          <el-input
            v-model="supplierRef.supplierName"
            placeholder="请输入供应商名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人名称" prop="supplierContact">
          <el-input
            v-model="supplierRef.supplierContact"
            placeholder="请输入联系人名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人联系方式">
          <el-input
            v-model="supplierRef.supplierPhone"
            placeholder="请输入联系人联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="supplierType">
          <el-radio-group v-model="supplierRef.supplierType">
            <el-radio :label="0">综合</el-radio>
            <el-radio :label="1">零件</el-radio>
            <el-radio :label="2">备件</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="supplierStatus">
          <el-select
            v-model="supplierRef.supplierStatus"
            placeholder="请选择供应商状态"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="维护" value="2"></el-option>
            <el-option label="弃用" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="postSupplier()">提交</el-button>
    </div>
    <div class="supplier-detail-container">
      <h1>供应商详情</h1>
    </div>
  </div>
  <hr />
  {{ supplierRef }}
</template>

<script lang="ts">
import axios from "@/axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import { defineComponent, reactive } from "vue";
interface Supplier {
  id: number | null;
  supplierName: string;
  supplierContact?: string;
  supplierPhone?: string;
  supplierType: number;
  supplierStatus: number | null;
}
export default defineComponent({
  props: {
    sid: String,
  },
  setup(props) {
    let supplierRef = reactive<Supplier>({
      id: null,
      supplierName: "",
      supplierContact: "",
      supplierPhone: "",
      supplierType: 1,
      supplierStatus: null,
    });

    //新增供应商
    const postSupplier = (data: Supplier) => {
      let POST_SUPPLIER_URI = "/pms/supplier";
      data = data || supplierRef;
      axios.post(POST_SUPPLIER_URI, data).then(
        (resp) => {
          console.log(POST_SUPPLIER_URI, resp);
          ElMessage.success({
            message: "供应商信息操作成功！",
            type: "success",
          });
          router.push("/plan");
        },
        (error) => {
          console.log(error);
        }
      );
    };
    //获取供应商信息
    const getSupplier = (sid: string) => {
      let GET_SUPPLIER_URI = "/pms/supplier/";
      axios.get(GET_SUPPLIER_URI + sid).then(
        (resp) => {
          console.log(GET_SUPPLIER_URI + "RESPON", resp);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    return {
      supplierRef,
      postSupplier,
      getSupplier,
      supplierEditrules: {
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        supplierType: [{ required: true, trigger: "change" }],
        supplierStatus: [{ required: true, trigger: "change" }],
      },
    };
  },
});
</script>

<style>
.supplier-detail-edit-container {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 30%;
}
.supplier-detail-container {
  width: 70%;
  background-color: white;
  margin-left: 10px;
  padding: 10px;
  border-radius: 10px;
}
</style>
