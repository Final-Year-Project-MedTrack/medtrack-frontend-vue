export default [
  {
        path: '/doctor/select-provider',
        name: 'DoctorSelectProvider',
        component: () => import('@/views/Doctor/SelectProvider.vue'),
  },

  {
        path: '/doctor/provider/login',
        name: 'DoctorLoginToProvider',
        component: () => import('@/views/Doctor/LoginToProvider.vue'),
        meta: { requiresProvider: true }
  },
  {
    path: '/doctor',
    component: () => import('@/layouts/DoctorLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'DoctorDashboard' },
      },
      {
        path: 'dashboard',
        name: 'DoctorDashboard',
        component: () => import('@/views/Doctor/Dashboard/Dashboard.vue'),
        // meta: { requiresProvider: true }
      },
      // other doctor routes...
    ]
  }
]
