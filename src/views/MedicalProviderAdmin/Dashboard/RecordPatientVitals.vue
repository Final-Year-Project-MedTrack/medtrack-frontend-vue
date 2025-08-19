<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Record Patient Vitals</h2>

    <form @submit.prevent="submitVitals">
      <!-- Height -->
      <div class="mb-4">
        <label class="block text-gray-700">Height (cm)</label>
        <input
          v-model="form.height"
    
          decimal="2"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter height"
        />
      </div>

      <!-- Weight -->
      <div class="mb-4">
        <label class="block text-gray-700">Weight (kg)</label>
        <input
          v-model="form.weight"
          
          decimal="2"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter weight"
        />
      </div>

      <!-- BMI -->
      <div class="mb-4">
        <label class="block text-gray-700">BMI</label>
        <input
          v-model="form.bmi"
          
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter BMI"
        />
      </div>

      <!-- Blood Pressure -->
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700">Systolic (mmHg)</label>
          <input
            v-model="form.blood_pressure_systolic"
            type="number"
            class="mt-1 w-full border rounded p-2"
            placeholder="Systolic"
          />
        </div>
        <div>
          <label class="block text-gray-700">Diastolic (mmHg)</label>
          <input
            v-model="form.blood_pressure_diastolic"
            type="number"
            class="mt-1 w-full border rounded p-2"
            placeholder="Diastolic"
          />
        </div>
      </div>

      <!-- Temperature -->
      <div class="mb-4">
        <label class="block text-gray-700">Temperature (°C)</label>
        <input
          v-model="form.temperature"
          type="number"
          step="0.1"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter temperature"
        />
      </div>

      <!-- Heart Rate -->
      <div class="mb-4">
        <label class="block text-gray-700">Heart Rate (bpm)</label>
        <input
          v-model="form.heart_rate"
          type="number"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter heart rate"
        />
      </div>

      <!-- Respiratory Rate -->
      <div class="mb-4">
        <label class="block text-gray-700">Respiratory Rate (breaths/min)</label>
        <input
          v-model="form.respiratory_rate"
          type="number"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter respiratory rate"
        />
      </div>

      <!-- Oxygen Saturation -->
      <div class="mb-4">
        <label class="block text-gray-700">Oxygen Saturation (%)</label>
        <input
          v-model="form.oxygen_saturation"
          
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter oxygen saturation"
        />
      </div>

      <!-- Pain Level -->
      <div class="mb-4">
        <label class="block text-gray-700">Pain Level (0-10)</label>
        <input
          v-model="form.pain_level"
          type="number"
          min="0"
          max="10"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter pain level"
        />
      </div>

      <!-- Blood Glucose -->
      <div class="mb-4">
        <label class="block text-gray-700">Blood Glucose (mg/dL)</label>
        <input
          v-model="form.blood_glucose"
          type="number"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter blood glucose"
        />
      </div>

      <!-- Urine Output -->
      <div class="mb-4">
        <label class="block text-gray-700">Urine Output (ml)</label>
        <input
          v-model="form.urine_output"
          type="number"
          class="mt-1 w-full border rounded p-2"
          placeholder="Enter urine output"
        />
      </div>

      <!-- Notes -->
      <div class="mb-4">
        <label class="block text-gray-700">Notes</label>
        <textarea
          v-model="form.notes"
          class="mt-1 w-full border rounded p-2"
          placeholder="Additional notes"
        ></textarea>
      </div>

      <!-- Method of Measurement -->
      <div class="mb-4">
        <label class="block text-gray-700">Method of Measurement</label>
        <input
          v-model="form.method_of_measurement"
          type="text"
          class="mt-1 w-full border rounded p-2"
          placeholder="e.g. Manual, Digital Device"
        />
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Vitals
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import axios from "axios";
import api from '@/services/axios'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const route = useRoute();
const router = useRouter();

const patientId = route.params.patientId; // get patient_id from route param

const form = ref({
  patient_id: patientId,
  measured_by_user_id: userStore.user.id, // maybe set this from logged-in user
  medical_provider_id: userStore.selectedProviderId, // could also come from logged-in user's provider
  height: "",
  weight: "",
  bmi: "",
  blood_pressure_systolic: "",
  blood_pressure_diastolic: "",
  temperature: "",
  heart_rate: "",
  respiratory_rate: "",
  oxygen_saturation: "",
  pain_level: "",
  blood_glucose: "",
  urine_output: "",
  notes: "",
  method_of_measurement: "",
});

const submitVitals = async () => {
  try {
    await api.post("/patient-vitals/patient-vitals", form.value);
    alert("Patient vitals saved successfully");
    router.push(`/medical-provider/patients/${patientId}/vitals`);
  } catch (error) {
    console.error(error);
    alert("Error saving patient vitals");
  }
};
</script>
