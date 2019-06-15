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
          name: "添加课程基本信息",
          url: "/home/curriculum/add"
        },
        {
          name: "添加课程教练",
          url: "/home/curriculum/teacher"
        },
        {
          name: "课程日程管理",
          url: "/home/curriculum/catalog"
        },
        {
          name: "课程学员管理",
          url: "/home/curriculum/student"
        },
        {
          name: "课程列表",
          url: "/home/curriculum/list"
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
