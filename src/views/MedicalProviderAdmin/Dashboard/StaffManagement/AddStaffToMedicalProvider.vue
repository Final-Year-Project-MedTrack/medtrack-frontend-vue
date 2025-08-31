<template>
  <div class="relative w-full">
    <!-- Search input -->
    <input
      v-model="search"
      type="text"
      placeholder="Search by NIN or name"
      class="border p-2 w-full rounded"
      @focus="showDropdown = userResults.length > 0"
      @blur="hideDropdown"
    />

    <!-- Search results dropdown -->
    <ul
      v-if="showDropdown && userResults.length"
      class="absolute z-10 bg-white border mt-1 w-full rounded shadow max-h-48 overflow-y-auto"
    >
      <li
        v-for="user in userResults"
        :key="user.id"
        @mousedown.prevent="selectUser(user)" 
        class="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ user.national_id }} — {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>

    <!-- Selected User + Priority -->
    <div v-if="selectedUser" class="mt-3 space-y-2">
      <div>
        <strong>Selected:</strong>
        {{ selectedUser.first_name }} {{ selectedUser.last_name }}
        ({{ selectedUser.national_id }})
      </div>

      <select v-model="priority" class="border p-2 rounded w-full" @click.stop>
        <option value="" disabled>Select priority</option>
        <option value="1">1 (Highest)</option>
        <option value="2">2</option>
        <option value="3">3 (Lowest)</option>
      </select>
    </div>

    <!-- Submit button -->
    <button
      @click="addStaff"
      class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
      :disabled="!selectedUser || !priority"
    >
      Add Staff
    </button>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import api from '@/services/axios'
import { useUserStore } from '@/store/user'

const { proxy } = getCurrentInstance();
const userStore = useUserStore()
const search = ref('')
const userResults = ref([])
const selectedUser = ref(null)
const priority = ref(null)
const showDropdown = ref(false)

let timeout = null

// Debounced search for users
watch(search, (newSearch) => {
  clearTimeout(timeout)
  if (newSearch.length < 2) {
    userResults.value = []
    showDropdown.value = false
    return
  }

  timeout = setTimeout(async () => {
    try {
      const { data } = await api.get('/users/search', {
        params: { q: newSearch }
      })
      userResults.value = Array.isArray(data) ? data : data.data
      showDropdown.value = true
    } catch (error) {
      console.error('Failed to search users', error)
    }
  }, 300)
})

// select user
function selectUser(user) {
  selectedUser.value = user
  search.value = `${user.first_name} ${user.last_name}`
  showDropdown.value = false
}

// hide dropdown on blur
function hideDropdown() {
  setTimeout(() => {
    showDropdown.value = false
  }, 200) // delay so clicks inside the dropdown still register
}

// submit staff to medical provider
async function addStaff() {
  if (!selectedUser.value || !priority.value) return

  try {
    await api.post('/medical-provider/medical-provider-user', {
      user_id: selectedUser.value.id,
      priority: priority.value,
      medical_provider_id: userStore.selectedProviderId
    })

    alert('Staff added successfully!')
    proxy.$swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Staff added successfully!',
        timer: 3000,
        timerProgressBar: true,
      });

    search.value = ''
    userResults.value = []
    selectedUser.value = null
    priority.value = null
    showDropdown.value = false
  } catch (error) {
    console.error('Error adding staff', error)
    alert('Error adding staff')
    proxy.$swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error Adding Staff '+ error.response.data.message,
        timer: 3000,
        timerProgressBar: true,
      });
  }
}
</script>
