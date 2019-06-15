export default {
  path: 'news',
  component: () => import('@/views/news.vue'),
  redirect: 'news/add',
  children: [{
    path: 'add',
    component: () => import('@/components/news/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/news/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/news/list/edit.vue'),
  }, ]
}