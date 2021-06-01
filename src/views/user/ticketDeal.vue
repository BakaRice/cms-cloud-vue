<template>
  <div class="ticket-deal-container">
    <h2>工单处理列表</h2>
    <div class="ticket-deal-desc-container">
      <p>当前未处理/总数:10/100</p>
      <div style="margin-bottom: 15px">
        <el-input
          placeholder="请输入查询内容"
          v-model="input3"
          class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="请选择">
              <el-option label="待处理" value="1"></el-option>
              <el-option label="已通过" value="2"></el-option>
              <el-option label="已驳回" value="3"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
    </div>
    <div class="ticket-deal-list-container">
      <el-card
        shadow="hover"
        class="ticket-box-card"
        v-for="(ticket, index) in ticketList"
        :key="index"
      >
        <template #header>
          <div class="ticket-card-header">
            <span>{{ ticket.userName }}{{ ticket.typeName }}申请</span>
            <div v-if="ticket.approve == null">
              <el-button type="text">通过</el-button>
              <el-button type="text">驳回</el-button>
            </div>
            <div v-else-if="ticket.approve == true">
              <span style="color: green">已通过</span>
            </div>
            <div v-else-if="ticket.approve == false">
              <span style="color: red">已驳回</span>
            </div>
          </div>
        </template>
        <div style="text-align: start">
          <p>请假时间:{{ ticket.startTime }}至{{ ticket.endTime }}</p>
          <p>请假原因:{{ ticket.reason }}</p>
          <p>请假人:{{ ticket.userName }}</p>
          <p v-if="ticket.approve == true && ticket.approvalOpinion != null">
            审批意见:{{ ticket.approvalOpinion }}
          </p>
          <p v-else-if="ticket.approve == false">
            驳回意见:{{ ticket.approvalOpinion }}
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
interface ticket {
  type: number;
  typeName: string;
  userName: string;
  userId: string;
  startTime: string;
  endTime: string;
  reason: string | null;
  approveUserName?: string | null;
  approve: boolean | null;
  approveUserId?: string | null;
  approvalOpinion?: string | null;
}
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let ticketList = ref<ticket[]>([
      {
        type: 0,
        typeName: "事假",
        userName: "un",
        userId: "2131",
        startTime: "st",
        endTime: "et",
        reason: "rs",
        approve: null,
      },
      {
        type: 0,
        typeName: "事假",
        userName: "un",
        userId: "2131",
        startTime: "st",
        endTime: "et",
        reason: "rs",
        approve: true,
      },
      {
        type: 1,
        typeName: "病假",
        userName: "un",
        userId: "2131",
        startTime: "st",
        endTime: "et",
        reason: "rs",
        approveUserName: "string | null",
        approve: false,
        approveUserId: "string | null",
        approvalOpinion: "string | null",
      },
    ]);
    return { ticketList, input3: ref(""), select: ref("") };
  },
});
</script>

<style>
.ticket-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ticket-deal-list-container > * {
  margin-bottom: 8px;
}

.ticket-text {
  font-size: 14px;
}

.ticket-item {
  margin-bottom: 18px;
}

.ticket-box-card {
  width: 100%;
}
</style>
