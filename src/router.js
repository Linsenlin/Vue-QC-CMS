import Vue from 'vue';
import Router from 'vue-router';
//管理员
import admin from '@/router/admin';
//活动
import activity from '@/router/activity';
//教练老师
import teacher from '@/router/teacher';
//头条新闻
import news from '@/router/news';
//订单
import orderForm from '@/router/orderForm';
//校区
import school from '@/router/school';
//课程
import curriculum from '@/router/curriculum';
//轮播
import banner from '@/router/banner';
//学员列表
import student from '@/router/student';


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      //根路径重定向
      path: '/',
      redirect: '/signIn',
    },
    {
      //主页面
      path: '/home',
      component: () => import('@/views/home.vue'),
      redirect: 'home/orderForm',
      //子路由
      children: [admin, activity, teacher, news, orderForm, school, curriculum, banner, student]
    },
    {
      //登录路由
      path: '/signIn',
      component: () => import('@/views/signIn.vue')
    },
  ]
})