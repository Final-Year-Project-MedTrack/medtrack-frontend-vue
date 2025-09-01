<template>
  <div>
    <!-- Search + Filter -->
    <div class="flex items-center gap-4 mb-4">
      <input 
        type="text" 
        v-model="search"
        @input="fetchDoctors"
        placeholder="Search here..."
        class="border px-3 py-2 rounded-md w-1/3"
      />
      <button class="border px-4 py-2 rounded-md">Filter</button>
    </div>

    <!-- Staff Table -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="text-left border-b border-gray-100">
          <th class="p-2">Name</th>
          <th class="p-2">ID</th>
          <th class="p-2">Email</th>
          <th class="p-2">Role</th>
          <th class="p-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff.id" class="border-b border-gray-100">
          <td class="p-2 flex items-center gap-2">
            <!-- <img :src="staff.avatar ?? '/default-avatar.png'" class="w-8 h-8 rounded-full" /> -->
            {{ staff.user.first_name }}
          </td>
          <td class="p-2">#{{ staff.id }}</td>
          <td class="p-2">{{ staff.user.email }}</td>
          <td class="p-2">{{ staff.role ?? 'N/A' }}</td>
          <td class="p-2">
            <button class="px-2">...</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button 
        class="px-3 py-1 border border-gray-100 rounded-md"
        :disabled="page <= 1"
        @click="changePage(page - 1)"
      >
        Previous
      </button>

      <div>Page {{ page }} of {{ totalPages }}</div>

      <button 
        class="px-3 py-1 border border-gray-100 rounded-md"
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/axios'
import { useUserStore } from '@/store/user'

const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const staffs = ref([])
const loading = ref(true)
const error = ref(null)
const userStore = useUserStore()

async function fetchDoctors() {
  loading.value = true
  try {
    const response = await api.get('medical-provider/doctor', {
      params: {
        medical_provider: userStore.selectedProviderId,
        page: page.value,
        search: search.value
      }
    })

    staffs.value = response.data.data.items
    totalPages.value = response.data.data.meta.pagination.total_pages
  } catch (err) {
    error.value = 'Failed to fetch Doctors'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function changePage(newPage) {
  page.value = newPage
  fetchDoctors()
}

onMounted(fetchDoctors)
</script>
