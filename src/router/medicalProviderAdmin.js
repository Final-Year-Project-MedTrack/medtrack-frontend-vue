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
        path: 'add-patients',
        name: 'MedicalProviderDashboardAddPatients',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/RegisterPatient.vue'),
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
        path: 'record-patient-vitals/:patientId',
        name: 'MedicalProviderDashboardRecordPatientVitals',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/RecordPatientVitals.vue'),
      },

      {
        path: 'patients/:patientId/vitals',
        name: 'MedicalProviderDashboardPatientVitals',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/PatientVitals.vue'),
      },

      {
        path: 'schedule-visit',
        name: 'MedicalProviderDashboardScheduleVisit',
        component: () => import('@/views/MedicalProviderAdmin/Dashboard/ScheduleVisit.vue'),
      },
    ],
  },
]
