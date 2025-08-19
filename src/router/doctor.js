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
        meta: { requiresProvider: true }
      },

      {
        path: 'visits',
        name: 'DoctorDashboardVisits',
        component: () => import('@/views/Doctor/Dashboard/Visits.vue'),
        meta: { requiresProvider: true }
      },

      {
        path: 'visits/:visitId',
        name: 'DoctorDashboardViewVisits',
        component: () => import('@/views/Doctor/Dashboard/ViewVisit.vue'),
        meta: { requiresProvider: true }
      },
      {
        path: 'add-medical-condition/:patientId',
        name: 'DoctorDashboardAddPatientMedicalCondition',
        component: () => import('@/views/Doctor/Dashboard/AddMedicalCondition.vue'),
      },


      {
        path: 'add-medical-record/:patientId/:visitId',
        name: 'DoctorDashboardAddPatientMedicalRecord',
        component: () => import('@/views/Doctor/Dashboard/AddMedicalRecord.vue'),
      },
      // other doctor routes...
    ]
  }
]
