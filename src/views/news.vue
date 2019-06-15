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
          name: "添加新闻",
          url: "/home/news/add"
        },
        {
          name: "新闻列表",
          url: "/home/news/list"
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
