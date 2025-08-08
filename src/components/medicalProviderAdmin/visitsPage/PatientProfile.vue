<template>
    <div class="p-4">
        <div class="flex py-4 justify-between">
            <div class="">
                <h2 class="text-xl">Personal Information</h2>
                <p class="text-sm font-thin text-gray-500">Personal information and contact details</p>
            </div>

            <div class=" my-3">
                <button class="button p-1 px-2 bg-gray-600 text-white rounded">
                    <i class="fa fa-pencil px-2"></i>
                    Edit Profile
                </button>
            </div>
        </div>

        <!-- Personal Information Start -->
        <div class="p-4 border border-gray-100 rounded-xl">
            <h3 class="text-xl text-gray-600">Personal Information</h3>

            <div class="grid grid-cols-3 gap-4 py-5">
                <div class="... text-sm">
                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Full Name</p>
                        <h3 class="font-bold text-gray-600">{{ patient.user.first_name + ' '+ patient.user.last_name }}</h3>
                    </div>


                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Date Of Birth</p>
                        <h3 class="font-bold text-gray-600">{{ patient.date_of_birth }}</h3>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Gender</p>
                        <h3 class="font-bold text-gray-600">{{ patient.gender }}</h3>
                    </div>


                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">State of Origin</p>
                        <h3 class="font-bold text-gray-600">{{ patient.user.profile.state }}</h3>
                    </div>
                </div>

                <div class="... text-sm">
                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Marital Status</p>
                        <h3 class="font-bold text-gray-600">{{ patient.marital_status }}</h3>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Religion</p>
                        <h3 class="font-bold text-gray-600">{{ patient.religion }}</h3>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Occupation</p>
                        <h3 class="font-bold text-gray-600">{{ patient.occupation }}</h3>
                    </div>

                    <div class="py-2">
                        <p class="text-gray-400 text-xs font-thin">Ethnicity</p>
                        <h3 class="font-bold text-gray-600">{{ patient.ethnic_group }}</h3>
                    </div>
                </div>
                <div class="... text-sm">
                    <div class="py-5">
                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Patient ID</p>
                            <h3 class="font-bold text-gray-600">{{ patient.user.national_id }}</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Height/Weight</p>
                            <h3 class="font-bold text-gray-600">Test User</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Blood Group</p>
                            <h3 class="font-bold text-gray-600">{{ patient.blood_group }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Personal Information end -->


        
        <div class="flex justify-between py-5">
            <div class="w-1/2 pr-3">
                <!-- Contact Information Start -->
                <div class=" p-4 border border-gray-100 rounded-xl ">
                    <h3 class="text-xl text-gray-600">Contact Information</h3>

                    <div class="pt-5">
                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Primary Phone number</p>
                            <h3 class="font-bold text-gray-600">{{ patient.user.profile.phone_no }}</h3>
                        </div>
                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Alternate Phone Number</p>
                            <h3 class="font-bold text-gray-600">{{ patient.user.profile.phone_no }}</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Email</p>
                            <h3 class="font-bold text-gray-600">{{ patient.user.email }}</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Current Address</p>
                            <h3 class="font-bold text-gray-600">{{ patient.user.profile.address }}</h3>
                        </div>
                    </div>
                </div>
                <!-- Contact Information end -->
            </div>
            <div class="w-1/2 pl-3">
                <div class=" p-4 border border-gray-100 rounded-xl ">
                    <h3 class="text-xl text-gray-600">Emergency Contact</h3>

                    <div class="">
                        <div class="border-b border-gray-100 leading-loose py-2">
                            <h3 class="font-bold text-gray-600">Test User</h3>
                            <p class="text-gray-400 text-xs font-thin my-2">Phone: {{ patient.emergency_contact }}</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Relationship: Spouse</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Address</p>
                        </div>


                        <div class="border-b border-gray-100 leading-loose">
                            <h3 class="font-bold text-gray-600">Test User</h3>
                            <p class="text-gray-400 text-xs font-thin my-2">Phone</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Relationship: Spouse</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="flex justify-between py-5">
            <div class="w-1/2 pr-3">
                <div class=" p-4 border border-gray-100 rounded-xl ">
                    <h3 class="text-xl text-gray-600">Contact Information</h3>

                    <div class="pt-5">
                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Primary Phone number</p>
                            <h3 class="font-bold text-gray-600">Test User</h3>
                        </div>
                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Alternate Phone Number</p>
                            <h3 class="font-bold text-gray-600">Test User</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Email</p>
                            <h3 class="font-bold text-gray-600">Test User</h3>
                        </div>

                        <div class="py-2">
                            <p class="text-gray-400 text-xs font-thin">Current Address</p>
                            <h3 class="font-bold text-gray-600">Test User</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2 pl-3">
                <div class=" p-4 border border-gray-100 rounded-xl ">
                    <h3 class="text-xl text-gray-600">Emergency Contact</h3>

                    <div class="">
                        <div class="border-b border-gray-100 leading-loose py-4">
                            <h3 class="font-bold text-gray-600">Test User</h3>
                            <p class="text-gray-400 text-xs font-thin my-2">Phone</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Relationship: Spouse</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Address</p>
                        </div>


                        <div class="border-b border-gray-100 leading-loose py-4">
                            <h3 class="font-bold text-gray-600">Test User</h3>
                            <p class="text-gray-400 text-xs font-thin my-2">Phone</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Relationship: Spouse</p>
                            <p class="text-gray-400 text-xs font-thin my-2">Address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { CalendarPlus, Users, Activity, FileText } from 'lucide-vue-next'

const props = defineProps({
  patient: Object,
})
</script>
