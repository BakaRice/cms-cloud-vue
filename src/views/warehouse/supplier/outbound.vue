<template>
  <div v-if="selectWarehouseId != null">
    <div v-if="outputSchema == true">
      <el-alert
        title="扫码模式进行中"
        type="warning"
        description="请确保扫描出库商品类型和数量的正确性"
        show-icon
        style="text-align: start"
      ></el-alert>
      <h1 style="font-size: xxx-large">
        <span style="color: red">扫码枪出库进行中</span>
        <br />
        已录入【
        <span style="color: red">{{ outboundDetailList.length }}</span>
        】件 新增编码:【
        <span style="color: red">{{ preCode }}</span>
        】
      </h1>
    </div>
    <div class="inbound-container">
      <div class="inbound-output-container">
        <h1>出库输入</h1>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="singleInboundDetail.cargoCode"
            @keyup.enter="pushInboundList()"
          >
            <template #prepend>扫码零件编码</template>
          </el-input>
        </div>

        <div style="margin-top: 15px; margin-top: 15px; display: flex">
          <div style="padding: 0px 8px; width: 60%">
            <!-- 扫码模式确定 -->
            <el-switch
              style="display: block"
              v-model="outputSchema"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="手动输入"
              inactive-text="扫码模式"
              @change="schemaSure"
            ></el-switch>
            <el-switch
              style="display: block"
              v-model="strictMode"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="严格模式"
              inactive-text="普通模式"
              @change="strictModeSure"
            ></el-switch>
          </div>
        </div>

        <div v-if="outputSchema == false">
          <el-button type="success" @click="pushOutboundListByHand">
            手动输入
          </el-button>
        </div>
      </div>
      <div class="inbound-show-container">
        <!-- {{ outboundDetailList }} -->
        <!-- <div v-for="(inboundDetail, index) in outboundDetailList" :key="index">
          {{ inboundDetail }}
        </div> -->

        <el-table
          :data="outboundDetailList"
          stripe
          style="width: 100%"
          max-height="450"
        >
          <el-table-column prop="cargoCode" label="cargoCode" width="250">
            <template #default="scope">
              <div v-if="scope.row.cargoCode !== null">
                <barcode :cdata="scope.row.cargoCode"></barcode>
              </div>
              <div v-else>
                <p>null!</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="cargoSupplierId"
            label="cargoSupplierId"
            width="180"
          ></el-table-column>
          <el-table-column prop="cargoName" label="cargoName"></el-table-column>
          <el-table-column prop="cargoType" label="cargoType"></el-table-column>
        </el-table>
      </div>
    </div>
    <el-button type="warning" plain @click="postOutbound">生成出库</el-button>
  </div>
  <div v-else class="inbound-select-warehouse-container">
    <h1>选择仓库出库</h1>
    <div>
      <el-radio
        v-model="selectWarehouseId"
        :label="warehouse.id"
        border
        v-for="(warehouse, index) in warehouseList"
        :key="index"
        @change="selectWarehouse(warehouse)"
      >
        {{ warehouse.warehouseName }}
      </el-radio>
    </div>
  </div>
</template>

<script lang="ts">
import barcode from "@/views/make/barcode-js.vue";
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, ref } from "vue";
import { ElNotification } from "element-plus";
import axios from "@/axios/index";
import store from "@/store";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import router from "@/router";

interface WarehouseInboundDetail {
  cargoCode: string;
  cargoName: string;
  cargoSupplierId: number | null;
  cargoSupplierName: string;
  cargoType: number | null;
}
interface Warehouse {
  id?: number;
  warehouseName?: string;
  warehouseCode?: string;
  warehouseOwner?: number;
  warehouseOwnerName?: string;
  warehouseOwnerPhone?: string;
  warehouseAddress?: string;
  warehouseStatus?: number;
  warehouseType?: number;
}
interface OutboundRequest {
  warehouse: Warehouse;
  cargoCodeList: string[];
}
interface supplier {
  value?: string;
  id: 12;
  supplierName: string;
  supplierContact: string;
  supplierPhone: string;
  supplierType: number;
  supplierStatus: number;
}

export default defineComponent({
  components: {
    barcode,
  },
  setup() {
    //输入模式 手动或扫码
    let outputSchema = ref(false);
    //严格模式 是否需要输入两遍
    let strictMode = ref(false);
    /**
     * 输入默认确认
     */
    const schemaSure = () => {
      if (outputSchema.value == true) {
        ElNotification({
          title: "扫码模式开启",
          type: "warning",
          message: "扫码模式开启后，请确保扫描出库商品类型和数量的正确性",
        });
      }
    };
    /**
     * 严格模式确认
     */
    const strictModeSure = () => {
      if (strictMode.value == true) {
        ElNotification({
          title: "严格模式开启",
          type: "warning",
          message: "严格模式开启后，出库时需要进行双重确认才能出库",
        });
      }
    };

    /**
     * 被选中的仓库id
     */
    let selectWarehouseId = ref<number>();

    /**
     * 单个出库细节 用于输出库
     */
    let singleInboundDetail = ref<WarehouseInboundDetail>({
      cargoCode: "",
      cargoSupplierId: null,
      cargoName: "",
      cargoType: null,
      cargoSupplierName: "",
    });

    let outboundDetailList = ref<WarehouseInboundDetail[]>([]);
    let inboundSet = new Set();
    let preCode = ref("");
    //自动扫码状态 扫码
    const pushInboundList = () => {
      //非手动模型下不允许使用回车键入
      if (outputSchema.value == false) return;

      //判断输入零件编号是否在仓库内 已存在 不存在则不能加入
      let code = singleInboundDetail.value.cargoCode;
      const GET_CARGO_BY_CARGOCODE_URI = `/pms/warehouse/cargoCode?cargoCode=${code}`;
      axios.get(GET_CARGO_BY_CARGOCODE_URI).then((resp) => {
        console.log(resp);
        let data = resp.data.data;
        if (data == null) {
          let msg = `【${code}】该货物编码在库存中无法查询到,请核对编码输入内容，或联系上级管理员`;
          ElNotification({
            title: "库存查询失败",
            type: "error",
            message: msg,
          });
        }
        console.log(data);
        commonPushDetail(data);
        console.log(outboundDetailList.value);
        singleInboundDetail.value.cargoCode = "";
      });
    };

    const pushOutboundListByHand = () => {
      //判断输入零件编号是否在仓库内 已存在 不存在则不能加入
      let code = singleInboundDetail.value.cargoCode;
      const GET_CARGO_BY_CARGOCODE_URI = `/pms/warehouse/cargoCode?cargoCode=${code}`;
      axios.get(GET_CARGO_BY_CARGOCODE_URI).then((resp) => {
        console.log(resp);
        let data = resp.data.data;
        if (data == null) {
          let msg = `【${code}】该货物编码在库存中无法查询到,请核对编码输入内容，或联系上级管理员`;
          ElNotification({
            title: "库存查询失败",
            type: "error",
            message: msg,
          });
        }
        console.log(data);
        commonPushDetail(data);
        console.log(outboundDetailList.value);
        singleInboundDetail.value.cargoCode = "";
      });
    };

    const beforeSchemaSure = () => {
      // status2.loading2 = true
      console.log("beforeSchemaSure");

      if (
        singleInboundDetail.value.cargoName == "" &&
        singleInboundDetail.value.cargoSupplierId == null
      ) {
        return false;
      } else {
        console.log("success");
      }
    };
    const commonPushDetail = (data: WarehouseInboundDetail) => {
      if (!inboundSet.has(data.cargoCode)) {
        console.log(inboundSet);
        data.cargoSupplierName;
        outboundDetailList.value.unshift({ ...data });
        inboundSet.add(data.cargoCode);
        preCode.value = data.cargoCode;
      } else {
        let msg = `【${data.cargoCode}】该码已被录入,`;
        ElNotification({
          title: "重复扫码",
          type: "error",
          message: msg,
        });
      }
    };
    let requestBody = ref<OutboundRequest>();
    let postOutbound = () => {
      let odl: string[] = outboundDetailList.value.map((e) => e.cargoCode);
      let data: OutboundRequest = {
        warehouse: { id: selectWarehouseId.value },
        cargoCodeList: odl,
      };
      console.log(data);

      const POST_OUTBOUND_URI = "/pms/warehouse/outbound";
      if (
        data == undefined ||
        data.warehouse.id == null ||
        data.cargoCodeList.length <= 0
      ) {
        store.commit(UPDATE_EXCEPTION, "出库单数据不完整无法进行出库操作");
        return;
      }
      console.log(data);

      axios.post(POST_OUTBOUND_URI, data).then((resp) => {
        console.log(resp);
        ElNotification({
          title: "出库单创建成功",
          type: "success",
          message: "出库单创建已经成功，请尽快将货物出库",
        });
        router.push("/stream");
      });
    };

    /**
     * 仓库列表获取与选择
     */
    let warehouseList = ref<Warehouse[]>([]);
    let GET_WAREHOSE_LIST = "/pms/warehouse";
    axios.get(GET_WAREHOSE_LIST).then((resp) => {
      console.log(resp);
      let data = resp.data.data;
      warehouseList.value = data;
    });
    const selectWarehouse = (data: Warehouse) => {
      let msg = `成功选择仓库${data.warehouseName},\n当前仓库编号为${data.warehouseCode},管理员为${data.warehouseOwnerName},\n仓库地址为${data.warehouseAddress}`;
      ElNotification({
        title: "选择仓库" + data.warehouseName,
        type: "success",
        message: msg,
      });
    };

    const cargoTypeList = ref<any[]>([]);
    const querySearch = (queryString: string, cb: any) => {
      let results = queryString
        ? cargoTypeList.value.filter(createFilter(queryString))
        : cargoTypeList.value;
      // let results = supplierList.value;
      // 调用 callback 返回建议列表的数据
      console.log("results", results);

      cb(results);
    };
    const createFilter = (queryString: any) => {
      return (supplier: supplier) => {
        return (
          supplier.supplierName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    };
    const loadAllType = () => {
      const GET_ALL_CARGO_TYPE_URI = "/pms/warehouse/all-type";
      let result: supplier[] = [];
      axios.get(GET_ALL_CARGO_TYPE_URI).then(
        (resp) => {
          console.log(resp);
          result = resp.data.data;
          for (let e in result) {
            cargoTypeList.value.push({ value: result[e] });
          }
          console.log(cargoTypeList.value);
          return result;
        },
        (error) => {
          console.log(error);
          return null;
        }
      );
    };
    const supplierList = ref<supplier[]>([]);
    const loadAllSupplier = () => {
      axios.get("/pms/supplier/all").then((resp) => {
        console.log(resp);
        supplierList.value = resp.data.data;
      });
    };
    const handleSelect = (item: any) => {
      console.log(item);
    };
    onMounted(() => {
      loadAllSupplier();
      loadAllType();
    });
    return {
      outputSchema,
      beforeSchemaSure,
      schemaSure,
      strictMode,
      strictModeSure,
      selectWarehouseId,
      warehouseList,
      selectWarehouse, //选择仓库
      singleInboundDetail, //单个出库单细节
      pushInboundList, //添加到列表
      outboundDetailList,
      preCode,
      querySearch,
      handleSelect,
      supplierList,
      postOutbound,
      pushOutboundListByHand,
    };
  },
});
</script>

<style>
.inbound-container {
  display: flex;
}
.inbound-output-container {
  width: 30%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.inbound-show-container {
  width: 70%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
}
.inbound-select-warehouse-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
}
</style>
