<template>
  <div class="space-y-6">
    <!-- Header -->
    <DashboardHeader />

    <!-- Stats -->
    <div class="flex grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <StatsCard title="Today's visit" count="12" completed="8" icon="calendar-plus" class="w-1/4" />
      <StatsCard title="Patients registered" count="32" trend="5" icon="users" class="w-1/4" />
      <StatsCard title="Vitals recorded" count="12" trend="5" icon="activity" class="w-1/4" />
      <StatsCard title="Prescriptions" count="12" trend="5" icon="file-text" class="w-1/4" />
    </div>

    <!-- Main Section -->
    <div class="flex w-full grid-cols-1 lg:grid-cols-2 gap-4">
      <PatientQueue class="w-1/2" />
      <RecentActivities class="w-1/2" />
    </div>
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/medicalProviderAdmin/dashboardPage/DashboardHeader.vue'
import StatsCard from '@/components/medicalProviderAdmin/dashboardPage/StatsCard.vue'
import PatientQueue from '@/components/medicalProviderAdmin/dashboardPage/PatientQueue.vue'
import RecentActivities from '@/components/medicalProviderAdmin/dashboardPage/RecentActivities.vue'
</script>
