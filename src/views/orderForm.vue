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
          name: "活动订单",
          url: "/home/orderForm/activity"
        },
        {
          name: "课程订单",
          url: "/home/orderForm/curriculum"
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
