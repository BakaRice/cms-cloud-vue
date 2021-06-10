<template>
  <h1>入库单详情</h1>
  <div class="inbound-container">
    <div class="inbound-show-container" style="width: 100%">
      <el-table
        :data="inboundDetailList"
        stripe
        style="width: 100%"
        max-height="450"
      >
        <el-table-column prop="cargoCode" label="cargoCode" width="250">
          <template #default="scope">
            <!-- {{ scope.row.cargoCode }} -->
            <div
              v-if="
                inboundDetailList.length > 0 && scope.row.cargoCode !== null
              "
            >
              <div class="images" v-viewer="{ movable: false }">
                <barcode
                  :cdata="scope.row.cargoCode"
                  :key="scope.row.cargoCode"
                ></barcode>
              </div>
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
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";

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
interface InboundRequest {
  warehouse: Warehouse;
  warehouseInboundDetailList: WarehouseInboundDetail[];
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
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  methods: {
    show() {
      const viewer = this.$el.querySelector(".images").$viewer;
      viewer.show();
    },
  },
  components: {
    barcode,
  },
  props: {
    inboundId: String,
  },
  setup(prop) {
    let tp = prop.inboundId!;
    console.log("tp", tp);

    let inboundId: string = tp;
    //输入模式 手动或扫码
    let inputSchema = ref(false);
    //严格模式 是否需要输入两遍
    let strictMode = ref(false);
    /**
     * 输入默认确认
     */
    const schemaSure = () => {
      if (inputSchema.value == true) {
        ElNotification({
          title: "扫码模式开启",
          type: "warning",
          message: "扫码模式开启后，请确保扫描入库商品类型和数量的正确性",
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
          message: "严格模式开启后，入库时需要进行双重确认才能入库",
        });
      }
    };

    /**
     * 被选中的仓库id
     */
    let selectWarehouseId = ref<number>();

    /**
     * 单个入库细节 用于输入库
     */
    let singleInboundDetail = ref<WarehouseInboundDetail>({
      cargoCode: "",
      cargoSupplierId: null,
      cargoName: "",
      cargoType: null,
      cargoSupplierName: "",
    });

    let inboundDetailList = ref<WarehouseInboundDetail[]>([]);
    let inboundSet = new Set();
    let preCode = ref("");
    //自动扫码状态 扫码
    const pushInboundList = () => {
      //非手动模型下不允许使用回车键入
      if (inputSchema.value == false) return;
      let data = singleInboundDetail.value;
      console.log(data);
      commonPushDetail(data);
      console.log(inboundDetailList.value);
      singleInboundDetail.value.cargoCode = "";
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
        inboundDetailList.value.unshift({ ...data });
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
    let requestBody = ref<InboundRequest>();
    let postInbound = () => {
      let data: InboundRequest = {
        warehouse: { id: selectWarehouseId.value },
        warehouseInboundDetailList: inboundDetailList.value,
      };
      const POST_INBOUND_URI = "/pms/warehouse/inbound";
      if (
        data == undefined ||
        data.warehouse.id == null ||
        data.warehouseInboundDetailList.length <= 0
      ) {
        store.commit(UPDATE_EXCEPTION, "入库单数据不完整无法进行入库操作");
        return;
      }
      console.log(data);

      axios.post(POST_INBOUND_URI, data).then((resp) => {
        console.log(resp);
        ElNotification({
          title: "入库单创建成功",
          type: "success",
          message: "入库单创建已经成功，请尽快将货物入库",
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
    // const loadAllType = () => {
    //   const GET_ALL_CARGO_TYPE_URI = "/pms/warehouse/all-type";
    //   let result: supplier[] = [];
    //   axios.get(GET_ALL_CARGO_TYPE_URI).then(
    //     (resp) => {
    //       console.log(resp);
    //       result = resp.data.data;
    //       for (let e in result) {
    //         cargoTypeList.value.push({ value: result[e] });
    //       }
    //       console.log(cargoTypeList.value);
    //       return result;
    //     },
    //     (error) => {
    //       console.log(error);
    //       return null;
    //     }
    //   );
    // };
    const supplierList = ref<supplier[]>([]);
    // const loadAllSupplier = () => {
    //   axios.get("/pms/supplier/all").then((resp) => {
    //     console.log(resp);
    //     supplierList.value = resp.data.data;
    //   });
    // };
    const handleSelect = (item: any) => {
      console.log(item);
    };
    onMounted(() => {
      //   loadAllSupplier();
      //   loadAllType();
    });

    // const getDetail = () => {
    axios
      .get(`/pms/warehouse/inbound-detail?inboundId=${inboundId}`)
      .then((resp) => {
        console.log(resp);
        inboundDetailList.value = resp.data.data.warehouseInboundDetailList;
      });
    // };
    return {
      inputSchema,
      beforeSchemaSure,
      schemaSure,
      strictMode,
      strictModeSure,
      selectWarehouseId,
      warehouseList,
      selectWarehouse, //选择仓库
      singleInboundDetail, //单个入库单细节
      pushInboundList, //添加到列表
      inboundDetailList,
      preCode,
      querySearch,
      handleSelect,
      supplierList,
      postInbound,
    };
  },
});
</script>

<style>
.inbound-container {
  display: flex;
}
.inbound-input-container {
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
  height: 600px;
}
</style>
