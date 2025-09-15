<template>
  <div class="p-6 max-w-lg mx-auto">
    <!-- Search Drug -->
    <div>
      <label class="block font-semibold mb-1">Search Drug</label>
      <input
        v-model="searchQuery"
        @input="searchDrugs"
        type="text"
        placeholder="Type Drug name..."
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

    <div v-if="selectedDrug" class="mt-6 space-y-4">
      <h3 class="text-lg font-semibold">Selected: {{ selectedDrug.name }}</h3>

      <div>
        <label class="block mb-1">period</label>
        <!-- <select v-model="form.status" class="border rounded w-full px-3 py-2">
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="filled">Filled</option>
        </select> -->
        <input type="text" class="border rounded w-full px-3 py-2" v-model="form.period">
      </div>

      <div>
        <label class="block mb-1">Quantity</label>
        <input type="number" class="border rounded w-full px-3 py-2" v-model="form.quantity">
      </div>

      <div>
        <label class="block mb-1">Comment</label>
        <textarea v-model="form.description" class="border rounded w-full px-3 py-2"></textarea>
      </div>

      <button
        @click="save"
        :disabled="loading"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/axios'
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'

const searchQuery = ref('')
const searchResults = ref([])
const selectedDrug = ref(null)

const route = useRoute()
const visitId = route.params.visitId
// const visitLabTestId = route.params.visitLabTestId
const userStore = useUserStore()

const form = ref({
  patient_id: route.params.patientId,
  patient_visit_id: visitId,
  drug_id: null,
  period: '',
  quantity: '',
  description: '',
//   created_by_user_id: userStore.user.id // get from auth/session
})

const loading = ref(false)

const searchDrugs = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  try {
    const { data } = await api.get('/drug', {
      params: { query: searchQuery.value }
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
}

const save = async () => {
  try {
    loading.value = true
    await api.post('medical-provider/patient-visit/patient-visit-prescriptions', form.value)
    Swal.fire('Prescription Added!', 'Patient visit prescription added!', 'success')
    // alert('Patient visit prescription added!')
  } catch (err) {
    // console.error(err)
    Swal.fire('Error', 'Unable to add Prescription.', 'error')
  } finally {
    loading.value = false
  }
}
</script>
