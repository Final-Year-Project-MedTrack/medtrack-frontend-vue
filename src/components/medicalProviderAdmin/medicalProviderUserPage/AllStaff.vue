<template>
  <div>
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
            {{ staff.user.first_name+' '+staff.user.last_name }}
          </td>
          <td class="p-2">#{{ staff.id }}</td>
          <td class="p-2">{{ staff.user.email }}</td>
          <td class="p-2">{{ priority[staff.priority] ?? 'N/A' }}</td>
          <td class="p-2">
            <!-- <button class="px-2">...</button> -->
             <button 
              class="px-2 text-blue-500"
              @click="openPriorityModal(staff)"
            >
              Change Priority
            </button>
            <button 
              class="px-2 text-red-500"
              @click="confirmDelete(staff)"
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


  <!-- Priority Modal -->
    <div 
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-lg font-semibold mb-4">Change Priority</h2>
        <select v-model="selectedPriority" class="border rounded-md p-2 w-full">
          <option 
            v-for="(label, value) in priority" 
            :key="value" 
            :value="value"
          >
            {{ label }}
          </option>
        </select>
        <div class="flex justify-end gap-2 mt-4">
          <button 
            class="px-4 py-2 border rounded-md"
            @click="closeModal"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-green-600 text-white rounded-md"
            @click="updatePriority"
          >
            Save
          </button>
        </div>
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
const staffs = ref([])
const loading = ref(true)
const error = ref(null)
const userStore = useUserStore()
const priority = {
  1: 'Admin',
  2: 'Nurse',
  3: 'Lab Attendant',
  4: 'Radiologist',
  5: 'Non Medical Personnel',
  6: 'Accountant'
}

// Modal state
const showModal = ref(false)
const selectedStaff = ref(null)
const selectedPriority = ref(null)

async function fetchStaffs() {
  loading.value = true
  try {
    const response = await api.get('medical-provider/medical-provider-user', {
      params: {
        medical_provider: userStore.selectedProviderId,
        page: page.value,
        search: search.value
      }
    })

    staffs.value = response.data.data.items
    totalPages.value = response.data.data.meta.pagination.total_pages
  } catch (err) {
    error.value = 'Failed to fetch Staff'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function changePage(newPage) {
  page.value = newPage
  fetchStaffs()
}

// Open modal
function openPriorityModal(staff) {
  selectedStaff.value = staff
  selectedPriority.value = staff.priority
  showModal.value = true
}

// Close modal
function closeModal() {
  showModal.value = false
  selectedStaff.value = null
  selectedPriority.value = null
}

// Save new priority
async function updatePriority() {
  try {
    await api.put(`medical-provider/medical-provider-user/${selectedStaff.value.id}`, {
      user_id: selectedStaff.value.user.id,
      medical_provider_id: userStore.selectedProviderId,
      priority: selectedPriority.value
    })
    Swal.fire('Updated!', 'Priority has been updated.', 'success')
    fetchStaffs()
    closeModal()
  } catch (err) {
    console.error(err)
    Swal.fire('Error', 'Failed to update priority.', 'error')
  }
}

// Delete staff with confirmation
async function confirmDelete(staff) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete ${staff.user.first_name}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`medical-provider/medical-provider-user/${staff.id}`)
      Swal.fire('Deleted!', 'Staff has been deleted.', 'success')
      fetchStaffs()
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to delete staff.', 'error')
    }
  }
}

onMounted(fetchStaffs)
</script>
