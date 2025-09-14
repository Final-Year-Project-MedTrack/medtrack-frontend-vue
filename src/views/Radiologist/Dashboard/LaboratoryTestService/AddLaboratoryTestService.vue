<template>
  <div class="p-6 max-w-lg mx-auto">
    <!-- Search Laboratory Test -->
    <div>
      <label class="block font-semibold mb-1">Search Laboratory Test</label>
      <input
        v-model="searchQuery"
        @input="searchTests"
        type="text"
        placeholder="Type test name..."
        class="border rounded w-full px-3 py-2"
      />

      <ul v-if="searchResults.length" class="border rounded mt-2 divide-y">
        <li
          v-for="test in searchResults"
          :key="test.id"
          @click="selectTest(test)"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ test.name }}
        </li>
      </ul>
    </div>

    <!-- Selected Laboratory Test -->
    <div v-if="selectedTest" class="mt-6">
      <h3 class="text-lg font-semibold mb-2">
        Selected: {{ selectedTest.name }}
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
const selectedTest = ref(null)

const form = ref({
  laboratory_test_id: null,
  medical_provider_id: userStore.selectedProviderId, // <-- replace with the real provider ID (maybe from auth)
  price: '',
  availabilty_status: false
})

const loading = ref(false)

const searchTests = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  try {
    const { data } = await axios.get('/laboratory-test', {
      params: { search: searchQuery.value }
    })
    searchResults.value = data.data.items
  } catch (err) {
    console.error(err)
  }
}

const selectTest = (test) => {
  selectedTest.value = test
  form.value.laboratory_test_id = test.id
  searchResults.value = []
  searchQuery.value = test.name
}

const save = async () => {
  loading.value = true
  try {
    await axios.post(
      '/medical-provider/medical-provider-laboratory-test',
      {
        ...form.value,
        availabilty_status: form.value.availabilty_status ? 1 : 0
      }
    )
    // alert('Laboratory test added successfully!')
    Swal.fire('Added!', 'Laboratory Test has been added successfully.', 'success')
    // reset
    selectedTest.value = null
    form.value.price = ''
    form.value.availabilty_status = false
    searchQuery.value = ''
  } catch (err) {
    console.error(err)
    alert('Error saving laboratory test')
  } finally {
    loading.value = false
  }
}
</script>
