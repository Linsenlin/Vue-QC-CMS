export default {
  path: 'orderForm',
  component: () => import('@/views/orderForm.vue'),
  redirect: 'orderForm/activity',
  children: [{
    path: 'activity',
    component: () => import('@/components/orderForm/activity.vue'),
  }, {
    path: 'curriculum',
    component: () => import('@/components/orderForm/curriculum.vue'),
  }, ]
}