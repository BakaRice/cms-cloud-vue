<template>
  <div style="text-align: start">
    <h2 style="margin-top: 0px; margin-bottom: 4px">新增员工</h2>
  </div>
  <div>
    <div class="order_detail">
      <el-form :rules="rules" :model="userDetailForm">
        <div class="modal_head">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" style="display: flex">
              <el-input v-model="userDetailForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender" style="display: flex">
              <el-radio v-model="userDetailForm.gender" label="1">男</el-radio>
              <el-radio v-model="userDetailForm.gender" label="0">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone" style="display: flex">
                <el-input v-model="userDetailForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="身份证号"
              prop="idcardNumber"
              style="display: flex"
            >
              <el-input v-model="userDetailForm.idcardNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位工种" style="display: flex">
              <el-select
                v-model="userDetailForm.professionId"
                placeholder="岗位工种"
              >
                <el-option label="系统管理" :value="1">系统管理</el-option>
                系统管理
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="birthday" style="display: flex">
              <!-- <el-input v-model="userDetailForm.createTime"></el-input> -->
              <el-date-picker
                v-model="userDetailForm.birthday"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="modal_head">账号信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="薪资" prop="salary" style="display: flex">
              <el-input v-model="userDetailForm.salary"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="mark" style="display: flex">
              <el-input v-model="userDetailForm.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="用户角色" style="display: flex">
              <el-select v-model="userDetailForm.roleId" placeholder="角色">
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属机构" style="display: flex">
              <el-select
                v-model="userDetailForm.institutionId"
                placeholder="所属机构"
              >
                <el-option
                  v-for="(item, index) in instList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age" style="display: flex">
              <el-input v-model="userDetailForm.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属班组" style="display: flex">
              <el-select v-model="userDetailForm.cellId" placeholder="所属班组">
                <el-option
                  v-for="(item, index) in cellList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form>
        住址
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="userDetailForm.address"
        ></el-input>
      </el-form>
      <div>
        <el-button type="primary" @click="pt">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "@/axios/index";
import router from "@/router";
import { defineComponent, ref } from "vue";
interface AddUser {
  accountState: number;
  address: string;
  age?: number | null;
  birthday: string;
  cellId?: number | null;
  institutionId: number | null;
  idcardNumber: string;
  mark: string;
  name: string;
  phone: string;
  professionId: number | null;
  roleId: number | null;
  salary?: number | null;
}
export default defineComponent({
  setup() {
    const rules = {
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      salary: [{ required: true, message: "请输入新增", trigger: "blur" }],
      idcardNumber: [
        {
          required: true,
          min: 16,
          max: 18,
          message: "长度在 16 到 18 个字符",
          trigger: "change",
        },
      ],
    };
    const addUser: AddUser = {
      name: "",
      accountState: 1,
      address: "",
      age: null,
      birthday: "",
      cellId: null,
      institutionId: null,
      idcardNumber: "",
      mark: "",
      phone: "",
      professionId: null,
      roleId: null,
      salary: null,
    };
    let userDetailForm = ref<AddUser>(addUser);
    let cellList = ref([]);
    let instList = ref([]);
    let roleList = ref([]);
    axios.get("pms/leader/cellAndInstitution").then(
      (resp) => {
        console.log(resp);
        cellList.value = resp.data.data.cellsList;
        instList.value = resp.data.data.institutionList;
        roleList.value = resp.data.data.roleList;
        console.log(instList.value);
      },
      (error) => {
        console.log(error);
      }
    );

    let req = {
      userCommonRequest: userDetailForm.value,
    };
    const pt = () =>
      axios.post("pms/leader/user", req).then(
        (resp) => console.log(resp),
        (error) => console.log(error)
      );

    return {
      userDetailForm,
      rules,
      cellList,
      instList,
      roleList,
      pt,
    };
  },
});
</script>
<style>
.order_detail {
  background-color: white;
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-form-item__label {
  width: 85px;
  text-align: start;
}

.modal_head {
  font-weight: 700;
  color: #17233d;
  font-size: 14px;
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 0 0 15px;
  padding-left: 15px;
}
</style>
