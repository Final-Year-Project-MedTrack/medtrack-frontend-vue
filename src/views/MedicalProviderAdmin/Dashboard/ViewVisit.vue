<template>
    <div class="space-y-6">
        <!-- Header -->
         <div v-if="loading" class="text-gray-500">Loading visit information</div>
        <ViewVisitDashboardHeader v-else :patient=visit.patient id="" />

        <!-- Main Section -->
        <div class="flex space-x-4 border-b border-gray-200 mb-4">
            <button 
                v-for="tab in tabs"
                :key="tab.name"
                @click="activeTab = tab.name"
                :class="[
                    'py-2 px-4 font-medium',
                    activeTab === tab.name ? 'border-b-1 text-green-600' : 'text-gray-600'
                ]"
            >
                {{ tab.label }}
            </button>
        </div>

        <div v-if="loading" class="text-gray-500">Loading visit information</div>
        <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>
        <component v-else :is="currentComponent" :admissionStatus=visit.status :patient="visit.patient" />
    </div>
</template>

<script setup>
import {ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/axios'
import ViewVisitDashboardHeader from '@/components/medicalProviderAdmin/visitsPage/ViewVisitDashboardHeader.vue'
import PatientProfile from '@/components/medicalProviderAdmin/visitsPage/PatientProfile.vue'
import VisitOverview from '@/components/medicalProviderAdmin/visitsPage/VisitOverview.vue'
import VitalsHistory from '@/components/medicalProviderAdmin/visitsPage/VitalsHistory.vue'

const route = useRoute()
const visitId = route.params.visitId
const loading = ref(true)
const error = ref(null)
let visit = {
    // id: 1,
    // medical_provider: {},
    patient: {},
    // visit_type: "follow-up",
    // admission_date: "2025-08-02 14:01:01",
    // discharge_date: null,
    // status: "loading"
}

// console.log(route.params.visitId, visitId)

const tabs = [
  { name: 'visit-overview', label: 'Overview', component: VisitOverview, props: '' },
  { name: 'patient-profile', label: 'Profile', component: PatientProfile },
  { name: 'vitals-history', label: 'Vitals History', component: VitalsHistory },
]

const activeTab = ref('visit-overview')

const currentComponent = computed(() => {
  return tabs.find(tab => tab.name === activeTab.value)?.component
})


onMounted(async () => {
  try {
    const response = await api.get(`medical-provider/patient-visit/patient-visit/${visitId}?medical_provider=1`)
    visit = response.data.data
    console.log(visit)
  } catch (err) {
    error.value = 'Failed to fetch Visit Information'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
