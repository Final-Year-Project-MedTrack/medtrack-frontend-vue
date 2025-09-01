<template>
  <div class="p-4 bg-white rounded">
    <h2 class="text-lg font-semibold mb-4">Add Doctor to Medical Provider</h2>

    <!-- Doctor Search -->
    <div class="relative w-full mb-4">
      <input
        type="text"
        v-model="doctorSearch"
        @input="searchDoctors"
        class="w-full border border-gray-100 px-3 py-2 rounded"
        placeholder="Search doctors..."
      />

      <ul
        v-if="doctorResults.length"
        class="absolute z-10 bg-white border border-gray-100 mt-1 w-full rounded shadow max-h-48 overflow-y-auto"
      >
        <li
          v-for="doctor in doctorResults"
          :key="doctor.id"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
          @click="selectDoctor(doctor)"
        >
          {{ doctor.user.first_name }} {{ doctor.user.last_name }}
        </li>
      </ul>
    </div>

    <!-- PIN -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">PIN</label>
      <input
        type="text"
        v-model="form.pin"
        class="w-full border border-gray-100 rounded px-3 py-2"
        placeholder="Enter hospital PIN"
      />
    </div>

    <!-- Role -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Role</label>
      <input
        type="text"
        v-model="form.role"
        class="w-full border border-gray-100 rounded px-3 py-2"
        placeholder="e.g. Consultant, Resident..."
      />
    </div>

    <button
      @click="submit"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Add Doctor
    </button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'
import api from '@/services/axios'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { proxy } = getCurrentInstance();
const doctorSearch = ref("")
const doctorResults = ref([])
const loadingDoctors = ref(false)
const router = useRouter()

const form = ref({
  doctor_id: "",
  medical_provider_id: userStore.selectedProviderId,
  pin: "",
  role: "",
})

// Search doctors API
const searchDoctors = async () => {
  if (!doctorSearch.value) {
    doctorResults.value = []
    return
  }

  loadingDoctors.value = true
  try {
    const { data } = await api.get(`/doctors/search`, {
      params: { 
        search: doctorSearch.value,
        medical_provider_id: userStore.selectedProviderId 
      },
    })

    console.log(data.data)
    doctorResults.value = data.data
  } catch (err) {
    console.error("Failed to fetch doctors", err)
  } finally {
    loadingDoctors.value = false
  }
}

const selectDoctor = (doctor) => {
  form.value.doctor_id = doctor.id
  doctorSearch.value = `${doctor.user.first_name} ${doctor.user.last_name}`
  doctorResults.value = []
}

const submit = async () => {
  try {
    await api.post(`/medical-provider/doctor`, form.value)

    form.value = { 
      doctor_id: "", 
      medical_provider_id: userStore.selectedProviderId, 
      pin: "", 
      role: "" 
    }
    doctorSearch.value = ""
    proxy.$swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Doctor added successfully!',
        timer: 3000,
        timerProgressBar: true,
      });

    return router.push({ name: 'MedicalProviderDashboardStaffDoctors' })
  } catch (err) {
    console.error("Failed to add doctor", err)
    proxy.$swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error adding  doctor: '+ error.response.data.message,
        timer: 3000,
        timerProgressBar: true,
      });
  }
}
</script>
