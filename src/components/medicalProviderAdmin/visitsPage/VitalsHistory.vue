<template>
  <div class="p-6 bg-white ">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Vitals History</h2>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + Record Vital
      </button>
    </div>

    <div v-for="(record, index) in vitals" :key="index" class="mb-4 border border-gray-100 rounded-lg">
      <div class="p-4 flex justify-between items-center cursor-pointer" @click="toggle(index)">
        <div>
          <p class="text-sm text-gray-500">{{ record.date }} at {{ record.time }}</p>
          <p class="text-sm text-gray-600">Recorded by: {{ record.recordedBy }}</p>
        </div>
        <svg :class="{'rotate-180': openIndex === index}" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      <div v-if="openIndex === index" class="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="col-span-1">
          <p class="text-sm text-gray-500">Height</p>
          <p class="text-lg font-semibold text-gray-800">165 cm</p>
        </div>
        <div class="col-span-1">
          <p class="text-sm text-gray-500">Height</p>
          <p class="text-lg font-semibold text-gray-800">165 cm</p>
        </div>
        <div class="col-span-1 relative">
          <p class="text-sm text-gray-500">Height</p>
          <p class="text-lg font-semibold text-gray-800">165 cm</p>
          <span class="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full border border-yellow-300">Overweight</span>
        </div>
        <div class="col-span-1">
          <p class="text-sm text-gray-500">Blood Pressure</p>
          <p class="text-lg font-semibold text-gray-800">120/80 mmHg</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Heart Rate</p>
          <p class="text-lg font-semibold text-gray-800">72</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Temperature</p>
          <p class="text-lg font-semibold text-gray-800">72 &deg;C</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Respiratory Rate</p>
          <p class="text-lg font-semibold text-gray-800">16 Breaths/min</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">O<sub>2</sub> Saturation</p>
          <p class="text-lg font-semibold text-gray-800">98%</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Pain Level</p>
          <p class="text-lg font-semibold text-gray-800">2/10 <span class="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Mild</span></p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Blood Glucose</p>
          <p class="text-lg font-semibold text-gray-800">95 mg/dL</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Urine Output</p>
          <p class="text-lg font-semibold text-gray-800">50 mL/hr</p>
        </div>

        <div class="col-span-full mt-4">
          <p class="text-sm text-gray-500">Notes</p>
          <p class="text-sm text-gray-700">Patient comfortable, no distress noted</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  count: String,
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
const openIndex = ref(0)
const vitals = ref([
  {
    date: '29/01/2024',
    time: '14:30',
    recordedBy: 'Smith Joe',
  },
  {
    date: '29/01/2024',
    time: '14:30',
    recordedBy: 'Smith Joe',
  },
  {
    date: '29/01/2024',
    time: '14:30',
    recordedBy: 'Smith Joe',
  },
])

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>