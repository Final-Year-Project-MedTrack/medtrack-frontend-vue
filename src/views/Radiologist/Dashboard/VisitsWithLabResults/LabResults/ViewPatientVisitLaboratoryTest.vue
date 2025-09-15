<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <h2 class="text-2xl font-bold mb-4">
      <!-- Patient Visit Laboratory Test: {{ test?.laboratoryTest?.name }} -->
    </h2>

    <!-- Basic Info -->
    <div class="border border-gray-100 rounded p-4 mb-6">
      <p><strong>Patient:</strong> {{ visit.patient.user.first_name + ' ' + visit.patient.user.last_name }}</p>
      <p><strong>Status:</strong> {{ test?.status }}</p>
      <p><strong>Comment:</strong> {{ test?.comment }}</p>
    </div>

    <!-- Data Table -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-2">Test Data</h3>
      <table class="min-w-full border border-gray-100">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-2 border border-gray-100">Key</th>
            <th class="p-2 border border-gray-100">Value</th>
            <th class="p-2 border border-gray-100">Comment</th>
            <!-- <th class="p-2 border border-gray-100">Diagnosed By</th> -->
            <th class="p-2 border border-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in testData" :key="data.id">
            <td class="border border-gray-100 p-2">{{ data.record_data_key }}</td>
            <td class="border border-gray-100 p-2">{{ data.record_data_value }}</td>
            <td class="border border-gray-100 p-2">{{ data.comment }}</td>
            <!-- <td class="border border-gray-100 p-2">{{ data.diagnosed_by_user?.name }}</td> -->
            <td class="border border-gray-100 p-2">
              <button @click="deleteData(data.id)" class="text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="!testData.length">
            <td colspan="4" class="text-center text-gray-500 p-4">
              No data yet
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Data Form -->
    <div class="border border-gray-100 rounded p-4 mb-6">
      <h3 class="font-semibold mb-2">Add Test Data</h3>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="newData.record_data_key" placeholder="Key" class="border border-gray-100 rounded px-3 py-2" />
        <input v-model="newData.record_data_value" placeholder="Value"
          class="border border-gray-100 rounded px-3 py-2" />
      </div>
      <textarea v-model="newData.comment" placeholder="Comment"
        class="border border-gray-100 rounded px-3 py-2 w-full mt-2"></textarea>
      <button @click="addData" :disabled="loadingData"
        class="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700">
        {{ loadingData ? 'Saving...' : 'Add Data' }}
      </button>
    </div>

    <!-- Files Section -->
    <div>
      <h3 class="text-xl font-semibold mb-2">Attached Files</h3>
      <ul class="list-disc ml-5 mb-2">
        <li v-if="!testFiles.length" class="text-gray-500">No files yet</li>
        <!-- <li v-else v-for="file in testFiles" :key="file.id">
          <a v-if="file.record_file" :href="file.record_file" target="_blank" class="text-blue-600 underline">
            {{ file.record_file.split('/').pop() }}
          </a>
          <FileViewer v-if="file.record_file" :fileUrl=file.record_file />
        </li> -->
        <div v-else class="row flex-row">
          <FileViewer  v-for="file in testFiles" :key="file.id" :fileUrl=file.record_file class="m-4" />
        </div>
      </ul>

      <button @click="showFileModal = true" class="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700">
        Upload File
      </button>
    </div>

    <!-- File Upload Modal -->
    <div v-if="showFileModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 class="text-lg font-semibold mb-2">Upload Files</h3>

        <input type="file" multiple @change="handleFileChange" class="border rounded px-3 py-2 w-full" />

        <div class="mt-4 flex justify-end space-x-2">
          <button @click="showFileModal = false" class="px-3 py-1 rounded border">
            Cancel
          </button>
          <button @click="uploadFiles" :disabled="loadingFile" class="bg-green-600 text-white px-4 py-2 rounded">
            {{ loadingFile ? 'Uploading...' : 'Upload' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/services/axios'
import { useUserStore } from '@/store/user'
import FileViewer from '@/components/FileViewer.vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const props = defineProps({
  title: String,
  count: String,
  completed: String,
  trend: String,
  icon: String,
  visit: Object
})
const visitId = route.params.visitId
const visitLabTestId = route.params.visitLabTestId

const test = ref([])
const testData = ref([])
const testFiles = ref([])
const initialData = {
  patient_visit_laboratory_test_id: visitLabTestId,
  record_data_key: '',
  record_data_value: '',
  comment: '',
  created_by_user_id: userStore.user.id,
  diagnosed_by_user_id: userStore.user.id
}

const newData = reactive({ ...initialData })

const loadingData = ref(false)
const loadingFile = ref(false)
const selectedFiles = ref(null)
const showFileModal = ref(false)

const loadTest = async () => {
  const { data } = await axios.get(`/medical-provider/patient-visit/patient-visit-laboratory-test/${visitLabTestId}`, {
    params: {
      visit_id: visitId
    }
  })
  test.value = data.data
}

const loadData = async () => {
  const { data } = await axios.get(`/medical-provider/patient-visit/patient-visit-lab-test-data`, {
    params: { patientVisitLaboratoryTestId: visitLabTestId }
  })
  testData.value = data.data.items
}

const loadFiles = async () => {
  const { data } = await axios.get(`/medical-provider/patient-visit/patient-visit-lab-test-files`, {
    params: { patientVisitLaboratoryTestId: visitLabTestId }
  })
  testFiles.value = data.data.items
}

const addData = async () => {
  loadingData.value = true
  try {
    await axios.post(
      '/medical-provider/patient-visit/patient-visit-lab-test-data',
      newData
    )
    await loadData()
    // clearForm()
  } finally {
    loadingData.value = false
  }
}

const handleFileChange = (e) => {
  selectedFiles.value = Array.from(e.target.files)
}

const uploadFiles = async () => {
  if (!selectedFiles.value.length) return
  loadingFile.value = true

  const formData = new FormData()
  formData.append('patient_visit_laboratory_test_id', visitLabTestId)
  selectedFiles.value.forEach(file => {
    formData.append('record_files[]', file)
  })

  try {
    await axios.post(
      '/medical-provider/patient-visit/patient-visit-lab-test-files',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    await loadFiles() // reload your list of files
    selectedFiles.value = []
    showFileModal.value = false
  } catch (error) {
    console.error(error)
  } finally {
    loadingFile.value = false
  }
}

const deleteData = async (id) => {
  if (!confirm('Are you sure you want to delete this data?')) return

  try {
    await axios.delete(`/medical-provider/patient-visit/patient-visit-lab-test-data/${id}`)
    await loadData() // refresh the table
  } catch (error) {
    console.error(error)
  }
}

const clearForm = () => {
  Object.assign(newData, initialData)
}

onMounted(async () => {
  await loadTest()
  await loadData()
  await loadFiles()
})
</script>
