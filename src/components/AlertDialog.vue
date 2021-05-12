<template><div></div></template>
<script lang="ts">
import { State } from "@/store";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const exception = computed(() => store.state.exception);
    const close = () => store.commit(UPDATE_EXCEPTION, "");
    const msg = ElMessage({
      showClose: true,
      message: exception.value,
      type: "error",
      onClose:()=>{
        store.commit(UPDATE_EXCEPTION, "");
      }
    });
    return {
      msg,
      exception,
      close,
    };
  },
});
</script>