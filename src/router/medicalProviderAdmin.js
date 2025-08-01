export default [
  {
    path: '/medical-provider',
    component: () => import('@/layouts/MedicalProviderAdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'MedicalProviderDashboard',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/Dashboard.vue'),
      },
    ],
  },
]
