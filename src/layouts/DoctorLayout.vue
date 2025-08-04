<style scoped></style>


<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside id="default-sidebar" class="w-[256px] z-40 transition-transform m-4 mt-0 sm:translate-x-0"
            aria-label="Sidebar">
            <!-- Replace this with your sidebar component or nav links -->
            <Sidebar />
        </aside>

        <!-- Main content area -->
        <div class="flex-1 flex flex-col">
            <!-- Navbar -->
            <Navbar />

            <!-- Page Content -->
            <main class="flex-1 p-6 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/components/doctor/Sidebar.vue'
import Navbar from '@/components/doctor/Navbar.vue'

</script>