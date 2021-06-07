<template>
  <!-- 条形码容器，可选svg、canvas，或img标签 -->
  <!-- <svg id="barcode" style="width: 100px"></svg> -->
  <img :id="'barcode' + cdata" style="width: 200px" />
</template>

<script lang="ts">
import jsbarcode from "jsbarcode";
import { defineComponent } from "vue";
export default defineComponent({
  name: "barcode",
  props: {
    cdata: String,
  },
  mounted() {
    let data: string = this.$props.cdata!;
    // 生成条形码
    jsbarcode("#barcode" + data, data, {
      displayValue: true, // 是否在条形码下方显示文字
      // height: 100,
      // width: 6,
    });
  },
  setup(props) {
    console.log(props.cdata);
    console.log(props);
    // console.log(data);
    // jsbarcode("#barcode", "9787544291170", {
    //   displayValue: true, // 是否在条形码下方显示文字
    // });
    return {};
  },
});
</script>

<style></style>
