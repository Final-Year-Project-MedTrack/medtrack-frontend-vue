<template>
  <div class="p-4 border border-gray-100 rounded-xl">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-sm font-medium">{{ title }}</h2>
      <!-- Replace with heroicon or lucide -->
      <component :is="iconComponent" class="h-5 w-5 text-gray-500" />
    </div>
    <div class="text-2xl font-bold">{{ count }}</div>
    <div v-if="completed" class="text-xs text-gray-500 mt-1">{{ completed }} completed</div>
    <div v-if="trend" class="text-xs text-green-600 mt-1">📈 {{ trend }}% from last month</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  count: Number,
  completed: String,
  trend: String,
  icon: String,
})

const icons = {
  'calendar-plus': CalendarPlus,
  'users': Users,
  'activity': Activity,
  'file-text': FileText,
}

const iconComponent = computed(() => icons[props.icon])
</script>
