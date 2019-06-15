export default {
  path: 'student',
  component: () => import('@/views/student.vue'),
  redirect: 'student/list',
  children: [{
    path: 'list',
    component: () => import('@/components/student/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/student/list/edit.vue'),
  }, ]
}