export default {
  path: 'teacher',
  component: () => import('@/views/teacher.vue'),
  redirect: 'teacher/add',
  children: [{
    path: 'add',
    component: () => import('@/components/teacher/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/teacher/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/teacher/list/edit.vue'),
  }]
}