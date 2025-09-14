<template>
  <div class="space-y-6">
    <!-- Header -->



    <div v-if="loading" role="status"
      class="w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 ">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 18">
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>


    <ViewVisitDashboardHeader v-else :patient="visit.patient" id="" />

    <!-- Main Section -->
    <div class="flex space-x-4 border-b border-gray-200 mb-4">
      <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="goToTab(tab)"
          :class="[
            'py-2 px-4 font-medium',
            $route.name === tab.name
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-600'
          ]"
        >
          {{ tab.label }}
        </button>
    </div>

    <div v-if="loading" class="text-gray-500">

      <div role="status" class="w-3/4 animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span class="sr-only">Loading Visit Information...</span>
      </div>
    </div>
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>
    <!-- <component v-else :is="currentComponent" :visit=visit :patient="visit.patient" /> -->
    <router-view v-else :visit="visit" :patient="visit.patient" />
      <!-- <router-view v-slot="{ Component }">
        <component
        :is="Component"
        v-if="Component"
        :visit="visit"
        :patient="visit.patient"
        />
      </router-view> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/axios'
import ViewVisitDashboardHeader from '@/components/medicalProviderAdmin/visitsPage/ViewVisitDashboardHeader.vue'
import VisitOverview from '@/components/medicalProviderAdmin/visitsPage/VisitOverview.vue'
import MedicalRecords from '@/components/medicalProviderAdmin/medicalRecord/FetchMedicalRecordsWithLabResult.vue'

const route = useRoute()
const router = useRouter()
const visitId = route.params.visitId
const loading = ref(true)
const error = ref(null)
let visit = {
  patient: {},
}

const tabs = [
  { name: 'RadiologistDashboardViewVisitWithLabResultsOverview', label: 'Overview' },
  // { name: 'medical-record', label: 'Medical Record' },
  { name: 'RadiologistDashboardViewVisitWithLabResultsLabTest', label: 'Lab Test' },
]

function goToTab(tab) {
  router.push({ name: tab.name })
}

// Simulate data loading
// setTimeout(() => {
//   loading.value = false
// }, 1500)


onMounted(async () => {
  try {
    const response = await api.get(`medical-provider/patient-visit/patient-visit/${visitId}?medical_provider=1`)
    visit = response.data.data
    // console.log(visit)
  } catch (err) {
    error.value = 'Failed to fetch Visit Information'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
