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

      {
        path: 'patients',
        name: 'MedicalProviderDashboardPatients',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/Patients.vue'),
      },

      {
        path: 'visits',
        name: 'MedicalProviderDashboardVisits',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/Visits.vue'),
      },

      {
        path: 'visits/:visitId',
        name: 'MedicalProviderDashboardViewVisits',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/ViewVisit.vue'),
      },

      {
        path: 'schedule-visit',
        name: 'MedicalProviderDashboardScheduleVisit',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/ScheduleVisit.vue'),
      },
    ],
  },
]
