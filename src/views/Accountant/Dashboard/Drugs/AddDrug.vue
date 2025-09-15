<template>
  <div class="p-6 max-w-lg mx-auto">
    <!-- Search Drug -->
    <div>
      <label class="block font-semibold mb-1">Search Drugs</label>
      <input
        v-model="searchQuery"
        @input="searchDrugs"
        type="text"
        placeholder="Type Drug name or brand..."
        class="border rounded w-full px-3 py-2"
      />

      <ul v-if="searchResults.length" class="border rounded mt-2 divide-y">
        <li
          v-for="drug in searchResults"
          :key="drug.id"
          @click="selectDrug(drug)"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ drug.name }}
        </li>
      </ul>
    </div>

    <!-- Selected Drug -->
    <div v-if="selectedDrug" class="mt-6">
      <h3 class="text-lg font-semibold mb-2">
        Selected: {{ selectedDrug.name }}
      </h3>

      <div class="mb-4">
        <label class="block mb-1">Price</label>
        <input
          v-model="form.price"
          type="number"
          placeholder="Enter price"
          class="border rounded w-full px-3 py-2"
        />
      </div>

      <div class="mb-4">
      <input
          v-model="form.quantity"
          type="number"
          placeholder="Enter Quantity"
          class="border rounded w-full px-3 py-2"
        />
      </div>

      <div class="mb-4 flex items-center space-x-2">
        <input
          id="availability"
          type="checkbox"
          v-model="form.availabilty_status"
        />
        <label for="availability">Available</label>
      </div>

      <button
        @click="save"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
// import axios from 'axios'
import axios from '@/services/axios'
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'

const { proxy } = getCurrentInstance();

const userStore = useUserStore()

const searchQuery = ref('')
const searchResults = ref([])
const selectedDrug = ref(null)

const form = ref({
  drug_id: null,
  medical_provider_id: userStore.selectedProviderId, // <-- replace with the real provider ID (maybe from auth)
  price: '',
  quantity: '',
  availabilty_status: false
})

const loading = ref(false)

const searchDrugs = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  try {
    const { data } = await axios.get('/drug', {
      params: { search: searchQuery.value }
    })
    searchResults.value = data.data.items
  } catch (err) {
    console.error(err)
  }
}

const selectDrug = (drug) => {
  selectedDrug.value = drug
  form.value.drug_id = drug.id
  searchResults.value = []
  searchQuery.value = drug.name
}

const save = async () => {
  loading.value = true
  try {
    await axios.post(
      '/medical-provider/medical-provider-laboratory-drugs',
      {
        ...form.value,
        availabilty_status: form.value.availabilty_status ? 1 : 0
      }
    )
    Swal.fire('Added!', 'Drug has been added successfully.', 'success')
    // reset
    selectedDrug.value = null
    form.value.price = ''
    form.value.availabilty_status = false
    searchQuery.value = ''
  } catch (err) {
    Swal.fire('Error!', err.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>
