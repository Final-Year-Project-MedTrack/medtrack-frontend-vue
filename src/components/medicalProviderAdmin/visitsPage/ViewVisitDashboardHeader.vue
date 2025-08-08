<template>
  <div class="p-4 w-full rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
    <div class="w-1/2">
      <h1 v-if="props" class="text-lg font-semibold">{{ patient.user.first_name+' '+patient.user.last_name }}</h1>
      <h1 v-else>Guest</h1>
      <p class="text-sm text-gray-600">ID: {{patient.user.national_id}}</p>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup>

const props = defineProps({
  name: String,
  id: String,
  patient: Object
})

</script>