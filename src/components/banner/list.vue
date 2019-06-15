<template>
  <div class="admin-list">
    <tabList :config="tabsListConfig"></tabList>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsListConfig: {
        deleteUrl: "/admin/banner/set", //删除的请求地址
        deleteKey: "state", //删除
        deleteType: 2, //删除请求的类型参数
        getListUrl: "/admin/banner/list", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "id",
            label: "ID",
            width: 100
          },
          {
            prop: "img",
            label: "轮播图",
            type: "img"
          },
          {
            prop: "school_name",
            label: "轮播图位置"
          },
          {
            prop: "name",
            label: "添加轮播图名字"
          },
          {
            prop: "add_time",
            label: "添加时间"
          }
        ]
      }
    };
  },
  methods: {},
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
