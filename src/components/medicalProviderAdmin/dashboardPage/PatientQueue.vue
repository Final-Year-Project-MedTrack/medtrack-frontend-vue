<template>
  <div class="p-4 border border-gray-100 rounded-xl space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="font-medium">👥 Patient Queue (5)</h2>
      <button class="text-green-700 text-sm">View all</button>
    </div>
    <div v-for="(p, i) in patients" :key="i" class="bg-gray-50 p-3 rounded-md flex justify-between items-center">
      <div>
        <div class="font-medium">{{ p.name }}</div>
        <div class="text-sm text-gray-500">{{ p.time }} • {{ p.purpose }} • {{ p.id }}</div>
      </div>
      <StatusBadge :status="p.status" />
    </div>
    <button class="w-full text-sm text-gray-700 border-t pt-2">View all</button>
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'

const patients = [
  { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Checked In' },
  { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Waiting' },
  { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Cancelled' },
  { name: 'Sarah Wilson', time: '11:00 AM', purpose: 'Follow-up', id: 'P001', status: 'Scheduled' },
]
</script>
