<template>
  <div class="p-4 border border-gray-100 rounded-xl space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="font-medium">👥 Patient Queue (5)</h2>
      <button class="text-green-700 text-sm">View all</button>
    </div>
    <div v-for="(p, i) in patients" :key="i" class="bg-gray-50 p-3 rounded-md flex justify-between items-center">
      <div>
        <div class="font-medium">{{ p.patient.user.first_name }}</div>
        <div class="text-sm text-gray-500">{{ timeAgo(p.created_at) }} • {{ p.visit_type }} • {{ p.id }}</div>
      </div>
      <StatusBadge :status="p.status" />
    </div>
    <router-link :to="{name: 'MedicalProviderDashboardVisits'}" class="w-full text-sm text-gray-700 border border-gray-300 py-4">
      <button class="w-full text-sm text-gray-700 py-4"> 
        View all
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/services/axios'
import { useUserStore } from '@/store/user'
import StatusBadge from './StatusBadge.vue'


const userStore = useUserStore()
const patients = ref([]);

// const patients = [
//   { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Checked In' },
//   { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Waiting' },
//   { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Cancelled' },
//   { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Scheduled' },
// ]



onMounted(async () => {
  try {
    const response = await api.get(`medical-provider/patient-visit/patient-visit?medical_provider=${userStore.selectedProviderId}`)
    patients.value = response.data.data.items.map((v) => ({
      ...v,
      dropdownOpen: false,
    }))

    // console.log(visits, response.data.items)
  } catch (err) {
    err.value = 'Failed to fetch visits'
  } finally {
    loading.value = false
  }
})

function timeAgo(dateString) {
      const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

      let interval = seconds / 31536000; // years
      if (interval > 1) return Math.floor(interval) + " years ago";

      interval = seconds / 2592000; // months
      if (interval > 1) return Math.floor(interval) + " months ago";

      interval = seconds / 86400; // days
      if (interval > 1) return Math.floor(interval) + " days ago";

      interval = seconds / 3600; // hours
      if (interval > 1) return Math.floor(interval) + " hours ago";

      interval = seconds / 60; // minutes
      if (interval > 1) return Math.floor(interval) + " minutes ago";

      return Math.floor(seconds) + " seconds ago";
    // }
  }
</script>
