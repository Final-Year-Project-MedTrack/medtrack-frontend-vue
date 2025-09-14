export default [
  {
    path: "/accountant",
    component: () => import("@/layouts/AccountantLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "AccountantDashboard",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/Dashboard.vue"),
      },

      {
        path: "add-staff",
        name: "AccountantDashboardAddStaff",
        component: () =>
          import("@/views/MedicalProviderAdmin/Dashboard/StaffManagement/AddStaffToMedicalProvider.vue"),
      },
    ],
  },
];
