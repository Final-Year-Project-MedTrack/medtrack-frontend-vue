<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Staff Management</h1>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-gray-100 rounded-md">Export CSV</button>
        <button @click="open = !open" class="px-4 py-2 bg-green-600 text-white rounded-md">
          Add new user
        </button>

        <!-- Dropdown Menu -->
        <div v-if="open"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div class="py-1">
            <router-link :to="{name: 'MedicalProviderDashboardAddDoctor'}" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Add Doctor
            </router-link>
            <router-link :to="{name: 'AddStaffToMedicalProvider'}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Add Staff
            </router-link>
          </div>
        </div>

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
    <div class="border-b border-gray-100 mb-4 flex gap-6">
      <router-link :to="{ name: 'MedicalProviderDashboardStaffAllStaff' }" class="pb-2 border-b"
        active-class="border-green-100 text-green-600">All Staff</router-link>

      <router-link :to="{ name: 'MedicalProviderDashboardStaffDoctors' }" class="pb-2 border-b"
        active-class="border-green-100 text-green-600">Doctors</router-link>
<!-- 
      <router-link :to="{ name: 'MedicalProviderDashboardStaffAllStaff' }" class="pb-2 border-b"
        active-class="border-green-100 text-green-600">Provider Staff</router-link> -->
    </div>

    <!-- Render active component -->
    <router-view />
  </div>
</template>


<script setup>
import { ref } from "vue"

const open = ref(false)

// close when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest(".relative")) {
    open.value = false
  }
}
document.addEventListener("click", handleClickOutside)
</script>