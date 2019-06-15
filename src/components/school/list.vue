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
        deleteUrl: "/admin/school/manage", //删除的请求地址
        deleteKey: "type", //删除的参数键名
        deleteType: 3, //删除请求的类型参数
        editBtnName: "编辑", //修改按钮名字
        editUrl: "/home/school/list/edit", //修改内容跳转的页面
        getListUrl: "/admin/school/list", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "id",
            label: "ID",
            width: 100
          },
          {
            prop: "add_time",
            label: "添加时间"
          },
          {
            prop: "school_name",
            label: "营区名"
          },
          {
            prop: "phone",
            label: "营区电话号码"
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
