import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    doctorProfile: null,
    providerUser: null,
    selectedProviderId: localStorage.getItem('selected_provider_id') || null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setProviderUser(user) {
      this.providerUser = user
      localStorage.setItem('provider_user', JSON.stringify(user))
    },
    setDoctorProfile(profile) {
      this.doctorProfile = profile
      localStorage.setItem('doctor_profile', JSON.stringify(profile))
    },
    setProviderId(id) {
      this.selectedProviderId = id
      localStorage.setItem('selected_provider_id', id)
    },
    reset() {
      this.user = null
      this.doctorProfile = null
      this.providerUser = null
      this.selectedProviderId = null
      this.token = null
      localStorage.clear()
    }
  }
})
