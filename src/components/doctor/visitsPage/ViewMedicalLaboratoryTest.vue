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
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in testData" :key="data.id">
            <td class="border border-gray-100 p-2">{{ data.record_data_key }}</td>
            <td class="border border-gray-100 p-2">{{ data.record_data_value }}</td>
            <td class="border border-gray-100 p-2">{{ data.comment }}</td>
            <!-- <td class="border border-gray-100 p-2">{{ data.diagnosed_by_user?.name }}</td> -->
          </tr>
          <tr v-if="!testData.length">
            <td colspan="4" class="text-center text-gray-500 p-4">
              No data yet
            </td>
          </tr>
        </tbody>
      </table>
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


onMounted(async () => {
  await loadTest()
  await loadData()
  await loadFiles()
})
</script>
