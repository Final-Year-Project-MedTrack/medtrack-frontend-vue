<template>
  <div>
    <!-- PDF Viewer -->
    <vue-pdf-embed v-if="isPdf" :source="fileUrl" class="w-full h-[600px]" />

    <!-- Image Viewer with lightbox -->
    <div v-else>
      <img
        :src="fileUrl"
        class="max-w-full max-h-[400px] cursor-pointer"
        @click="visible = true"
      />
      <vue-easy-lightbox
        :visible="visible"
        :imgs="[fileUrl]"
        @hide="visible = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import VueEasyLightbox from 'vue-easy-lightbox'

const props = defineProps({
  fileUrl: {
    type: String,
    required: true
  }
})

const visible = ref(false)

// detect file type
const isPdf = computed(() => props.fileUrl.toLowerCase().endsWith('.pdf'))
</script>

<style scoped>
/* optional styling */
</style>
