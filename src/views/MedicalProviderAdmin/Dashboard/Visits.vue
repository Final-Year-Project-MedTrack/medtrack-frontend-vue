<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Visit management</h1>
        <p class="text-sm text-gray-500">Manage patient appointments</p>
      </div>
      <router-link :to="{name: 'MedicalProviderDashboardScheduleVisit'}" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">
        Schedule visit
      </router-link>
    </div>

    <div class="flex flex-wrap gap-6 items-center">
      <input type="text" placeholder="Search here..."
        class="border border-gray-100 p-2 rounded-md flex-grow max-w-sm" />
      <select class="border border-gray-100 p-2 rounded-md">
        <option>All visits</option>
        <option>Physical therapy</option>
        <option>Follow-up</option>
      </select>
      <select class="border border-gray-100 p-2 px-4 rounded-md">
        <option>All status</option>
        <option>Urgent</option>
        <option>Normal</option>
        <option>Medium</option>
      </select>
    </div>

    <div class="space-y-4">
      <div v-if="loading" class="text-gray-500">Loading visits...</div>
      <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>
      <div v-else v-for="(visit, index) in visits" :key="index" class="bg-gray-50 rounded-md p-4 space-y-2">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold">{{ visit.patient.user.first_name + ' ' + visit.patient.user.last_name }}</h2>
              <span :class="badgeClass(visit.status)">{{ visit.status }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500 gap-2 py-2">
              <span>⏰ {{ visit.admission_date }}</span>
              <span class="pl-4"> <i class="fa fa-plus"></i> {{ visit.visit_type }}</span>
            </div>
          </div>
          <div class="relative">
            <button @click="toggleDropdown(index)"
              class="bg-gray-600 hover:bg-gray-200 text-white text-sm px-4 py-1 rounded-md">
              {{ visit.dropdownOpen ? 'Close' : 'Actions' }}
            </button>
            <div v-if="visit.dropdownOpen" class="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-gray-100 z-10">
              <div class="px-4 pt-2">
                <h6 class="font-bold">Check-in Options</h6>
              </div>
              <ul class=" text-sm text-gray-100">
                <div class="py-4 pt-2 border-b border-gray-100">
                  <router-link :to="{name: 'MedicalProviderDashboardRecordPatientVitals', params:{'patientId':visit.patient.id}}" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Check In + Record Vitals</router-link>
                  <!-- <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Check In Only</li> -->
                </div>
                <!-- <div class="py-4">
                  <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-yellow-600">No Show</li>
                  <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Cancelled</li>
                </div> -->
              </ul>
            </div>
          </div>
        </div>

        <!-- <hr> -->
        <div class="border-t border-gray-100 flex justify-between w-full">
          <div class="py-2">
            <p class="font-medium">Reason for visit</p>
            <p class="text-sm text-gray-600">{{ visit.reason }}</p>
          </div>
          <div class="">
            <router-link :to="{'name': 'MedicalProviderDashboardViewVisits', 'params': {'visitId': visit.id}}" class=" border border-gray-600 rounded p-2 my-4 right-0 text-sm text-gray-600 hover:underline">
              View medical record →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/services/axios'

const visits = ref([]);
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('medical-provider/patient-visit/patient-visit?medical_provider=1')
    visits.value = response.data.data.items.map((v) => ({
      ...v,
      dropdownOpen: false,
    }))

    // console.log(visits, response.data.items)
  } catch (err) {
    error.value = 'Failed to fetch visits'
    console.error(err)
  } finally {
    loading.value = false
  }
})

function toggleDropdown(index) {
  visits.value.forEach((v, i) => {
    v.dropdownOpen = i === index ? !v.dropdownOpen : false;
  });
}

function badgeClass(status) {
  switch (status.toLowerCase()) {
    case 'urgent':
      return 'text-xs px-2 py-0.5 rounded bg-red-100 text-red-800';
    case 'normal':
      return 'text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800';
    case 'discharged':
      return 'text-xs px-2 py-0.5 rounded bg-green-100 text-gray-800';
    case 'medium':
      return 'text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800';
    default:
      return 'text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800';
  }
}
</script>

<style scoped></style>
