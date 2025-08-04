<template>
    <!-- Sidebar -->
    <nav :class="[
            'flex flex-col justify-between bg-white border border-gray-100 rounded-[32px] transition-all duration-300 overflow-hidden',
            isCollapsed ? 'w-20' : 'w-64',
            'fixed md:relative z-40 top-0 left-0 h-screen'
        ]"
        class="h-full flex-col justify-between overflow-y-auto p-4 rounded-[32px] border-gray-100 border-[1px] font-[14px] text-[#5f6a61]"
    >
        <!-- Logo and Toggle -->
        <div class="p-4 flex justify-between items-center">
            <img src="../../assets/Page-heading-logo.png" alt="Logo" class="w-auto h-8" />
            <button @click="toggleSidebar" class="ml-auto p-2 hover:bg-gray-100 rounded">
                <i :class="isCollapsed ? 'fa fa-chevron-right' : 'fa fa-chevron-left'"></i>
            </button>
        </div>

        <!-- Navigation Menu -->
        <div class="flex-1 p-4 space-y-2 overflow-y-auto">
            <router-link to="/doctor/dashboard"
                class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-green-50 transition">
                <i class="fa fa-home"></i>
                <span v-if="!isCollapsed" class="ml-3 font-semibold">Dashboard</span>
            </router-link>

            <router-link to="/doctor/patients"
                class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-gray-100 transition">
                <i class="fa fa-users"></i>
                <span v-if="!isCollapsed" class="ml-3">Patients</span>
            </router-link>

            <router-link to="/doctor/visits"
                class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-gray-100 transition">
                <i class="fa fa-calendar-check-o"></i>
                <span v-if="!isCollapsed" class="ml-3">Visits</span>
            </router-link>

            <router-link to="/doctor/records"
                class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-gray-100 transition">
                <i class="fa fa-file"></i>
                <span v-if="!isCollapsed" class="ml-3">Medical records</span>
            </router-link>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 space-y-4">
            <div class="space-y-2">
                <router-link to="/doctor/settings"
                    class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-gray-100 transition">
                    <i class="fa fa-cog"></i>
                    <span v-if="!isCollapsed" class="ml-3">Settings</span>
                </router-link>

                <router-link to="/doctor/help"
                    class="flex items-center p-2 rounded-lg text-[#5f6a61] hover:bg-gray-100 transition relative">
                    <i class="fa fa-question-circle"></i>
                    <span v-if="!isCollapsed" class="ml-3">Help and support</span>
                    <span v-if="!isCollapsed"
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-xs px-2 py-0.5 rounded-full">10</span>
                </router-link>
            </div>

            <!-- User Info -->
            <router-link to="/doctor/profile"
                class="flex items-center gap-3 p-2 border-t border-gray-200 pt-4 hover:bg-gray-100 transition">
                <img class="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1508002366005-75a695ee2d17?fm=jpg" alt="Rounded avatar" />
                <div v-if="!isCollapsed" class="flex-1">
                    <h2 class="text-sm font-medium">Alison Eyo</h2>
                    <p class="text-xs text-gray-500">alison.e@rayna.ui</p>
                </div>
                <i v-if="!isCollapsed" class="fa fa-sign-out text-gray-400 ml-auto"></i>
            </router-link>
        </div>
    </nav>
</template>



<script setup>
import { ref, onMounted } from 'vue'

const isCollapsed = ref(false)

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
    if (window.innerWidth < 768) {
        isCollapsed.value = true
    }
})
</script>



<style scoped></style>