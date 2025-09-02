<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Staff Management</h1>
      
      <div class="flex gap-2">
        <FwbDropdown placement="bottom-end">
          <template #trigger>
            <button class="px-4 py-2 bg-green-600 text-white rounded-md">
              Add new user
            </button>
          </template>

          <div class="py-1 bg-white">
            <div class="block px-4 py-2 text-sm text-gray-700 bg-white ">
              <router-link :to="{ name: 'MedicalProviderDashboardAddDoctor' }">
                Add Doctor
              </router-link>
            </div>

            <div class="block px-4 py-2 text-sm text-gray-700 bg-white">
              <router-link :to="{ name: 'MedicalProviderDashboardAddStaff' }">
                Add Staff
              </router-link>
            </div>
          </div>
        </FwbDropdown>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="p-4 bg-white rounded-lg shadow">Total Staff: {{totalStaff}}</div>
      <div class="p-4 bg-white rounded-lg shadow">Total Doctors: {{activeDoctors}}</div>
      <div class="p-4 bg-white rounded-lg shadow">Active Staff: {{totalStaff}}</div>
      <div class="p-4 bg-white rounded-lg shadow">Inactive Staff: 0</div>
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
import { ref, onMounted } from "vue"
import { FwbDropdown } from 'flowbite-vue'
import { useUserStore } from '@/store/user'
import api from '@/services/axios'

const open = ref(false)
const totalStaff = ref(0)
const activeDoctors = ref(0)
const userStore = useUserStore()

const toggleDropdown = () => {
  open.value = !open.value
}

const closeDropdown = () => {
  open.value = false
}


onMounted(async () => {
  try {
    const response = await api.get(`medical-provider/medical-provider-user-metrics?medical_provider=${userStore.selectedProviderId}`)

    totalStaff.value = response.data.data.total_staff
    activeDoctors.value = response.data.data.total_doctors
    
  } catch (err) {
    // error.value = 'Failed to fetch visits'
    console.error(err)
  } finally {
  }
})
</script>