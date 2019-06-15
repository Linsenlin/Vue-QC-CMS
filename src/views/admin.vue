<template>
  <div>
    <tabs :config="config"></tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //tabs路由配置
      config: [
        {
          name: "添加管理员",
          url: "/home/admin/add"
        },
        {
          name: "管理员列表",
          url: "/home/admin/list"
        }
      ]
    };
  },
  components: {
    tabs: () => import("@/components/public/tabs.vue")
  }
};
</script>

<style scoped>
</style>
