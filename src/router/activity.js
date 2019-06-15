export default {
  path: 'activity',
  component: () => import('@/views/activity.vue'),
  redirect: 'activity/add',
  children: [{
      path: 'add',
      component: () => import('@/components/activity/add.vue'),
    }, {
      path: 'list',
      component: () => import('@/components/activity/list.vue'),
    },
    {
      path: 'list/edit',
      component: () => import('@/components/activity/list/edit.vue'),
    },
  ]
}