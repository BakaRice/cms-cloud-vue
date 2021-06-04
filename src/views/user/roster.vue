<template>
  <div style="text-align: start">
    <h2>排班管理</h2>

    <div class="container">
      <div class="container-contant">
        <div class="container-contanl-left">
          <div class="container-contanl-left1">
            <h1 style="margin-bottom: 0px; margin-top: 0px">
              今日排班数据统计
            </h1>
            <ul>
              <li>
                <h2>{{ rosterOverview.userCount }}</h2>

                <h3>当前在岗员工</h3>
              </li>
              <li>
                <h2>{{ rosterOverview.unDealUserCount }}</h2>
                <h3>当前未排工员工</h3>
              </li>
              <li>
                <h2>{{ rosterOverview.dayUserCount }}</h2>
                <h3>当前白班员工</h3>
              </li>
              <li>
                <h2>{{ rosterOverview.nightUserCount }}</h2>
                <h3>当前夜班员工</h3>
              </li>
            </ul>
          </div>
          <div
            class="container-contanl-left1"
            style="margin-top: 24px"
            @click="ticketDealClick"
          >
            <h1>员工申请处理</h1>
            <ul>
              <li>
                <h2>10</h2>
                <h3>当前请假申请数量</h3>
              </li>
              <li>
                <h2>1</h2>
                <h3>当前出差申请数量</h3>
              </li>
            </ul>
          </div>
        </div>
        <div class="container-contanl-right">
          <h1>操作</h1>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
            />
            <span>查看排班</span>
          </div>
          <br />
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAgVBMVEUAAAAMhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQNe/INfPIMfPMLffEMevMMfPELfPIMevIMe/IMevIMevELe/ELe/IMevIMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevEke5Y1AAAAKnRSTlMAFRkdHiInKCwtMjg+P0BFRk1QVFx/gIjA0tXb4OTo6ezv8PP19vj6/P3sgrmtAAAAvklEQVQ4y9XU2w6CMAwG4IriARTPEwUERVH/939Ab1xkUm0vMMbebfmSrt06ou+HtzavEXGul6ARhnF+ChUcZEC1cfLGHBzlwGnq7hkGBgVQjkmE4RE4hCTCSQkUAYlwdgb2QxLhvAKyPolweQFSn0S4ugJJl0S4uAE7j2RogG2HdPCxsBcnQvsO2oPq1OpifgjrQ6Bqz7NFahjV5/pTanHS2O3/hPbbid36m9D9ztqA6tTvi4mZy2Mhd6Y6vAOYUj/Fco276wAAAABJRU5ErkJggg=="
            />
            <span>新建请假单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAgVBMVEUAAAAMhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQNe/INfPIMfPMLffEMevMMfPELfPIMevIMe/IMevIMevELe/ELe/IMevIMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevEke5Y1AAAAKnRSTlMAFRkdHiInKCwtMjg+P0BFRk1QVFx/gIjA0tXb4OTo6ezv8PP19vj6/P3sgrmtAAAAsElEQVQ4y+XUyw6CMBAF0BHFByi+xyqgKIp6//8DXZFQHDuNcaPeVdOepG3aGaJ2gjW3k5CQXoqnsODCDF5wkAPVxtrXSHB0AM5Te44FGBVAOSYVxifgGJMKJyVQRKTC2QXYD0mF8wrI+6TC5RXIQlLh6gakXVLh4g7sAnnZggxsO+QHmb4G1qN/h0mzrl1QrTTlHX4S1v3JMDO7/qPd9z4Bvbd+fRnT7LIuKJ3pLfgAdJhE0XEDikEAAAAASUVORK5CYII="
            />
            <span>新建出差单</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
            />
            <span>查看今日排班</span>
          </div>
          <div class="container-contanl-right-link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAt1BMVEUAAAD///8kkv8gf/8cjv8MhvMUevUSe/YRf/YPf/cNfPINgPIMgPMLffQPevUOe/EMe/MMffMMfPMLfvQPfPQOfPQNfPINe/INfPIMfPMMe/MMffMLffEMfPMMe/ELfPIMevMMfPELfPIMevIMe/ILe/ILe/IMevEMevIMe/IMevIMevELe/ELe/ELe/IMevIMe/IMe/IMevIMe/EMevEMe/ELe/ELevILevILevILevILe/ILevG/7fm1AAAAPHRSTlMAAQcICRUZHR4iJygsLTI4Pj9ARUZITE1QVFVWXG1uc3+AiJiZnZ+8wNLV297g5Ojp6+zv8PP19vj6/P3JXrxxAAABFklEQVQ4y83U21LCMBCA4W2pKB5AUarWQ420pUqhFkVR//d/Li+kMxRCknG4cK+SnS+zTTq7IuvRflDr0RdNHIzZCKVxnQlO8GgKi8dG3VwHT17g/byZUxrYncH8VKyw9wavPbHCsznMumKFFx9QHosVXi5geihWeP0Jk45Y4e0XjPfFCq++4bm93ARhHIeBHip42luuowqgirbBejOsf/DQDCOgSJICiEwwqCDzRVoZVIEBhlD4IiKtAkIDjCH5TSUQu8I719IDh8v4GZS+4/OMPLcHh9QzQbmpAMoRkIqI9Ff7unEqCOP7ge+luu7TdZqXqs200k+Dfw7rsZMrpZQywOY42wV0Lr39Mvnq8NwJ1H38n+APHWVuBQbe4FwAAAAASUVORK5CYII="
            />
            <span>查看七日排班</span>
          </div>
        </div>
      </div>
    </div>

    <div class="roster-edit-container">
      <div class="roster-edit-container-list">
        <div style="display: inline-flex">
          <h3>今日所属员工排班情况</h3>
        </div>
        <el-table
          row-key="date"
          ref="filterTable"
          :data="todayRoster"
          style="width: 100%"
        >
          <el-table-column
            prop="uid"
            :width="160"
            label="用户编号"
          ></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column
            prop="typeName"
            label="排班类型"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <div v-if="scope.row.typeName !== null">
                <el-tag
                  :type="scope.row.typeName === null ? 'primary' : 'success'"
                  disable-transitions
                >
                  {{ scope.row.typeName }}
                </el-tag>
              </div>
              <div v-else>
                <el-tag type="warning" disable-transitions>未排班</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            sortable
            column-key="startTime"
          ></el-table-column>

          <el-table-column
            prop="endTime"
            label="结束时间"
            sortable
            column-key="endTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                @click.enter.prevent="
                  selectDetailRow(scope.$index, todayRoster)
                "
                type="text"
                size="small"
              >
                选中
              </el-button>
              <el-button
                @click.enter.prevent="getDetailRow(scope.$index, todayRoster)"
                type="text"
                size="small"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-row is-justify-end el-row--flex">
          <el-pagination
            background
            layout="total,prev, pager, next"
            :page-count="totalPage"
            :page-size="10"
            :current-page="currPage"
            @current-change="getPageInfo"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div class="roster-edit-container-selected-list">
        <h3>用户排班操作</h3>
        <div class="roster-edit-container-selected-button">
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="排班开始日期"
            end-placeholder="排班结束日期"
            style="width: 90%"
          ></el-date-picker>
          <el-popover
            type="primary"
            plain
            placement="top"
            :width="160"
            v-model:visible="visible"
          >
            <p>请确认人员排班时间没有发生冲突，若发生冲突，则无法进行排班</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">
                取消
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="
                  visible = false;
                  postS();
                "
              >
                确定
              </el-button>
            </div>
            <template #reference>
              <el-button @click="visible = true">添加</el-button>
            </template>
          </el-popover>
        </div>
        <div
          class="roster-edit-container-selected-button"
          style="align-items: center; margin-top: 10px"
        >
          <b>排班类型：</b>
          <el-select v-model="stvalue" placeholder="请选择排班类型">
            <el-option
              v-for="item in schedulingTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <el-table :data="selectUser" stripe>
          <el-table-column prop="uid" label="uid"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="name" label="操作">
            <template #default="scope">
              <el-button
                @click.enter.prevent="removeDetailRow(scope.$index, selectUser)"
                type="text"
                style="color: crimson"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <p>
    对所有员工进行排班，支持批量排班和对单个用户的独立排班，按照日期对员工进行排班，排班类型分为多种，包括有“白班”，“前夜班”，“后夜班”等，
    能够对排班类型进行编辑，如编辑白班的上班时间和下班时间。
  </p>
  <ul>
    <li>
      【fx/bo】选中start-end区间时间 批量选人 修改时间
      http://localhost:8760/api/pms/leader/schedules
    </li>
    <li>【fo/bo】显示今天所有人的排班类型 /pms/leader/roster pageinfo</li>
    <li>【fx/bx】显示指定天所有人的排班类型</li>
  </ul>
</template>

<script lang="ts">
interface roster {
  uid: string;
  name: string;
  startTime: string;
  endTime: string;
  type: number;
  typeName: string;
}
import axios from "@/axios/index";
import router from "@/router";
import store from "@/store";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    //读取页面数据 总数，总页数，当前页

    const total = ref(0); //总数
    let totalPage = ref(0); //总页数
    const currPage = ref(1); //当前
    let timeRange = ref();
    //今日排班情况，array
    let todayRoster = ref([
      {
        uid: "",
        name: "",
        startTime: "",
        endTime: "",
        type: 0,
        typeName: 0,
      },
    ]);
    //区间排班情况 ,array
    let rangeRoster = ref([
      {
        uid: "",
        name: "",
        startTime: "",
        endTime: "",
        type: 0,
      },
    ]);

    //请求内容 默认分页从第一页开始 每页10项内容
    let req = { pageNum: 1, pageSize: 10 };
    //获取当日排班列表
    axios
      .get(
        "/pms/leader/roster?pageNum=" +
          req.pageNum +
          "&pageSize=" +
          req.pageSize
      )
      .then(
        (resp) => {
          console.log("获取当天排班情况");
          todayRoster.value = resp.data.data.list;
          total.value = resp.data.data.total;
          currPage.value = resp.data.data.pageNum;
          totalPage.value = resp.data.data.pages;
          setFilter();
        },
        (error) => {
          console.log(error);
        }
      );
    let rosterOverview = ref({
      dayUserCount: 4,
      nightUserCount: 0,
      unDealUserCount: 7,
      userCount: 11,
    });
    //获取排班概况数据
    axios.get("/pms/leader/roster-overview").then(
      (resp) => {
        console.log(resp);
        rosterOverview.value = resp.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    //工单处理
    const ticketDealClick = () => {
      router.push("/ticket-deal");
    };

    //获取页面内容
    const getPageInfo = (cp: any) => {
      console.log("通用分页模板:改变页数:", cp, req, currPage.value);
      // if (cp == undefined) {
      //   cp = 1;
      // }
      req.pageNum = cp;
      currPage.value = cp;

      //进行内容查询
      axios
        .get(
          "/pms/leader/roster?pageNum=" +
            req.pageNum +
            "&pageSize=" +
            req.pageSize
        )
        .then((resp) => {
          todayRoster.value = resp.data.data.list;
          total.value = resp.data.data.total;
          currPage.value = resp.data.data.pageNum;
          totalPage.value = resp.data.data.pages;
          setFilter();
        });
    };

    let stvalue = ref();
    let selectUser = ref<roster[]>([]);
    //批量更新排班信息
    let postS = () => {
      if (timeRange.value == undefined || stvalue.value == null) {
        store.commit(UPDATE_EXCEPTION, "时间选中或类型选中不能为空");
        return;
      }
      if (selectUser.value.length == 0) {
        store.commit(UPDATE_EXCEPTION, "人员列表选中不能为空");
        return;
      }
      let data = {
        endTime: timeRange.value[1],
        schedulingTypeId: stvalue.value,
        startTime: timeRange.value[0],
        userCommonRequestList: selectUser.value.map((e) => ({ id: e.uid })),
      };
      console.log(data);

      axios.post("/pms/leader/schedules", data).then(
        (resp) => {
          console.log(resp);
          router.push("roster");
          ElMessage.success({
            message: "成功添加用户排班信息",
            type: "success",
          });
          timeRange.value = null;
          selectUser.value = [];
          stvalue.value = null;
          //更新完排班数据后 查询数据更新
          axios
            .get(
              `/pms/leader/roster?pageNum=${req.pageNum}&pageSize=${req.pageSize}`
            )
            .then(
              (resp) => {
                console.log("获取当天排班情况");
                todayRoster.value = resp.data.data.list;
                total.value = resp.data.data.total;
                currPage.value = resp.data.data.pageNum;
                totalPage.value = resp.data.data.pages;
                setFilter();
              },
              (error) => {
                console.log(error);
              }
            );
          axios.get("/pms/leader/roster-overview").then(
            (resp) => {
              console.log(resp);
              rosterOverview.value = resp.data.data;
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    };
    const selectDetailRow = (index: number, rows: Array<any>) => {
      console.log(index, rows);
      const item = rows[index];
      let v = selectUser.value;
      if (v.filter((u) => u.uid == item.uid).length == 0) {
        console.log("item", item);
        selectUser.value.push(item);
      } else {
        console.log("已存在");
        store.commit(UPDATE_EXCEPTION, `${item.name}已添加，不能重复添加！`);
        console.log(timeRange);
      }
    };
    const getDetailRow = (index: number, rows: Array<any>) => {
      console.log("查看排班详情", index, rows);
      const item = rows[index];
      router.push(`/roster-detail/${item.uid}`);
    };
    const removeDetailRow = (index: number, rows: Array<any>) => {
      console.log("移除人", index, rows);
      const item = rows[index];
      let v = selectUser.value;
      selectUser.value = v.filter((u) => u.uid != item.uid);
    };

    //表格数据 临时填充
    let tableData = [
      {
        uid: "11527856549889",
        name: "普通用户19updaa",
        startTime: "2021-04-01",
        endTime: "2021-08-12",
        type: 1,
        typeName: "夏令时白班",
      },
      {
        uid: "98606641963009",
        name: "6班组主管",
        startTime: null,
        endTime: null,
        type: null,
        typeName: null,
      },
      {
        uid: "11527856549889",
        name: "普通用户19updaa",
        startTime: "2021-04-01",
        endTime: "2021-08-12",
        type: 1,
        typeName: "夏令时白班",
      },
      {
        uid: "98606641963009",
        name: "6班组主管",
        startTime: null,
        endTime: null,
        type: null,
        typeName: null,
      },
    ];

    let startTimeFilter = ref([{ text: "未排班", value: null }]);
    let endTimeFilter = ref([{ text: "未排班", value: null }]);
    let typeFilter = ref([{ text: "未排班", value: null }]);
    /**
     * startTimeFilter
     */
    const setFilter = () => {
      let startTimeSet = new Set(todayRoster.value.map((e) => e.startTime));
      // startTimeSet.add(null);
      // let startTimeFilter = ref([]);
      startTimeSet.forEach((e) => {
        if (e === null) {
          // startTimeFilter.value.push({ text: "未排班", value: null });
        } else {
          // startTimeFilter.value.push({ text: e, value: e });
        }
      });
      console.log("startTimeFilter", startTimeSet, startTimeFilter);

      /**
       * endTimeFilter
       */
      let endTimeSet = new Set(todayRoster.value.map((e) => e.endTime));
      // endTimeSet.has(null) ? endTimeSet.add(null) : null;
      // let endTimeFilter = ref([]);
      endTimeSet.forEach((e) => {
        if (e === null) {
          // endTimeFilter.value.push({ text: "未排班", value: null });
        } else {
          // endTimeFilter.value.push({ text: e, value: e });
        }
      });

      /**
       * typeFilter
       */
      let typeSet = new Set(todayRoster.value.map((e) => e.typeName));
      // typeSet.add(null);
      // let typeFilter = ref([]);
      typeSet.forEach((e) => {
        if (e === null) {
          // typeFilter.value.push({ text: "未排班", value: null });
        } else {
          // typeFilter.value.push({ text: e, value: e });
        }
      });
      console.log(typeFilter.value);
    };
    return {
      timeRange, //时间选择器 时间范围
      tableData,
      todayRoster, //今日排班
      rangeRoster, //区间排班
      startTimeFilter,
      endTimeFilter,
      typeFilter,
      setFilter,
      total,
      totalPage,
      currPage,
      getPageInfo,
      rosterOverview,
      ticketDealClick, //工单处理
      selectDetailRow,
      getDetailRow, //查看排班详情
      selectUser, //选中的用户
      removeDetailRow, //移除选中
      visible: ref(false),
      schedulingTypeOption: [
        {
          value: "1",
          label: "冬令时白班",
        },
        {
          value: "2",
          label: "冬令时夜班",
        },
        {
          value: "3",
          label: "夏令时白班",
        },
        {
          value: "4",
          label: "夏令时夜班",
        },
      ],
      stvalue, //选中的排版类型
      postS, //上传排班类型
    };
  },
});
</script>

<style>
.is-selected {
  color: #1989fa;
}
ul {
  list-style: none;
}
h1 {
  display: block;
  font-size: 1em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: inherit;
}
.container .headcard .headcard-juese h1 span {
  width: 72px;
  height: 28px;
  display: inline-block;
  text-align: center;
  line-height: 28px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background: #f5f5f5;
  border-radius: 4px;
}
.container .headcard .headcard-shop h1 {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-left: 12px;
}
.container .headcard .headcard-time h1 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 38px;
}
.container .headcard .headcard-juese h1 a {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  margin-left: 12px;
}
.container {
  background: #f5f5f5;
  padding: 0;
}
.container .headcard {
  display: flex;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
  padding: 32px 0;
  justify-content: space-around;
  text-align: start !important;
}
.container .headcard .headcard-shop {
  display: flex;
  align-items: center;
}

/* .container-btn */
.container .container-btn {
  display: flex;
  margin: 24px 0;
  justify-content: space-between;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.container .container-btn .container-btn-item {
  width: 18%;
  height: 84px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .container-btn .container-btn-item img {
  width: 36px;
  height: 36px;
}
.container .container-btn .container-btn-item h1 {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000;
  margin-left: 12px;
}
.container .container-contant .container-contanl-left {
  width: 70%;
}
.container .container-contant .container-contanl-left .container-contanl-left1 {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.container .container-contant {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.container .container-contant h1 {
  line-height: 60px;
  padding-left: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  border-bottom: 1px solid #f1e7e7;
  position: relative;
}
.container
  .container-contant
  .container-contanl-left
  .container-contanl-left1
  ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 48px 0;
}
.container .container-contant .container-contanl-right {
  width: 28%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #fff;
  margin-bottom: 16px;
}
.container .container-contant h1 {
  line-height: 60px;
  padding-left: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  border-bottom: 1px solid #f1e7e7;
  position: relative;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link
  img {
  width: 20px;
  height: 20px;
  margin: 0 12px 0 24px;
}
.container
  .container-contant
  .container-contanl-right
  .container-contanl-right-link {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.roster-edit-container {
  display: flex;
}
.roster-edit-container-list {
  width: 65%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.roster-edit-container-selected-list {
  width: 35%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
}
.roster-edit-container-selected-button {
  text-align: center;
  display: inline-flex;
}
</style>
