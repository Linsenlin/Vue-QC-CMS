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
        deleteUrl: "/admin/manage", //删除的请求地址
        deleteKey: "type", //删除的参数键名
        deleteType: 3, //删除请求的类型参数
        editBtnName: "编辑", //修改按钮名字
        editUrl: "/home/admin/list/edit", //修改内容跳转的页面
        getListUrl: "/admin/user/list", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "user_name",
            label: "管理员",
            width: 100
          },
          {
            prop: "add_time",
            label: "创建时间"
          },
          {
            prop: "last_login_time",
            label: "最后登录时间"
          },
          {
            prop: "enable",
            label: "是否启用",
            select: ["未启用", "已启用"]
          }
        ]
      }
    };
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
