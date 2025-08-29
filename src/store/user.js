import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    doctorProfile: null,
    providerUser: null,
    medicalProvider: null,
    medicalProviderUserPriority: null,
    selectedProviderId: null,
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
    setProviderUser(user) {
      this.providerUser = user
    },
    setDoctorProfile(profile) {
      this.doctorProfile = profile
    },
    setProviderId(id) {
      this.selectedProviderId = id
    },
    setMedicalProvider(provider) {
      this.medicalProvider = provider
    },
    setMedicalProviderUserPriority(priority) {
      this.medicalProviderUserPriority = priority
    },
    reset() {
      this.user = null
      this.doctorProfile = null
      this.providerUser = null
      this.medicalProvider = null
      this.medicalProviderUserPriority = null
      this.selectedProviderId = null
      this.token = null
    }
  },

  persist: true, // to enable persistence
})
