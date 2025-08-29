<template>
  <div class="p-6 max-w-3xl mx-auto">
    <!-- Breadcrumb -->
    <div class="text-sm text-gray-500 mb-4">
      <a href="#" class="hover:underline">Users</a> /
      <span class="text-green-600 font-medium">Doctor name</span>
    </div>

    <!-- Header -->
    <h2 class="text-xl font-semibold text-gray-800">Medical Condition</h2>
    <p class="text-gray-500 text-sm mb-6">
      Complete vital signs assessment for Patient
    </p>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Diagnosis -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Allergy Name</label>
          <input
            type="text"
            v-model="query"
            @input="searchAllergies"
            placeholder="Tap to search conditions"
            class="mt-1 block w-full rounded-lg border border-gray-300 focus:border-green-600 focus:ring-green-600 sm:text-sm"
          />
          <!-- Dropdown results -->
          <ul
            v-if="results.length"
            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto"
          >
            <li
              v-for="condition in results"
              :key="condition.id"
              @click="selectCondition(condition)"
              class="px-4 py-2 hover:bg-green-50 cursor-pointer"
            >
              {{ condition.name }} ({{ condition.icd }})
            </li>
          </ul>
        </div>

        <!-- ICD Code -->
        <div>
          <label class="block text-sm font-medium text-gray-700">ICD-10 Code</label>
          <input
            type="text"
            v-model="form.icd"
            placeholder="Automatically Updates"
            readonly
            class="mt-1 block w-full bg-gray-100 rounded-lg border border-gray-300 sm:text-sm"
          />
        </div>

        <!-- Onset Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Diagnosis Date</label>
          <input
            type="date"
            v-model="form.diagnosis_date"
            class="mt-1 block w-full rounded-lg border border-gray-300 focus:border-green-600 focus:ring-green-600 sm:text-sm"
          />
        </div>

        <!-- Severity -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Severity</label>
          <select
            v-model="form.severity"
            class="mt-1 block w-full rounded-lg border border-gray-300 focus:border-green-600 focus:ring-green-600 sm:text-sm"
          >
            <option value="">Select severity</option>
            <option value="stage 3">Stage 3</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
      </div>

      <!-- Reason for Visit -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Reason for Visit</label>
        <textarea
          v-model="form.notes"
          rows="3"
          placeholder="Enter text here..."
          maxlength="50"
          class="mt-1 block w-full rounded-lg border border-gray-300 focus:border-green-600 focus:ring-green-600 sm:text-sm"
        ></textarea>
        <p class="mt-1 text-xs text-gray-400">
          Keep this simple of 50 characters
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="cancelForm"
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Done
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import api from "@/services/axios";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from '@/store/user'

const { proxy } = getCurrentInstance();
const query = ref("");
const results = ref([]);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore()
const patientId = route.params.patientId;

const form = reactive({
    patient_id: patientId,
    allergy_id: null,
    diagnosis: "",
    reaction: "",
    diagnosis_date: "",
    severity: "Emergency",
    notes: "",
    diagnosed_by_user_id : userStore.user.id,
    medical_provider_id: userStore.selectedProviderId
});

// API Search
const searchAllergies = async () => {
  if (query.value.length < 3) {
    results.value = [];
    return;
  }

  try {
    const response = await api.get(`allergies?search=${query.value}`);
    results.value = response.data.data.items; // Assuming API returns [{id, name, icd}]
  } catch (error) {
    console.error("Error fetching Allergies", error);
  }
};

// Select an item
const selectCondition = (allergy) => {
  form.allergy_id = allergy.id;
  form.diagnosis = allergy.allergy_name;
  form.icd_10_code = condition.icd_10_code;
  query.value = allergy.allergy_name;
  results.value = [];
};

const submitForm = async () => {
  try {
    await api.post("/patient-conditions/patient-conditions", form);
    proxy.$swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Allergy saved successfully!',
        timer: 3000,
        timerProgressBar: true,
      });
  } catch (error) {
    console.error("Error saving Allergy", error);
  }
};

const cancelForm = () => {
  query.value = "";
  results.value = [];
};
</script>
