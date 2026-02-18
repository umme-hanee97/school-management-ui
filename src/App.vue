<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const isLoggedIn = ref(!!localStorage.getItem('authToken'))
const router = useRouter()

const handleLogin = () => {
  const token = localStorage.getItem('authToken')
  isLoggedIn.value = !!token
}

const handleStorageEvent = (event) => {
  if (event.key === 'authToken') {
    handleLogin()
  }
}

onMounted(() => {
  handleLogin()
  window.addEventListener('storage', handleStorageEvent)
  // update when route changes (e.g., after login redirect)
  router.afterEach(() => {
    handleLogin()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorageEvent)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="isLoggedIn" />
    <main class="py-6 px-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>