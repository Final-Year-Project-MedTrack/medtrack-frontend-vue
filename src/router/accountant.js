export default [
  {
    path: "/accountant",
    component: () => import("@/layouts/AccountantLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "AccountantDashboard",
        component: () =>
          import("@/views/Accountant/Dashboard/Dashboard.vue"),
      },
      {
        path: "drugs",
        name: "AccountantDashboardDrugs",
        component: () =>
          import("@/views/Accountant/Dashboard/Drugs/AllDrugs.vue"),
      },

      {
        path: "add-drugs",
        name: "AccountantDashboardAddDrugs",
        component: () =>
          import("@/views/Accountant/Dashboard/Drugs/AddDrug.vue"),
      },

      {
        path: "laboratory-test-service",
        name: "AccountantDashboardLaboratoryTestService",
        component: () =>
          import("@/views/Radiologist/Dashboard/LaboratoryTestService/AllLaboratoryTestService.vue"),
      },

      {
        path: "add-laboratory-test-service",
        name: "AccountantDashboardAddLaboratoryTestService",
        component: () =>
          import("@/views/Radiologist/Dashboard/LaboratoryTestService/AddLaboratoryTestService.vue"),
      },
    ],
  },
];
