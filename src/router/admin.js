export default [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
    //   {
    //     path: 'dashboard',
    //     name: 'AdminDashboard',
    //     component: () => import('@/views/admin/Dashboard.vue'),
    //   },
    ],
  },
]
