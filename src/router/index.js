import { createRouter, createWebHistory } from 'vue-router'
import doctorRoutes from './doctor'
import adminRoutes from './admin'
import medicalProviderRoutes from './medicalProviderAdmin'

import radiologistRoutes from './radiologist'
import accountantRoutes from './accountant'
import Login from '@/views/auth/Login.vue'
import ValidateOTP from '@/views/auth/ValidateOTP.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/otp', name: 'OTP', component: ValidateOTP },
  ...doctorRoutes,
  ...adminRoutes,
  ...medicalProviderRoutes,
  ...radiologistRoutes,
  ...accountantRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('user'))
//   const selectedProvider = localStorage.getItem('selectedProvider')

//   if (!user && to.name !== 'Login') {
//     return next({ name: 'Login' })
//   }

//   if (user?.role === 'doctor') {
//     if (!selectedProvider && to.name !== 'DoctorSelectProvider') {
//       return next({ name: 'DoctorSelectProvider' })
//     }

//     if (selectedProvider && to.name === 'DoctorSelectProvider') {
//       return next({ name: 'DoctorDashboard' })
//     }
//   }

//   next()
// })

export default router