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
