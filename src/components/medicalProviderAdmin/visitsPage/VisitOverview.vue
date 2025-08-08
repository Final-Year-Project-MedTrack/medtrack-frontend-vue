<template>
    <div class="flex w-full">
        <div class="w-3/5 p-4 pl-0">
            <div class="border border-gray-100 rounded p-4">
                <div class="pb-3">
                    <h2 class=" text-2xl">Recent Activity</h2>
                </div>

                <div v-if="visit.vitals.length == 0" class="p-4 my-5 bg-gray-50 rounded">
                    
                    <div class="flex justify-between">
                        <div class="w-5/5 text-sm font-thin">
                            <h4 class=" font-medium">No Vitals Recorded</h4>
                        </div>
                    </div>
                </div>

                <!-- Begin Activity -->
                <div v-else v-for="vital in visit.vitals" class="p-4 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-4/5 text-sm font-thin">
                            <h4 class=" font-medium">Vitals Recorded</h4>
                            <div class="text-gray-500">
                                <p>BP: {{vital.blood_pressure_systolic}}/{{vital.blood_pressure_diastolic}}, HR:{{vital.heart_rate}}</p>
                                <p>by {{vital.user.first_name+' '+vital.user.last_name}}</p>
                            </div>
                        </div>
                        <div class="w-1/5 my-4">
                            <span class="text-gray-500 ">
                                {{timeAgo(vital.created_at)}}
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
                                {{visit.status ?? 'test'}}
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
                                <p>{{visit.admission_date}}</p>
                            </div>
                        </div>
                        <div class="w-1/4 my-2">
                            <span class="text-gray-500 text-sm">
                                {{timeAgo(visit.created_at)}}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- End Admission Date -->

                <div v-if="visit.vitals.length == 0" class="p-4 my-5 bg-gray-50 rounded">
                    
                    <div class="flex justify-between">
                        <div class="w-5/5 text-sm font-thin">
                            <h4 class=" font-medium">No Vitals Recorded</h4>
                        </div>
                    </div>
                </div>

                <!-- Begin Latest Vitals -->
                <div v-else class="p-4 py-6 my-5 bg-gray-50 rounded">
                    <div class="flex justify-between">
                        <div class="w-3/4 text-sm font-thin">
                            <h4 class="font-extrabold font-black">Latest Vitals</h4>
                            <div class="text-gray-500">
                                <p>
                                    BP: {{visit.vitals.at(-1).blood_pressure_systolic}}/{{visit.vitals.at(-1).blood_pressure_diastolic}}, 
                                    HR: {{visit.vitals.at(-1).heart_rate}}</p>
                            </div>
                        </div>
                        <div class="w-1/4 my-2">
                            <span class="text-gray-500 text-sm">
                                <!-- {{timeAgo()}} -->
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
import moment from 'moment';
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  count: String,
  completed: String,
  trend: String,
  icon: String,
  admissionStatus: String,
  admissionDate: String,
  patientVitalsUpdatedTime: String,
  visit: Object
})

const icons = {
  'calendar-plus': CalendarPlus,
  'users': Users,
  'activity': Activity,
  'file-text': FileText,
}

const iconComponent = computed(() => icons[props.icon])

// methods: {
    function timeAgo(dateString) {
      const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

      let interval = seconds / 31536000; // years
      if (interval > 1) return Math.floor(interval) + " years ago";

      interval = seconds / 2592000; // months
      if (interval > 1) return Math.floor(interval) + " months ago";

      interval = seconds / 86400; // days
      if (interval > 1) return Math.floor(interval) + " days ago";

      interval = seconds / 3600; // hours
      if (interval > 1) return Math.floor(interval) + " hours ago";

      interval = seconds / 60; // minutes
      if (interval > 1) return Math.floor(interval) + " minutes ago";

      return Math.floor(seconds) + " seconds ago";
    // }
  }
</script>
