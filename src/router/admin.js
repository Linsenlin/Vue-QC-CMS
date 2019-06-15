export default {
  path: 'admin',
  component: () => import('@/views/admin.vue'),
  redirect: 'admin/add',
  children: [{
      path: 'add',
      component: () => import('@/components/admin/add.vue'),
    },
    {
      path: 'list',
      component: () => import('@/components/admin/list.vue'),
    },
    {
      path: 'list/edit',
      component: () => import('@/components/admin/list/edit.vue'),
    }
  ]
}