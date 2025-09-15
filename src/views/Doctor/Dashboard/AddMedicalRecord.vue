<template>
  <div class="space-y-6">
    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-4 bg-white p-6 rounded-2xl shadow-md">
      <h2 class="text-lg font-semibold">Add Medical Record</h2>

      <!-- Record Type -->
      <div>
        <label class="block text-sm font-medium mb-1">Record Type</label>
        <select
          v-model="form.record_type"
          class="w-full border border-gray-100 rounded-lg p-2"
          required
        >
          <option value="" disabled>Select a type</option>
          <option v-for="type in recordTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <!-- Record Data -->
      <div>
        <label class="block text-sm font-medium mb-1">Record Data</label>
        <textarea
          v-model="form.record_data"
          rows="4"
          class="w-full border border-gray-100 rounded-lg p-2"
          required
        ></textarea>
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-sm font-medium mb-1">Comment</label>
        <textarea
          v-model="form.comment"
          rows="2"
          class="w-full border border-gray-100 rounded-lg p-2"
        ></textarea>
      </div>

      <!-- File Upload -->
      <div>
        <label class="block text-sm font-medium mb-1">Attach File (PDF/Image)</label>
        <input
          type="file"
          @change="handleFileChange"
          accept=".jpg,.jpeg,.png,.pdf"
          class="w-full border border-gray-100 rounded-lg p-2"
        />
        <div v-if="filePreview" class="mt-2">
          <span class="text-xs text-gray-500">Preview:</span>
          <div v-if="isImage" class="mt-1">
            <img :src="filePreview" alt="preview" class="h-24 rounded border" />
          </div>
          <div v-else class="mt-1 text-blue-600 underline">
            PDF selected
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-3">
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : 'Save Record' }}
        </button>
        <span v-if="error" class="text-red-600 text-sm">{{ error }}</span>
      </div>
    </form>

    <!-- Table of Records -->
    <div v-if="records.length" class="bg-white p-6 rounded-2xl shadow-md">
      <h3 class="text-md font-semibold mb-3">Medical Records</h3>
      <table class="w-full border-collapse border text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Type</th>
            <th class="border p-2 text-left">Data</th>
            <th class="border p-2 text-left">Comment</th>
            <th class="border p-2 text-left">File</th>
            <th class="border p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rec, index) in records" :key="index">
            <td class="border p-2">{{ rec.record_type }}</td>
            <td class="border p-2">{{ rec.record_data }}</td>
            <td class="border p-2">{{ rec.comment }}</td>
            <td class="border p-2">
              <a v-if="rec.record_file" :href="`/storage/${rec.file_path}`" target="_blank" class="text-blue-600 underline">
                View File
              </a>
            </td>
            <td class="border p-2">{{ new Date(rec.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import api from "@/services/axios";
import { useUserStore } from '@/store/user'

const route = useRoute()
const userStore = useUserStore()

// route params
const patientId = route.params.patientId
const visitId = route.params.visitId

const recordTypes = [
  { value: 'diagnosis', label: 'Diagnosis' },
  // { value: 'lab result', label: 'Lab Result' },
  { value: 'prescription', label: 'Prescription' },
  { value: 'visit note', label: 'Visit Note' },
]

const form = reactive({
  record_type: '',
  record_data: '',
  comment: '',
})

const file = ref(null)
const filePreview = ref(null)
const isImage = ref(false)

// store saved records
const records = ref([])

// loading & error state
const loading = ref(false)
const error = ref(null)

// handle file
const handleFileChange = (e) => {
  file.value = e.target.files[0]
  if (file.value) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      filePreview.value = ev.target.result
      isImage.value = file.value.type.startsWith("image/")
    }
    reader.readAsDataURL(file.value)
  }
}

const submitForm = async () => {
  error.value = null
  loading.value = true

  try {
    const formData = new FormData()
    formData.append('patient_id', patientId)
    formData.append('patient_visit_id', visitId)
    formData.append('record_type', form.record_type)
    formData.append('record_data', form.record_data)
    formData.append('comment', form.comment)
    formData.append('created_by_user_id', userStore.user.id)

    if (file.value) {
      formData.append('record_file', file.value)
    }

    const response = await api.post('patient-medical-record/patient-medical-record', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    records.value.push(response.data.data)

    // reset form
    form.record_type = ''
    form.record_data = ''
    form.comment = ''
    file.value = null
    filePreview.value = null
    isImage.value = false
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save record'
  } finally {
    loading.value = false
  }
}
</script>
