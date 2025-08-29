<style scoped>
/* .login-page {
  max-width: 700px;
  margin: 100px auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
} */
.form-group {
  margin-bottom: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}

.padding-top-50 {
  padding-top: 30%;
}

/* width-100{

} */
</style>

<template>
  <div class="w-full max-w-6xl mx-auto md:flex md:flex-row sm:flex-col min-h-screen">
    <!-- Left Section -->
    <div
      class="bg-custom-light-green p-8 sm:hidden md:block md:p-12 md:w-full relative overflow-hidden rounded-[30px] h-full">
      <div class="z-10 relative">
        <!-- <h2 class="text-2xl font-bold mb-6">Your Logo</h2> -->
        <div class="mb-8">
          <img src="../../assets/Page-heading-logo.png" alt=""></img>
        </div>
        <div class="mt-16 md:mt-16 pt-32">
          <h1 class="text-7xl md:text-7xl font-bold mb-4">Access <span class="text-[#55a73c]">Patient Records</span>
            with Confidence</h1>
          <!-- <h2 class="text-2xl md:text-3xl font-semibold mb-6">Lorem Ipsum is simply</h2> -->
          <p class="max-w-md opacity-90 text-gray-500 pt-8">
            Our intelligent records system is designed to streamline patient care, giving healthcare professionals
            instant access to medical histories, lab results, and prescriptions - securely and reliably
          </p>
        </div>
      </div>

      <div class="padding-top-50">

        <div class="block w-full p-4 bg-custom-deep-green rounded-[20px] shadow-sm ">
          <p class="text-sm text-[#F2FDEE] dark:text-[#F2FDEE]">“MediTrack has redefined how we manage patient
            information. It’s intuitive, fast, and ensures our data remains protected at all times. A critical tool in
            delivering high-quality healthcare.”
          </p>
          <div class="pt-3 flex">
            <div class="mr-3">
              <img class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1508002366005-75a695ee2d17?fm=jpg" alt="Rounded avatar"></img>
            </div>
            <div>
              <h2 class="text-[#F2FDEE] text-sm bold">Dr. Evelyn Opara</h2>
              <p class="text-[#F2FDEE] text-sm">Medical Director, CityMed Hospital</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Right Section -->
    <div class="p-8 md:p-12 w-full md:w-1/2 md:flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-3xl px-8">

        <div class="text-center py-12">
          <!-- <p class="text-gray-600 mb-1">
            Welcome back!
          </p> -->
          <h1 class="text-4xl font-bold">Welcome back!</h1>
          <p class="text-gray-600 mb-1">
            Please put in your pin to continue
          </p>
        </div>

        <form @submit.prevent="handleLogin">

          <div class="space-y-2 error text-red-400 py-2 flex justify-center" v-if="err">
            <span>{{ err }}</span>
          </div>
          <div class="space-y-6">
            
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Pin
              </label>
              <input id="password" v-model="password" type="password" placeholder="Password"
                class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <button disabled v-if="loading"
              class="w-full h-12 btn-main-green  text-white font-medium rounded-md transition duration-200">
                  Signing in...
            </button>

            <button v-else
              type="submit"
              class="w-full h-12 btn-main-green  text-white font-medium rounded-md transition duration-200">
              Sign in
            </button>
            <div class="text-center">
              <a href="#" class=" text-gray-500 text-sm">Forgot Password? <strong>Request for a reset</strong></a>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/axios' // using the new axios instance
import { useUserStore } from '@/store/user'

const password = ref('')
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const err = ref('')


const handleLogin = async () => {
  loading.value = true

  try {
    const { data } = await api.post('auth/doctor/medical-provider/login', {
        medical_provider_id:    userStore.selectedProviderId,
        doctor_id: userStore.doctorProfile.id,
        pin: password.value,
    })

    // console.log(data)
    // return

    return router.push({ name: 'DoctorDashboard' })
  } catch (error) {
    err.value = error.response?.data?.message || error.message
    console.error('Login failed:', err)
    loading.value = false
  }
}


</script>