<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Visit management</h1>
        <p class="text-sm text-gray-500">Manage patient appointments</p>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium">
        Schedule visit
      </button>
    </div>


    <div class=" mx-auto p-6 bg-white rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Create Patient Visit</h2>

    <!-- Search by NIN -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Search Patient by NIN</label>
      <div class="flex gap-2">
        <input
          v-model="nin"
          type="text"
          placeholder="Enter NIN"
          class="flex-1 px-3 py-2 border border-gray-100 rounded-lg"
        />
        <button
          @click="searchPatient"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </div>

    <!-- Patient details once selected -->
    <div v-if="patient" class="mb-6 border border-gray-100 p-4 rounded-lg bg-gray-50">
      <p><strong>Name:</strong> {{ patient.first_name }} {{ patient.last_name }}</p>
      <p><strong>Email:</strong> {{ patient.email }}</p>
      <p><strong>NIN:</strong> {{ patient.national_id }}</p>
    </div>

    <!-- Visit Form -->
    <form v-if="patient" @submit.prevent="createVisit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Visit Type</label>
        <select v-model="form.visit_type" class="w-full border border-gray-100 rounded-lg p-2">
          <option value="emergency">Emergency</option>
          <option value="routine">Routine</option>
          <option value="follow-up">Follow Up</option>
          <option value="consultation">Consultation</option>
          <!-- <option value="admission">Admission</option> -->
          <!-- <option value="emergency">Emergency</option> -->
        </select>
      </div>

      <!-- <div>
        <label class="block text-sm font-medium">Admission Date</label>
        <input type="date" v-model="form.admission_date" class="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium">Discharge Date</label>
        <input type="date" v-model="form.discharge_date" class="w-full border rounded-lg p-2" />
      </div> -->

      <!-- <div>
        <label class="block text-sm font-medium">Status</label>
        <select v-model="form.status" class="w-full border rounded-lg p-2">
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div> -->

      <div>
        <label class="block text-sm font-medium">Reason</label>
        <textarea v-model="form.reason" class="w-full border border-gray-100 rounded-lg p-2"></textarea>
      </div>

      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg">
        Create Visit
      </button>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from '@/services/axios'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const nin = ref("");
const patient = ref(null);
const error = ref(null);

const form = ref({
  patient_id: null,
  medical_provider_id: userStore.selectedProviderId, // You can auto-fill this from logged-in doctor/provider
  visit_type: "consultation",
  // admission_date: "",
  // discharge_date: "",
  // status: "ongoing",
  reason: "",
});

const searchPatient = async () => {
  error.value = null;
  patient.value = null;

  try {
    const res = await api.get(`patients/search?nin=${nin.value}`);
    patient.value = res.data;
    form.value.patient_id = res.data.patient_profile.id; // link to PatientProfile
  } catch (err) {
    error.value = "Patient not found.";
  }
};

const createVisit = async () => {
  try {
    await api.post("medical-provider/patient-visit/patient-visit", form.value);
    alert("Visit created successfully!");
    // reset form
    nin.value = "";
    patient.value = null;
    form.value = {
      patient_id: null,
      medical_provider_id: 1,
      visit_type: "consultation",
      admission_date: "",
      discharge_date: "",
      status: "ongoing",
      reason: "",
    };
  } catch (err) {
    alert("Failed to create visit.");
  }
};
</script>

<style scoped></style>
