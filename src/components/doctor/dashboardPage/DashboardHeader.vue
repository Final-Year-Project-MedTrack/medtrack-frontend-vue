<template>
  <div class="bg-green-50 p-4 w-full rounded-xl flex md:flex-row justify-between items-start md:items-center gap-2">
    <div class="w-1/2">
      <h1 v-if="userStore.user" class="text-lg font-semibold">Welcome, {{ userStore.user.first_name +' '+ userStore.user.last_name }}</h1>
      <h1 v-else>Guest</h1>
      <p class="text-sm text-gray-600">Doctor</p>
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