<template>
  <div class="p-4 border border-gray-100 rounded-xl space-y-4">
    <h2 class="font-medium">🕒 Recent activities</h2>
    <div v-for="(a, i) in activities" :key="i" class="flex gap-2">
      <div class="mt-1">
        <div :class="dotClass(a.type)" class="h-2 w-2 rounded-full"></div>
      </div>
      <div class="text-sm">
        <div class="font-medium">{{ a.title }}</div>
        <div class="text-gray-500 text-xs">{{ a.description }}</div>
        <div class="text-gray-400 text-xs">{{ a.date }} • {{ a.timeAgo }}</div>
      </div>
    </div>
    <button class="w-full text-sm text-gray-700 border-t pt-2">View all activities</button>
  </div>
</template>

<script setup>
const activities = [
  {
    title: 'New patient registered',
    description: 'Metro General Hospital - Cardiology Department',
    date: '11 May, 2025',
    timeAgo: '2 hours ago',
    type: 'primary',
  },
  {
    title: 'Vitals recorded',
    description: 'Dr. Sarah Johnson - City Medical Center',
    date: '11 May, 2025',
    timeAgo: '2 hours ago',
    type: 'yellow',
  },
  {
    title: 'Visit checked in',
    description: 'Q4 2024 Healthcare Compliance Summary',
    date: '11 May, 2025',
    timeAgo: '2 hours ago',
    type: 'green',
  },
  {
    title: 'Medical record updated',
    description: 'Dr. Michael Mfoniso - Pediatrics specialist',
    date: '11 May, 2025',
    timeAgo: '2 hours ago',
    type: 'blue',
  },
]

const dotClass = (type) => {
  return {
    'primary': 'bg-blue-600',
    'yellow': 'bg-yellow-500',
    'green': 'bg-green-600',
    'blue': 'bg-indigo-600',
  }[type] || 'bg-gray-400'
}
</script>
