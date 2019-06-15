<template>
  <div class="admin-list">
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>可选择时间范围：</span>
        <div>
          <el-date-picker
            v-model="timeRangeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
    </ul>
    <tabList :config="tabsListConfig" :getListData="getListData"></tabList>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsListConfig: {
        getListUrl: "/admin/order/list", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "id",
            label: "订单ID",
            width: 100
          },
          {
            prop: "course_id",
            label: "活动ID",
            width: 100
          },
          {
            prop: "title",
            label: "活动名"
          },
          {
            prop: "school_name",
            label: "营区"
          },
          {
            prop: "user_name",
            label: "昵称"
          },
          {
            prop: "user_name_b",
            label: "真实姓名"
          },
          {
            prop: "money",
            label: "金额（元）"
          },
          {
            prop: "add_time",
            label: "生成时间"
          }
        ]
      },
      timeRangeValue: "", //时间范围
      getListData: {
        type: 1, //1活动 0课程
        start_time: "", //开始时间
        end_time: "" //结束时间
      }
    };
  },
  methods: {},
  watch: {
    //监听时间变化
    timeRangeValue(newValue) {
      this.getListData.start_time = newValue ? newValue[0] : "";
      this.getListData.end_time = newValue ? newValue[1] : "";
    }
  },
  components: {
    tabList: () => import("@/components/public/tabList.vue")
  }
};
</script>
<style scoped>
.admin-list {
  margin: 30px auto;
}
</style>
