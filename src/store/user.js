import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    selectedProviderId: localStorage.getItem('selected_provider_id') || null
  }),
  actions: {
    setProviderId(id) {
      this.selectedProviderId = id
      localStorage.setItem('selected_provider_id', id)
    },
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
