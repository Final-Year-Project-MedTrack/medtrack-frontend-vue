<template>
    <div class="p-6 bg-white ">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Allergies</h2>
            <button class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                + Add Allergy
            </button>
        </div>


        <div v-if="loading" role="status"
            class="w-full p-4 space-y-4 border border-gray-100 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-100 md:p-6 dark:border-gray-100">
            <div class="flex items-center justify-between">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>

        <div v-else-if="allergies.length == 0">
            <div class="mb-4 border border-gray-100 rounded-lg">
                <div class=" p-8">
                    No Allergy Recorded
                </div>    
            </div>
        </div>

        <div v-else v-for="(allergy, index) in allergies" :key="index" class="mb-4 border border-gray-100 rounded-lg">
            <div class="p-4 flex justify-between items-center cursor-pointer" @click="toggle(index)">
                <div>
                    <h2>{{ allergy.allergy.name }}</h2>
                    <!-- <p class="text-sm text-gray-500">{{ allergy.diagnosis_date }} at {{ medicalCondition.time }}</p> -->
                    <p class="text-sm text-gray-600">Recorded by: {{ allergy.documented_by_user.first_name +' '+medicalCondition.documented_by_user.last_name }}</p>
                </div>
                <svg :class="{ 'rotate-180': openIndex === index }" class="w-5 h-5 transition-transform" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>

            <div v-if="openIndex === index" class="p-4">
                <div class="col-span-1 py-2">
                    <p class="text-sm text-gray-500">Type:  Chronic <span class=" font-semibold text-gray-800">165 cm</span></p>
                </div>

                <div class="col-span-1 py-2">
                    <p class="text-sm text-gray-500">Onset: <span class=" font-semibold text-gray-800">{{ allergy.documented_date }}</span></p>
                </div>

                <div class="col-span-1 py-2">
                    <p class="text-sm text-gray-500">Diagnosed By: <span class="font-semibold text-gray-800">{{ allergy.documented_by_user.first_name +' '+medicalCondition.documented_by_user.last_name }}</span></p>
                </div>

                <div class="col-span-1 py-2">
                    <p class="text-sm text-gray-500">Severity: <span class=" font-semibold text-gray-800">{{allergy.severity}}</span></p>
                </div>

                <div class="col-span-full mt-4 p-4 bg-blue-200 rounded">
                    <p class="text-sm text-gray-500">Notes</p>
                    <p class="text-sm text-gray-700">{{allergy.reaction}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/axios'
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
    title: String,
    count: String,
    completed: String,
    trend: String,
    icon: String,
    visit: Object
})

const icons = {
    'calendar-plus': CalendarPlus,
    'users': Users,
    'activity': Activity,
    'file-text': FileText,
}

const iconComponent = computed(() => icons[props.icon])
const openIndex = ref(0)
const loading = ref(true)
const error = ref(null)

const allergies = ref([])

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}


onMounted(async () => {
    try {
        const response = await api.get(`allergies/allergies/${props.visit.patient.id}/allergy`)
        allergies.value = response.data.data.items
    } catch (err) {
        error.value = 'Failed to fetch Visit Information'
        console.error(err)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>