<template><div></div></template>
<script lang="ts">
import { State } from "@/store";
import { UPDATE_EXCEPTION, UPDATE_LOADING } from "@/store/VuexTypes";
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const exception = computed(() => store.state.exception);
    const loading = computed(() => store.state.loading);
    const close = () => store.commit(UPDATE_EXCEPTION, "");
    const loading_close = () => store.commit(UPDATE_LOADING, "");
    const msg = ElMessage({
      showClose: true,
      message: exception.value,
      type: "error",
      onClose: () => {
        store.commit(UPDATE_EXCEPTION, "");
      },
    });
    return {
      msg,
      exception,
      close,
      loading,
      loading_close,
    };
  },
});
</script>
