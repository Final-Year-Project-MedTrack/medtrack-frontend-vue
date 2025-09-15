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
        meta: { requiresProvider: true },
        children: [
          {
            path: "overview",
            name: "DoctorDashboardViewVisitWithLabResultsOverview",
            component: () =>
              import(
                "@/components/medicalProviderAdmin/visitsPage/VisitOverview.vue"
              ),
          },

          {
            path: "patient-profile",
            name: "DoctorDashboardViewVisitPatientProfile",
            component: () =>
              import(
                "@/components/doctor/visitsPage/PatientProfile.vue"
              ),
          },
          {
            path: "vitals-history",
            name: "DoctorDashboardViewVisitPatientVitalsHistory",
            component: () =>
              import(
                "@/components/doctor/visitsPage/VitalsHistory.vue"
              ),
          },

          {
            path: "diagnosis",
            name: "DoctorDashboardViewVisitPatientMedicalConditions",
            component: () =>
              import(
                "@/components/doctor/visitsPage/Diagnosis.vue"
              ),
          },

          {
            path: "allergies",
            name: "DoctorDashboardViewVisitPatientAllergies",
            component: () =>
              import(
                "@/components/doctor/visitsPage/Allergies.vue"
              ),
          },

          {
            path: "medical-record",
            name: "DoctorDashboardViewVisitPatientMedicalRecord",
            component: () =>
              import(
                "@/components/doctor/visitsPage/MedicalRecords.vue"
              ),
          },
          {
            path: "lab-test",
            name: "DoctorDashboardViewVisitWithLabResultsLabTests",
            component: () =>
              import(
                "@/components/doctor/visitsPage/ViewMedicalLaboratoryTests.vue"
              ),
          },
          {
            path: "view-lab-test/:visitLabTestId",
            name: "DoctorDashboardViewVisitWithLabResultsViewLabTest",
            component: () =>
              import("@/components/doctor/visitsPage/ViewMedicalLaboratoryTest.vue"),
          },
        ]
      },
      {
        path: 'add-medical-condition/:patientId',
        name: 'DoctorDashboardAddPatientMedicalCondition',
        component: () => import('@/views/Doctor/Dashboard/AddMedicalCondition.vue'),
      },

      {
        path: 'add-allergy/:patientId',
        name: 'DoctorDashboardAddPatientAllergy',
        component: () => import('@/views/Doctor/Dashboard/AddAllergy.vue'),
      },


      {
        path: 'add-medical-record/:patientId/:visitId',
        name: 'DoctorDashboardAddPatientMedicalRecord',
        component: () => import('@/views/Doctor/Dashboard/AddMedicalRecord.vue'),
      },

      {
        path: 'add-patient-visit-lab-test/:patientId/:visitId',
        name: 'DoctorDashboardAddPatientVisitLaboratoryTest',
        component: () => import('@/views/Doctor/Dashboard/AddPatientVisitLaboratoryTest.vue'),
      },
      // other doctor routes...
    ]
  }
]
