<template>
  <div class="p-6 max-w-lg mx-auto">
    <!-- Search Lab Test -->
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

    <div v-if="selectedTest" class="mt-6 space-y-4">
      <h3 class="text-lg font-semibold">Selected: {{ selectedTest.name }}</h3>

      <div>
        <label class="block mb-1">Patient ID</label>
        <input v-model="form.patient_id" class="border rounded w-full px-3 py-2" />
      </div>

      <div>
        <label class="block mb-1">Patient Visit ID</label>
        <input v-model="form.patient_visit_id" class="border rounded w-full px-3 py-2" />
      </div>

      <div>
        <label class="block mb-1">Status</label>
        <select v-model="form.status" class="border rounded w-full px-3 py-2">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label class="block mb-1">Comment</label>
        <textarea v-model="form.comment" class="border rounded w-full px-3 py-2"></textarea>
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
import { ref } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const searchResults = ref([])
const selectedTest = ref(null)

const form = ref({
  patient_id: '',
  patient_visit_id: '',
  laboratory_test_id: null,
  status: '',
  comment: '',
  created_by_user_id: 123 // get from auth/session
})

const loading = ref(false)

const searchTests = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  try {
    const { data } = await axios.get('/laboratory-test', {
      params: { query: searchQuery.value }
    })
    searchResults.value = data
  } catch (err) {
    console.error(err)
  }
}

const selectTest = (test) => {
  selectedTest.value = test
  form.value.laboratory_test_id = test.id
  searchResults.value = []
}

const save = async () => {
  try {
    loading.value = true
    await axios.post('/patient-visit-laboratory-test', form.value)
    alert('Patient visit laboratory test added!')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
