export default {
  path: 'curriculum',
  component: () => import('@/views/curriculum.vue'),
  redirect: 'curriculum/add',
  children: [{
    path: 'add',
    component: () => import('@/components/curriculum/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/curriculum/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/curriculum/list/edit.vue'),
  }, {
    path: 'teacher',
    component: () => import('@/components/curriculum/teacher.vue'),
  }, {
    path: 'catalog',
    component: () => import('@/components/curriculum/catalog.vue'),
  }, {
    path: 'student',
    component: () => import('@/components/curriculum/student.vue'),
  }]
}