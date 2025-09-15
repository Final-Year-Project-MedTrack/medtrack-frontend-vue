<template>
  <div>

    <div class="py-12">
      <div class="right w-auto">
        <router-link :to="{name: 'AccountantDashboardAddDrugs'}"
        class="px-4 py-2 bg-green-600 text-white rounded-md"
        > Add Drug</router-link>
      </div>
    </div>
    <!-- Search + Filter -->
    <div class="flex items-center gap-4 mb-4">
      <input 
        type="text" 
        v-model="search"
        @input="fetchStaffs"
        placeholder="Search here..."
        class="border border-gray-100 px-3 py-2 rounded-md w-1/3"
      />
      <button class="border border-gray-200 px-4 py-2 rounded-md">Filter</button>
    </div>

    <!-- Staff Table -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="text-left border-b border-gray-100">
          <th class="p-2">Name</th>
          <th class="p-2">Type</th>
          <th class="p-2">Price</th>
          <th class="p-2">Quantity</th>
          <th class="p-2">Availability Status</th>
          <th class="p-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drug in drugs" :key="drug.id" class="border-b border-gray-100">
          <td class="p-2 flex items-center gap-2">
            <!-- <img :src="staff.avatar ?? '/default-avatar.png'" class="w-8 h-8 rounded-full" /> -->
            {{ drug.drug.name }}
          </td>
          <td class="p-2">#{{ drug.drug.type }}</td>
          <td class="p-2">{{ drug.price }}</td>
          <td class="p-2">{{ drug.quantity }}</td>
          <td class="p-2">{{ drug.availability_status }}</td>
          <td class="p-2">
            <button 
              class="px-2 text-red-500"
              @click="confirmDelete(drug)"
            >
              Delete
            </button>

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
        class="px-3 py-1 border rounded-md"
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import api from '@/services/axios'
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'

const { proxy } = getCurrentInstance();
const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const drugs = ref([])
const loading = ref(true)
const error = ref(null)
const userStore = useUserStore()


async function fetchLaboratoryTestService() {
  loading.value = true
  try {
    const response = await api.get('medical-provider/medical-provider-laboratory-drugs', {
      params: {
        medical_provider: userStore.selectedProviderId,
        page: page.value,
        search: search.value
      }
    })

    drugs.value = response.data.data.items
    totalPages.value = response.data.data.meta.pagination.total_pages
  } catch (err) {
    error.value = 'Failed to fetch Drug'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function changePage(newPage) {
  page.value = newPage
  fetchLaboratoryTestService()
}


// Delete Laboratory Test with confirmation
async function confirmDelete(laboratoryTest) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete ${laboratoryTest.laboratoryTest.name}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`medical-provider/medical-provider-laboratory-test/${laboratoryTest.id}`)
      Swal.fire('Deleted!', 'Drug has been deleted.', 'success')
      fetchLaboratoryTestService()
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to delete Drug.', 'error')
    }
  }
}

onMounted(fetchLaboratoryTestService)
</script>
