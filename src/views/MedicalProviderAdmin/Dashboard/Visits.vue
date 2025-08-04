<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">Visit management</h1>
                <p class="text-sm text-gray-500">Manage patient appointments</p>
            </div>
            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">
                Schedule visit
            </button>
        </div>

        <div class="flex flex-wrap gap-4 items-center">
            <input type="text" placeholder="Search here..." class="border p-2 rounded-md flex-grow max-w-sm" />
            <select class="border p-2 rounded-md">
                <option>All visits</option>
                <option>Physical therapy</option>
                <option>Follow-up</option>
            </select>
            <select class="border p-2 rounded-md">
                <option>All status</option>
                <option>Urgent</option>
                <option>Normal</option>
                <option>Medium</option>
            </select>
        </div>

        <div class="space-y-4">
    <div v-if="loading" class="text-gray-500">Loading visits...</div>
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>
    <div
      v-else
      v-for="(visit, index) in visits"
      :key="index"
      class="bg-white rounded-md shadow p-4 space-y-2"
    >
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <h2 class="font-semibold">{{ visit.patient.user.first_name + ' ' + visit.patient.user.last_name }}</h2>
            <span :class="badgeClass(visit.status)">{{ visit.status }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-500 gap-2">
            <span>⏰ {{ visit.time }}</span>
            <span>{{ visit.type }}</span>
            <span>• Dr. {{ visit.doctor }}</span>
          </div>
        </div>
        <div class="relative">
          <button
            @click="toggleDropdown(index)"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-md"
          >
            {{ visit.dropdownOpen ? 'Close' : 'Check in' }}
          </button>
          <div
            v-if="visit.dropdownOpen"
            class="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border z-10"
          >
            <ul class="divide-y text-sm">
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Check In + Record Vitals</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Check In Only</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-yellow-600">No Show</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Cancelled</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p class="font-medium">Reason for visit</p>
        <p class="text-sm text-gray-600">{{ visit.reason }}</p>
      </div>
      <div>
        <button class="text-sm text-blue-600 hover:underline">
          View medical record →
        </button>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/services/axios'

const visits = reactive([
    {
        name: 'Abasifreke Nkanang',
        status: 'Urgent',
        time: '15:00',
        type: 'Physical therapy',
        doctor: 'Sarah Wilson',
        reason: 'Patient reports persistent headaches over the past week, accompanied by mild dizziness and sensitivity to light',
        dropdownOpen: false,
    },
    {
        name: 'Abasifreke Nkanang',
        status: 'Normal',
        time: '15:00',
        type: 'Physical therapy',
        doctor: 'Sarah Wilson',
        reason: 'Patient reports persistent headaches over the past week, accompanied by mild dizziness and sensitivity to light',
        dropdownOpen: false,
    },
    {
        name: 'Mfoniso Ukpabio',
        status: 'medium',
        time: '15:00',
        type: 'Follow-up',
        doctor: 'Sarah Wilson',
        reason: 'Patient reports persistent headaches over the past week, accompanied by mild dizziness and sensitivity to light',
        dropdownOpen: false,
    },
    {
        name: 'Abasifreke Nkanang',
        status: 'Normal',
        time: '15:00',
        type: 'Physical therapy',
        doctor: 'Sarah Wilson',
        reason: 'Patient reports persistent headaches over the past week, accompanied by mild dizziness and sensitivity to light',
        dropdownOpen: false,
    },
]);
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('medical-provider/patient-visit/patient-visit?medical_provider=1')
    visits.value = response.data.items
  } catch (err) {
    error.value = 'Failed to fetch visits'
    console.error(err)
  } finally {
    loading.value = false
  }
})

function toggleDropdown(index) {
    visits.forEach((v, i) => {
        v.dropdownOpen = i === index ? !v.dropdownOpen : false;
    });
}

function badgeClass(status) {
    switch (status.toLowerCase()) {
        case 'urgent':
            return 'text-xs px-2 py-0.5 rounded bg-red-100 text-red-800';
        case 'normal':
            return 'text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800';
        case 'medium':
            return 'text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800';
        default:
            return 'text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800';
    }
}
</script>

<style scoped></style>
