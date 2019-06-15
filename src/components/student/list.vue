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
        editUrl: "/home/student/list/edit", //修改内容跳转的页面
        getListUrl: "/admin/student/list", //请求分页数据地址
        editBtnName: "身体数据评测", //修改按钮名字
        //表格的每项数据
        tabItem: [
          {
            prop: "id",
            label: "ID",
            width: 100
          },
          {
            prop: "school_name",
            label: "营区"
          },
          {
            prop: "user_name_b",
            label: "真实姓名"
          },
          {
            prop: "user_name",
            label: "昵称"
          },
          {
            prop: "last_login_time",
            label: "最后登录时间"
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
