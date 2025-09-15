<template>
  <div class="space-y-6">
    <!-- Header -->
    <DashboardHeader />

    <!-- Stats -->
    <div class="flex grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <StatsCard title="Today's visit" :count="todayVisitCount" completed="0" icon="calendar-plus" class="w-1/4" />
      <StatsCard title="Patients registered" :count="patientRegisteredCount" trend="5" icon="users" class="w-1/4" />
      <StatsCard title="Vitals recorded" :count="vitalRecordedCount" trend="5" icon="activity" class="w-1/4" />
      <StatsCard title="Prescriptions" :count="prescriptionsCount" trend="5" icon="file-text" class="w-1/4" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import DashboardHeader from '@/components/doctor/dashboardPage/DashboardHeader.vue'
import StatsCard from '@/components/medicalProviderAdmin/dashboardPage/StatsCard.vue'
import PatientQueue from '@/components/medicalProviderAdmin/dashboardPage/PatientQueue.vue'
import RecentActivities from '@/components/medicalProviderAdmin/dashboardPage/RecentActivities.vue'


import api from '@/services/axios'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const todayVisitCount = ref(0)
const patientRegisteredCount = ref(0)
const vitalRecordedCount = ref(0)
const prescriptionsCount = ref(0)

onMounted(async () => {
  try {
    const response = await api.get(`medical-provider/medical-provider-dashboard-metrics?medical_provider=${userStore.selectedProviderId}`)

    todayVisitCount.value = response.data.data.todayVisitCount
    patientRegisteredCount.value = response.data.data.patientRegisteredCount
    vitalRecordedCount.value = response.data.data.vitalRecordedCount
    prescriptionsCount.value = response.data.data.prescriptionsCount
    
  } catch (err) {
    // error.value = 'Failed to fetch visits'
    console.error(err)
  } finally {
  }
})
</script>
