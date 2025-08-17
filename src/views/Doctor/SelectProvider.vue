<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import api from '@/services/axios'

const userStore = useUserStore()
const providers = ref([])
const unavailableProviders = ref([])
const router = useRouter()
let providerCount = 0

onMounted(async () => {
    try {
        let response = await api.get('doctors/fetch-medical-providers')
        providers.value =response.data.data
        providerCount = providers.value.length()
        console.log(providers.value);
    } catch (err) {
        err.value = 'Failed to fetch Medical Providers'
        console.error(err)
    } finally {
        loading.value = false
    }

    unavailableProviders.value = [
        { id: 1, name: 'General Hospital' },
        { id: 2, name: 'City Clinic' },
    ]
})

function selectProvider(provider) {
    userStore.setProviderId(provider.medical_provider_id)
    router.push({ name: 'DoctorLoginToProvider' });
}
</script>

<template>
    <div class="foundation-background select-provider-section">
        <!-- <div class="md:container mx-auto px-6 w-5/6"> -->
        <div class="container mx-auto w-full text-center">
            <div class="top-section mt-5">
                <div class="mx-auto mt-5">
                    <div class="header-text text-center">
                        <img src="/images/building-5.png" alt="" width="100" height="100"
                            class="text-center mx-auto max-w-2xl">
                        <h1 class="text-4xl bold">Select Provider</h1>
                        <p class="font-normal text-gray-500">Welcome, Dr. Mfoniso Ukpabio. Choose a provider to access
                            your dashboard</p>
                    </div>
                </div>
            </div>

            <div class="choose-hospital-section">
                <!-- Available Providers -->
                <div class="select-available-hospitals">
                    <div class="text-left m-4">
                        <h2 class="text-2xl">Available Providers({{ providerCount }})</h2>
                    </div>

                    <div class="flex">

                        <div v-for="provider in providers" :key="provider.id" class="m-4 w-1/2 p-6 bg-white border border-gray-200 rounded-lg text-left">
                            <div class="flex justify-between mb-5 pb-5">
                                <div>
                                    <div href="#" class="pb-5">
                                        <h5 class=" text-2xl tracking-tight text-gray-900">
                                            {{ provider.medical_provider.name }}
                                        </h5>
                                        <div class="font-normal text-gray-500">
                                            <i class="fa fa-users"></i> {{provider.medical_provider.medical_provider_type}}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span
                                        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{{provider.medical_provider.status}}</span>
                                </div>
                            </div>


                            <div class="provider-details font-normal text-gray-500 mb-5 pb-4">
                                <div class="provider-location  mb-3">
                                    <div><i class="fa fa-map-marker m-auto pr-5" aria-hidden="true"></i><span>
                                        {{ provider.medical_provider.address +' ' + provider.medical_provider.lga + ' '+ provider.medical_provider.state }}
                                    </span></div>
                                </div>

                                <div class="no-provider-patients mb-3">
                                    <div><i class="fa fa-users m-auto pr-5" aria-hidden="true"></i><span>1,247
                                            patients</span></div>
                                </div>

                                <div class="provider-last-accessed mb-3">
                                    <div><i class="fa fa-clock-o m-auto pr-5" aria-hidden="true"></i><span>Last
                                            accessed: 30/12/2025</span></div>
                                </div>
                            </div>


                            <button @click="selectProvider(provider)" 
                                class="inline-flex justify-items-stretch w-full items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                Access Dashboard
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Unavailable Providers -->
                <div class="unavailable-providers">
                    <div class="text-left m-4">
                        <h2 class="text-2xl">Unavailable Providers(2)</h2>
                    </div>

                    <div class="flex">

                        <div v-for="unavailableProvider in unavailableProviders" :key="unavailableProvider.id" 
                            class="opacity-75 m-4 w-1/2 p-6 bg-white border border-gray-200 rounded-lg text-left">
                            <div class="flex justify-between mb-5 pb-5">
                                <div>
                                    <a href="#" class="mb-5 pb-5">
                                        <div>
                                            <h5 class=" text-2xl tracking-tight text-gray-900">
                                                {{ unavailableProvider.name }}
                                            </h5>
                                        </div>
                                        <div class="font-normal text-gray-500">
                                            <i class="fa fa-users"></i> Hospital
                                        </div>
                                    </a>
                                </div>

                                <div>
                                    <span
                                        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Active</span>
                                </div>
                            </div>


                            <div class="provider-details font-normal text-gray-500 mb-5 pb-4">
                                <div class="provider-location  mb-3">
                                    <div><i class="fa fa-map-marker m-auto pr-5" aria-hidden="true"></i><span>Downtown
                                            medical district</span></div>
                                </div>

                                <div class="no-provider-patients mb-3">
                                    <div><i class="fa fa-users m-auto pr-5" aria-hidden="true"></i><span>1,247
                                            patients</span></div>
                                </div>

                                <div class="provider-last-accessed mb-3">
                                    <div><i class="fa fa-clock-o m-auto pr-5" aria-hidden="true"></i><span>Last
                                            accessed: 30/12/2025</span></div>
                                </div>
                            </div>


                            <button 
                                class="inline-flex justify-items-stretch w-full items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                Access Dashboard
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

body{
    background: #F9FAFB !important;
}
#app{
    background: #F9FAFB !important;
}
.foundation-background{
    background: #F9FAFB !important;
}


</style>
