<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Staff Management</h1>
      <div class="flex gap-2">
        <button class="px-4 py-2 border rounded-md">Export CSV</button>
        <button class="px-4 py-2 bg-green-600 text-white rounded-md">Add new user</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="p-4 bg-white rounded-lg shadow">Total Staff: 30</div>
      <div class="p-4 bg-white rounded-lg shadow">Total Doctors: 200</div>
      <div class="p-4 bg-white rounded-lg shadow">Active Staff: 200</div>
      <div class="p-4 bg-white rounded-lg shadow">Inactive Staff: 20</div>
    </div>

    <!-- Tabs -->
    <div class="border-b mb-4 flex gap-6">
      <router-link 
        :to="{name: 'MedicalProviderDashboardStaffAllStaff'}" 
        class="pb-2 border-b-2"
        active-class="border-green-600 text-green-600"
      >All Staff</router-link>

      <router-link 
        :to="{name: 'MedicalProviderDashboardStaffDoctors'}" 
        class="pb-2 border-b-2"
        active-class="border-green-600 text-green-600"
      >Doctors</router-link>

      <router-link 
        :to="{name: 'MedicalProviderDashboardStaffAllStaff'}" 
        class="pb-2 border-b-2"
        active-class="border-green-600 text-green-600"
      >Provider Staff</router-link>
    </div>

    <!-- Render active component -->
    <router-view />
  </div>
</template>
