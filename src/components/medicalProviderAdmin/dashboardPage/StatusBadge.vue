<template>
  <span :class="badgeClass" class="px-2 py-1 rounded-full text-xs font-medium">
    {{ status }}
  </span>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({ status: String })

const badgeClass = computed(() => {
  switch (props.status.toLowerCase()) {
    case 'checked in': return 'bg-green-100 text-green-800'
    case 'waiting': return 'bg-yellow-100 text-yellow-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    case 'scheduled': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
})
</script>
