<template>
  <div class="bg-green-50 p-4 w-full rounded-xl flex md:flex-row justify-between items-start md:items-center gap-2">
    <div class="w-1/2">
      <h1 v-if="userStore.user" class="text-lg font-semibold">Welcome, {{ userStore.user.first_name +' '+ userStore.user.last_name }}</h1>
      <h1 v-else>Guest</h1>
      <p class="text-sm text-gray-600">Medical Staff</p>
    </div>
    <div class="flex gap-2 flex-wrap text-md font-thin">
      <!-- <button class="btn bg-white p-2 px-3 m-2 border border-gray-200 rounded-lg">
        <i class="fa fa-user-plus"></i>
        Register patient
      </button>
      <button class="btn bg-white p-2 px-3 m-2 border border-gray-200 rounded-lg">
        <i class="fa fa-regular fa-heart"></i>
        Record vitals
      </button> -->
      <router-link :to="{name: 'MedicalProviderDashboardScheduleVisit'}" class="btn bg-green-500 p-2 px-3 m-2 border border-gray-200 rounded-lg text-white">
        <i class="fa fa-bookmark"></i>
        New visit
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
console.log('user store', userStore, userStore.user)

</script>