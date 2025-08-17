<template>
  <div class="p-6  space-y-6">
    <!-- Header -->
    <div class="md:flex pt-16 md:flex-row  md:justify-between">
      <div class="">
        <h1 class="text-2xl font-bold">Patient management</h1>
        <p class="text-gray-500">Register new patients and view patient information</p>
      </div>
      <div class="">
        <router-link :to="{name: 'MedicalProviderDashboardAddPatients'}" class="mt-4 md:mt-0 bg-green-600 text-white p-2 rounded-md flex items-center">
          <i class="mr-2" v-html="registerIcon"></i>
          Register patient
        </router-link>
      </div>
    </div>

    <div class="border border-gray-100 p-4 rounded">
      <!-- Search & Filter -->
    <div class="flex w-1/2 sm:flex-row items-center gap-4">
      <div class="relative w-3/4 sm:w-1/2">
        <span class="absolute right-3 top-2.5 text-gray-400">
          <i v-html="searchIcon"></i>
        </span>
        <input type="text" placeholder="Search by name or ID..." v-model="search" class="w-full pl-2 border border-gray-100 rounded-md px-4 py-2" />
      </div>
      <div class="w-1/4">
        <button class="border border-gray-100 px-4 py-2 rounded-md flex items-center">
        <i class="mr-2" v-html="filterIcon"></i>
        Filter
      </button>
      </div>
    </div>

    <!-- Patient Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse mt-4">
        <thead class="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th class="p-2">NIN</th>
            <th class="p-2">Name</th>
            <th class="p-2">Contact</th>
            <th class="p-2">Last visit</th>
            <th class="p-2">Next appointment</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in patients" :key="index" class="border-b text-sm font-thin mt-5 border-gray-100 hover:bg-gray-50">
            <td class="py-3 px-2">{{ patient.nin }}</td>
            <td class="py-3 px-2 flex items-center gap-3">
              <img :src="patient.avatar" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ patient.name }}</p>
                <p class="text-sm text-gray-500">{{ patient.role }}</p>
              </div>
            </td>
            <td class="py-3 px-2">
              <p>{{ patient.phone }}</p>
              <p class="text-sm text-gray-500">{{ patient.email }}</p>
            </td>
            <td class="py-3 px-2">{{ patient.lastVisit }}</td>
            <td class="py-3 px-2">{{ patient.nextAppointment }}</td>
            <td class="py-3 px-2">
              <button class="bg-gray-600 text-white px-2 py-2 button rounded-md flex items-center">
                <i class="mr-2" v-html="eyeIcon"></i>
                View records
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-6">
      <p class="text-sm text-gray-500">Page 1 of 30</p>
      <div class="flex items-center space-x-1">
        <button class="border px-3 py-1 rounded-md border-gray-100">Previous</button>
        <span v-for="page in pages">
          <button :key="page" :class="['px-3 py-1 rounded-md', currentPage === page ? 'bg-green-600 text-white' : '']">
            {{ page }}
          </button>
        </span>
        <button class="border border-gray-100 px-3 py-1 rounded-md">Next</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const currentPage = ref(3)
const pages = [1, 2, 3, '...', 10, 11, 12]

const patients = [
  {
    nin: 'P001162435',
    name: 'Abasifreke Nkanang',
    role: 'Primary Care Physician',
    phone: '+2348129285072',
    email: 'abas@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastVisit: '25/1/2024 13:00:00',
    nextAppointment: '25/1/2024 13:00:00'
  },
  // repeat the same object for demo purpose
  // in real case, fetch from API or Vuex store
]

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`
const filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6 6V21l-4-2v-8.293l-6-6A1 1 0 013 4z" /></svg>`
const registerIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`
const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`
</script>

<style scoped>
@media (max-width: 768px) {
  table thead {
    display: none;
  }

  table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
  }

  table td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }

  table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #6b7280;
  }
}
</style>