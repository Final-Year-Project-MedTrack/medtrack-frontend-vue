<template>
    <div class="flex w-full">
        <div class="w-3/5 p-4 pl-0">
            <div class="border border-gray-100 rounded p-4">
                <div class="pb-3">
                    <h2 class=" text-2xl">Recent Activity</h2>
                </div>

                <!-- Begin Activity -->
                <div class="p-4 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-4/5 text-sm font-thin">
                            <h4 class=" font-medium">Vitals Recorded</h4>
                            <div class="text-gray-500">
                                <p>BP: 120/80, HR:72</p>
                                <p>by Sarah Doe</p>
                            </div>
                        </div>
                        <div class="w-1/5 my-4">
                            <span class="text-gray-500">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Activity -->

                <!-- Begin Activity -->
                <div class="p-4 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-4/5 text-sm font-thin">
                            <h4 class=" font-medium">Vitals Recorded</h4>
                            <div class="text-gray-500">
                                <p>BP: 120/80, HR:72</p>
                                <p>by Sarah Doe</p>
                            </div>
                        </div>
                        <div class="w-1/5 my-4">
                            <span class="text-gray-500">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Activity -->

                <!-- Begin Activity -->
                <div class="p-4 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-4/5 text-sm font-thin">
                            <h4 class=" font-medium">Vitals Recorded</h4>
                            <div class="text-gray-500">
                                <p>BP: 120/80, HR:72</p>
                                <p>by Sarah Doe</p>
                            </div>
                        </div>
                        <div class="w-1/5 my-4">
                            <span class="text-gray-500">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Activity -->

                <!-- Begin Activity -->
                <div class="p-4 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-4/5 text-sm font-thin">
                            <h4 class=" font-medium">Vitals Recorded</h4>
                            <div class="text-gray-500">
                                <p>BP: 120/80, HR:72</p>
                                <p>by Sarah Doe</p>
                            </div>
                        </div>
                        <div class="w-1/5 my-4">
                            <span class="text-gray-500">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Activity -->

                
            </div>
        </div>
        <div class="w-2/5 p-4">
            <div class="border border-gray-100 rounded p-4">
                <div class="pb-3">
                    <h2 class=" text-2xl">Current Status</h2>
                </div>

                <!-- Begin Admission Status -->
                <div class="p-4 py-6 my-5 bg-green-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-3/4 text-sm font-thin">
                            <h4 class="font-extrabold font-black">Admission Status</h4>
                            <div class="text-gray-500">
                                <p>11:00 AM</p>
                            </div>
                        </div>
                        <div class="w-1/4 my-2">
                            <span class="text-white bg-gray-600 p-1 px-3 rounded-full text-sm">
                                {{admissionStatus ?? 'test'}}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Admission Status -->

                <!-- Begin Admission Date -->
                <div class="p-4 py-6 my-5 bg-blue-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-3/4 text-sm font-thin">
                            <h4 class=" font-extrabold font-black">Admission Date</h4>
                            <div class="text-gray-500">
                                <p>11:00 AM</p>
                            </div>
                        </div>
                        <div class="w-1/4 my-2">
                            <span class="text-gray-500 text-sm">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Admission Date -->

                <!-- Begin Latest Vitals -->
                <div class="p-4 py-6 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-3/4 text-sm font-thin">
                            <h4 class="font-extrabold font-black">Latest Vitals</h4>
                            <div class="text-gray-500">
                                <p>BP: 120/80, HR:72</p>
                            </div>
                        </div>
                        <div class="w-1/4 my-2">
                            <span class="text-gray-500 text-sm">
                                2 hours ago
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Latest Vitals -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  count: String,
  completed: String,
  trend: String,
  icon: String,
  admissionStatus: String,
  admissionDate: String,
  patientVitalsUpdatedTime: String
})

const icons = {
  'calendar-plus': CalendarPlus,
  'users': Users,
  'activity': Activity,
  'file-text': FileText,
}

const iconComponent = computed(() => icons[props.icon])
</script>
