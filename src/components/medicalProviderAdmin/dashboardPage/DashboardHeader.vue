<template>
  <div class="bg-green-50 p-4 w-full rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
    <div class="w-1/2">
      <h1 v-if="userStore.user" class="text-lg font-semibold">Welcome, {{ userStore.user.first_name +' '+ userStore.user.last_name }}</h1>
      <h1 v-else>Guest</h1>
      <p class="text-sm text-gray-600">Medical Assistant</p>
    </div>
    <div class="flex gap-2 flex-wrap w-1/2">
      <button class="btn">Register patient</button>
      <button class="btn">Record vitals</button>
      <button class="btn btn-green">New visit</button>
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