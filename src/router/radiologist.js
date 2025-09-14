export default [
  {
    path: "/radiologist",
    component: () => import("@/layouts/RadiologistLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "RadiologistDashboard",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/Dashboard.vue"),
      },

      {
        path: "laboratory-test-service",
        name: "RadiologistDashboardLaboratoryTestService",
        component: () =>
          import("@/views/Radiologist/Dashboard/LaboratoryTestService/AllLaboratoryTestService.vue"),
      },

      {
        path: "add-laboratory-test-service",
        name: "RadiologistDashboardAddLaboratoryTestService",
        component: () =>
          import("@/views/Radiologist/Dashboard/LaboratoryTestService/AddLaboratoryTestService.vue"),
      },

      {
        path: "add-staff",
        name: "RadiologistDashboardAddStaff",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/AddStaffToMedicalProvider.vue"),
      },

      {
        path: "visits-with-lab-result",
        name: "RadiologistDashboardVisitsWithLabResults",
        component: () =>
          import("@/views/Radiologist/Dashboard/VisitsWithLabResults/VisitsWithLabResults.vue"),
      },

      {
        path: "visits-with-lab-result/:visitId",
        name: "RadiologistDashboardViewVisitWithLabResults",
        component: () =>
          import("@/views/Radiologist/Dashboard/VisitsWithLabResults/ViewVisitWithLabResult.vue"),
        // component: () =>
        //   import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/StaffManagement.vue"),
        
        children: [
          { 
            path: "",
            // props: true,
            // props: (route) => ({ visit: route.meta.visit }),
            name: "RadiologistDashboardViewVisitWithLabResultsManagement", 
            redirect: {name: "RadiologistDashboardViewVisitWithLabResultsOverview"} 
          }, // default redirect
          {
            path: "overview",
            name: "RadiologistDashboardViewVisitWithLabResultsOverview",
            component: () =>
              import(
                "@/components/medicalProviderAdmin/visitsPage/VisitOverview.vue"
              ),
          },
          {
            path: "lab-test",
            name: "RadiologistDashboardViewVisitWithLabResultsLabTest",
            component: () =>
              import(
                "@/components/Radiologist/ViewVisitWithLabResult/LabTest.vue"
              ),
          },

          {
            path: "view-lab-test/:visitLabTestId",
            name: "RadiologistDashboardViewVisitWithLabResultsViewLabTest",
            component: () =>
              // import(
              //   "@/components/Radiologist/ViewVisitWithLabResult/LabTest.vue"
              // ),
              import("@/views/Radiologist/Dashboard/VisitsWithLabResults/LabResults/ViewPatientVisitLaboratoryTest.vue"),
          },
        //   {
        //     path: "add-lab-test",
        //     name: "RadiologistDashboardViewVisitWithLabResultsAddLabTest",
        //     component: () =>
        //       import(
        //         "@/components/medicalProviderAdmin/medicalProviderUserPage/AllStaff.vue"
        //       ),
        //   },
        ],
      },
    ],
  },
];
