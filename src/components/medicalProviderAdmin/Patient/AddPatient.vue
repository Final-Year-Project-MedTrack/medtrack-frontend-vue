<template>
  <div class="flex w-full max-w-5xl mx-auto">
    <!-- Left Section: Form -->
    <div class="w-2/3 p-6 border rounded-lg shadow bg-white">
      <h2 class="text-xl font-semibold">Personal Information</h2>
      <p class="text-gray-500 mb-6">
        Fill in your personal information to proceed to the next step
      </p>

      <!-- Step 1: Personal Information -->
      <div v-if="step === 1" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <input v-model="form.surname" type="text" placeholder="Surname" class="input" />
          <input v-model="form.other_names" type="text" placeholder="Other names" class="input" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <input v-model="form.dob" type="date" class="input" />
          <select v-model="form.gender" class="input">
            <option disabled value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select v-model="form.marital_status" class="input">
            <option disabled value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
          <input v-model="form.occupation" type="text" placeholder="Occupation" class="input" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select v-model="form.religion" class="input">
            <option disabled value="">Religion</option>
            <option>Christianity</option>
            <option>Islam</option>
            <option>Other</option>
          </select>
          <input v-model="form.ethnicity" type="text" placeholder="Ethnicity" class="input" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <input v-model="form.lga" type="text" placeholder="L.G.A" class="input" />
          <input v-model="form.state_of_origin" type="text" placeholder="State of Origin" class="input" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select v-model="form.nationality" class="input">
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>Kenya</option>
          </select>
          <input v-model="form.nin" type="text" placeholder="NIN" class="input" />
        </div>
      </div>

      <!-- Step 2: Contact & Emergency -->
      <div v-if="step === 2" class="space-y-4">
        <input v-model="form.phone" type="text" placeholder="Phone Number" class="input" />
        <input v-model="form.email" type="email" placeholder="Email" class="input" />
        <input v-model="form.address" type="text" placeholder="Address" class="input" />
        <input v-model="form.emergency_contact" type="text" placeholder="Emergency Contact Name" class="input" />
        <input v-model="form.emergency_phone" type="text" placeholder="Emergency Phone Number" class="input" />
      </div>

      <!-- Step 3: Next of Kin -->
      <div v-if="step === 3" class="space-y-4">
        <input v-model="form.kin_name" type="text" placeholder="Next of Kin Name" class="input" />
        <input v-model="form.kin_relationship" type="text" placeholder="Relationship" class="input" />
        <input v-model="form.kin_phone" type="text" placeholder="Kin Phone Number" class="input" />
        <input v-model="form.kin_address" type="text" placeholder="Kin Address" class="input" />
      </div>

      <!-- Actions -->
      <div class="flex justify-between mt-6">
        <button
          v-if="step > 1"
          @click="step--"
          class="px-4 py-2 rounded border bg-gray-100"
        >
          Back
        </button>
        <button
          v-if="step < 3"
          @click="step++"
          class="px-4 py-2 rounded bg-gray-700 text-white"
        >
          Next Step
        </button>
        <button
          v-else
          @click="submitForm"
          class="px-4 py-2 rounded bg-green-600 text-white"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- Right Section: Stepper -->
    <div class="w-1/3 p-6">
      <ul class="space-y-6">
        <li
          v-for="n in steps"
          :key="n.id"
          class="flex items-center space-x-3"
        >
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full border"
            :class="step === n.id ? 'bg-green-600 text-white border-green-600' : 'border-gray-400'"
          >
            {{ n.id }}
          </div>
          <span
            :class="step === n.id ? 'font-semibold text-gray-900' : 'text-gray-500'"
          >
            {{ n.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const step = ref(1)

const steps = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Contact and Emergency Information" },
  { id: 3, label: "Next of Kin" },
]

const form = ref({
  surname: "",
  other_names: "",
  dob: "",
  gender: "",
  marital_status: "",
  occupation: "",
  religion: "",
  ethnicity: "",
  lga: "",
  state_of_origin: "",
  nationality: "Nigeria",
  nin: "",

  // Step 2
  phone: "",
  email: "",
  address: "",
  emergency_contact: "",
  emergency_phone: "",

  // Step 3
  kin_name: "",
  kin_relationship: "",
  kin_phone: "",
  kin_address: "",
})

const submitForm = () => {
  console.log("Submitting form", form.value)
  alert("Form submitted successfully ✅")
}
</script>

<style>
.input {
  @apply w-full p-2 border rounded;
}
</style>
