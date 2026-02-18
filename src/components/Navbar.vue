<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center text-indigo-600 font-semibold">
            <router-link to="/" class="text-lg">SchoolMgmt</router-link>
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/dashboard" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-700" active-class="border-indigo-500 text-indigo-700">Dashboard</router-link>
            <router-link to="/student/list-student" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-700" active-class="border-indigo-500 text-indigo-700">Students</router-link>
            <router-link to="/profile" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-700" active-class="border-indigo-500 text-indigo-700">Profile</router-link>
          </div>
        </div>

        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <router-link to="/security/login" class="text-sm text-gray-600 hover:text-gray-900">Sign in</router-link>
        </div>

        <div class="-mr-2 flex items-center sm:hidden">
          <button @click="open = !open" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!open" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-show="open" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/dashboard" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-500" active-class="bg-indigo-50 border-indigo-500 text-indigo-700">Dashboard</router-link>
        <router-link to="/student/list-student" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-500" active-class="bg-indigo-50 border-indigo-500 text-indigo-700">Students</router-link>
        <router-link to="/profile" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-500" active-class="bg-indigo-50 border-indigo-500 text-indigo-700">Profile</router-link>
        <router-link to="/security/login" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-500" active-class="bg-indigo-50 border-indigo-500 text-indigo-700">Sign in</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
/* Tailwind provides the styling; leave room for custom tweaks */
</style>
