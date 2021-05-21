<template>
  <div style="text-align: start">
    <h2 style="margin-top: 0px; margin-bottom: 4px">
      员工详情:{{ userDetailForm.name }}
    </h2>
  </div>
  <div>
    <div class="order_detail">
      <el-form :rules="rules" :model="userDetailForm">
        <div class="modal_head">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" style="display: flex">
              <el-input
                :disabled="true"
                v-model="userDetailForm.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender" style="display: flex">
              <el-radio
                v-model="userDetailForm.gender"
                label="1"
                :disabled="true"
              >
                男
              </el-radio>
              <el-radio
                v-model="userDetailForm.gender"
                label="0"
                :disabled="true"
              >
                女
              </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone" style="display: flex">
                <el-input
                  :disabled="true"
                  v-model="userDetailForm.phone"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="身份证号码"
              prop="idcardNumber"
              style="display: flex"
            >
              <el-input
                :disabled="true"
                v-model="userDetailForm.idcardNumber"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="入职时间"
              prop="createTime"
              style="display: flex"
            >
              <!-- <el-input v-model="userDetailForm.createTime"></el-input> -->
              <el-date-picker
                :disabled="true"
                v-model="userDetailForm.createTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位工种" style="display: flex">
              <el-select
                :disabled="true"
                v-model="userDetailForm.professionId"
                placeholder="岗位工种"
              >
                <el-option label="电焊工" value="5">电焊工</el-option>
                <el-option label="管理岗" value="6">管理岗</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="modal_head">账号信息</div>
        <div class="el-row el-row--flex">
          <div class="el-col el-col-8">
            <p>el-col el-col-8</p>
          </div>
          <div class="el-col el-col-12">
            <p>el-col el-col-12</p>
          </div>
        </div>
        <div class="el-row">
          <div class="el-col el-col-20">
            <p>el-col el-col-20</p>
          </div>
        </div>
      </el-form>
      <div>
        <el-button type="primary" @click="cancel">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "@/axios/index";
import router from "@/router";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    uid: String,
  },

  setup(props) {
    const userId = ref(props.uid);
    const rules = {
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { min: 3, max: 5, message: "长度为11位", trigger: "blur" },
      ],
    };
    let userDetailForm = ref({
      gender: "1",
      accountState: 0,
      accountStateDesc: "已启用",
      address: "adressfdads",
      age: 0,
      birthday: "2021-04-12T16:00:00.000+00:00",
      cellId: 0,
      companyId: 0,
      createBy: 0,
      createTime: "2021-04-13T15:33:49",
      id: 1381598883902234600,
      idString: "1381598883902234625",
      idcardNumber: "4203030199909102813",
      institutionId: 0,
      isDelete: 0,
      mark: "string",
      name: "update ",
      phone: "13251612725",
      professionId: "6",
      roleId: 6,
      salary: 19999,
      updateBy: 1381599295699001300,
      updateTime: "2021-04-13T23:37:06",
      professionString: "",
    });
    axios.get("/pms/leader/user/" + userId.value).then(
      (resp) => {
        let userData = resp.data.data;
        userDetailForm.value = userData;
        professionToString(userData);
        genderFake();
      },
      (error) => {
        console.log(error);
      }
    );

    const cancel = () => {
      router.push("/userInfo");
    };

    const professionToString = (userData: any) => {
      const id = userData.professionId;
      switch (id) {
        case 1: {
          userDetailForm.value.professionId = "系统管理";
          break;
        }
        case 2: {
          userDetailForm.value.professionId = "车工";
          break;
        }
        case 3: {
          userDetailForm.value.professionId = "电工";
          break;
        }
        case 4: {
          userDetailForm.value.professionId = "电焊工";
          break;
        }
        case 5: {
          userDetailForm.value.professionId = "管理岗";
          break;
        }
        case 6: {
          userDetailForm.value.professionId = "文书";
          break;
        }
        case 7: {
          userDetailForm.value.professionId = "书记";
          break;
        }
      }
    };
    const genderFake = () => {
      userDetailForm.value.gender = "1";
    };

    console.log(userId);
    return {
      userId,
      userDetailForm,
      rules,
      cancel,
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
