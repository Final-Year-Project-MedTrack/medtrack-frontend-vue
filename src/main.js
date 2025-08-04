// src/main.js
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // 👈 import Pinia
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import 'flowbite'

const app = createApp(App)

const pinia = createPinia()         // 👈 create a Pinia instance
pinia.use(piniaPersistedstate)

app.use(pinia)                      // 👈 register Pinia
app.use(router)

app.mount('#app')
