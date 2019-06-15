export default {
  path: 'banner',
  component: () => import('@/views/banner.vue'),
  redirect: 'banner/add',
  children: [{
    path: 'add',
    component: () => import('@/components/banner/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/banner/list.vue'),
  }, ]
}