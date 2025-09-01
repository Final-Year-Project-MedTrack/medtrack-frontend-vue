<!-- DashboardNav.vue -->
<template>
  <header class="w-full bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left: Logo + Dashboard Label -->
      <div class="flex items-center gap-4">
        <HomeIcon class="w-5 h-5 text-gray-500" />
        <span class="text-lg font-semibold">Doctor Dashboard</span>
        <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full uppercase">New</span>
      </div>

      <!-- Center: Search -->
      <div class="flex-1 mx-8 max-w-md">
        <div class="relative">
          <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search here..."
            class="w-full pl-10 pr-4 py-2 border-gray-100 rounded-lg text-sm focus:ring focus:ring-blue-100"
          />
        </div>
      </div>

      <!-- Right: Notification + Profile Dropdown -->
      <div class="flex items-center gap-4">
        <BellIcon class="w-5 h-5 text-gray-500" />

        <Menu as="div" class="relative">
          <MenuButton class="focus:outline-none">
            <img
              src="https://ui-avatars.com/api/?name=Daniel&background=000000&color=ffffff"
              class="w-8 h-8 rounded-full border-2 border-white ring-2 ring-green-500"
              alt="User Avatar"
            />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enter-from="transform opacity-0 scale-95"
            enter-to="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leave-from="transform opacity-100 scale-100"
            leave-to="transform opacity-0 scale-95"
          >
            <MenuItems class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <MenuItem v-slot="{ active }">
                <a :class="menuItemClass(active)" href="#">Profile</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a :class="menuItemClass(active)" href="#">Settings</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a :class="menuItemClass(active)" v-on:click="logout">Logout</a>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  BellIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import api from '@/services/axios'

const userStore = useUserStore()
const router = useRouter()
function menuItemClass(active) {
  return [
    'block w-full text-left px-4 py-2 text-sm',
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
  ].join(' ')
}


async function logout(){
    try {
        await api.post('auth/logout'); 

        userStore.reset()
        router.push({ name: 'Login' });
    } catch (error) {
        userStore.reset()
        router.push({ name: 'Login' });
        console.error('Logout failed:', error);
    }
}
</script>

<style scoped>
/* Optional: prevent avatar outline overlap */
img {
  object-fit: cover;
}
</style>
