
<script setup>
import { ref, onMounted } from 'vue'

const otp = ref(['', '', '', '', '', ''])
const otpInput = ref([])

const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    otp.value[index] = value
    if (value && index < otp.value.length - 1) {
        otpInput.value[index + 1].focus()
    }
}

const handleKeyDown = (e, index) => {
    const key = e.key
    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab') {
        e.preventDefault()
    }

    if ((key === 'Backspace' || key === 'Delete') && !otp.value[index]) {
        if (index > 0) {
            otpInput.value[index - 1].focus()
        }
    }
}

const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, otp.value.length)
    paste.split('').forEach((char, i) => {
        otp.value[i] = char
    })
    const last = paste.length - 1
    if (otpInput.value[last]) otpInput.value[last].focus()
}

const submitOtp = () => {
    const code = otp.value.join('')
    console.log('Submitted OTP:', code)
    // Add your API logic here
}

onMounted(() => {
    // Focus first input when mounted
    otpInput.value[0]?.focus()
})
</script>
<template>
    <div class="w-full max-w-6xl mx-auto md:flex md:flex-row sm:flex-col min-h-screen">
        <!-- Left Section -->
        <div
            class="bg-custom-light-green p-8 sm:hidden md:block md:p-12 md:w-1/2 relative overflow-hidden rounded-[30px] h-full">
            <div class="z-10 relative">
                <!-- <h2 class="text-2xl font-bold mb-6">Your Logo</h2> -->
                <div class="mb-8">
                    <img src="../../assets/Page-heading-logo.png" alt=""></img>
                </div>
                <div class="mt-16 md:mt-16 pt-32">
                    <h1 class="text-7xl md:text-7xl font-bold mb-4">Access <span class="text-[#55a73c]">Patient
                            Records</span> with Confidence</h1>
                    <!-- <h2 class="text-2xl md:text-3xl font-semibold mb-6">Lorem Ipsum is simply</h2> -->
                    <p class="max-w-md opacity-90 text-gray-500 pt-8">
                        Our intelligent records system is designed to streamline patient care, giving healthcare
                        professionals instant access to medical histories, lab results, and prescriptions - securely and
                        reliably
                    </p>
                </div>
            </div>

            <div class="padding-top-50">

                <div class="block max-w-lg p-4 bg-custom-deep-green rounded-[20px] shadow-sm ">
                    <p class="text-sm text-[#F2FDEE] dark:text-[#F2FDEE]">“MediTrack has redefined how we manage patient
                        information. It’s intuitive, fast, and ensures our data remains protected at all times. A
                        critical tool in delivering high-quality healthcare.”
                    </p>
                    <div class="pt-3 flex">
                        <div class="mr-3">
                            <img class="w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1508002366005-75a695ee2d17?fm=jpg"
                                alt="Rounded avatar"></img>
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

                <div class="mb-8 text-center">
                    <!-- <p class="text-gray-600 mb-1">
            Welcome back!
          </p> -->
                    <h1 class="text-4xl font-bold">OTP Verification</h1>
                    <p class="text-gray-600 mb-1">
                        Please enter the OTP sent to your email address or phone number
                    </p>
                </div>

                <form>
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <div class="flex items-center justify-center gap-3">
                                <input v-for="(digit, index) in otp" :key="index" ref="otpInput" v-model="otp[index]"
                                    type="text" maxlength="1"
                                    class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    @keydown="handleKeyDown($event, index)" @input="handleInput($event, index)"
                                    @paste="handlePaste" @focus="$event.target.select()" />
                            </div>
                        </div>
                        <button type="submit"
                            class="w-full h-12 btn-main-green  text-white font-medium rounded-md transition duration-200">
                            Continue
                        </button>
                        <div class="text-center">
                            <a href="#" class=" text-gray-500 text-sm">Resend OTP in (03:26)</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <!-- <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div> -->
</template>

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
