export default {
  path: 'school',
  component: () => import('@/views/school.vue'),
  redirect: 'school/add',
  children: [{
    path: 'add',
    component: () => import('@/components/school/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/school/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/school/list/edit.vue'),
  }]
}