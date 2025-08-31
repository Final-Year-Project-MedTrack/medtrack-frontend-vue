export default [
  {
    path: "/medical-provider",
    component: () => import("@/layouts/MedicalProviderAdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "MedicalProviderDashboard",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/Dashboard.vue"),
      },

      {
        path: "/staff",
        name: "MedicalProviderDashboardStaff",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/StaffManagement.vue"),
        
        children: [
          { 
            path: "",
            name: "MedicalProviderDashboardStaffManagement", 
            redirect: {name: "MedicalProviderDashboardStaffAllStaff"} 
          }, // default redirect
          {
            path: "all",
            name: "MedicalProviderDashboardStaffAllStaff",
            component: () =>
              import(
                "@/components/medicalProviderAdmin/medicalProviderUserPage/AllStaff.vue"
              ),
          },
          {
            path: "doctors",
            name: "MedicalProviderDashboardStaffDoctors",
            component: () =>
              import(
                "@/components/medicalProviderAdmin/medicalProviderUserPage/Doctors.vue"
              ),
          },
          {
            path: "providers",
            name: "MedicalProviderDashboardStaffProviderStaff",
            component: () =>
              import(
                "@/components/medicalProviderAdmin/medicalProviderUserPage/AllStaff.vue"
              ),
          },
        ],
      },

      {
        path: "add-doctor",
        name: "MedicalProviderDashboardAddDoctor",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/AddDoctorToMedicalProvider.vue"),
      },

      {
        path: "add-staff",
        name: "MedicalProviderDashboardAddStaff",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/AddStaffToMedicalProvider.vue"),
      },

      {
        path: "patients",
        name: "MedicalProviderDashboardPatients",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/Patients.vue"),
      },

      {
        path: "add-patients",
        name: "MedicalProviderDashboardAddPatients",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/RegisterPatient.vue"),
      },

      {
        path: "visits",
        name: "MedicalProviderDashboardVisits",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/Visits.vue"),
      },

      {
        path: "visits/:visitId",
        name: "MedicalProviderDashboardViewVisits",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/ViewVisit.vue"),
      },

      {
        path: "record-patient-vitals/:patientId",
        name: "MedicalProviderDashboardRecordPatientVitals",
        component: () =>
          import(
            "@/views/MedicalProviderAdmin/Dashboard/RecordPatientVitals.vue"
          ),
      },

      {
        path: "patients/:patientId/vitals",
        name: "MedicalProviderDashboardPatientVitals",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/PatientVitals.vue"),
      },

      {
        path: "schedule-visit",
        name: "MedicalProviderDashboardScheduleVisit",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/ScheduleVisit.vue"),
      },
    ],
  },
];
