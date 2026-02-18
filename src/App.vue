<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const isLoggedIn = ref(false)
const router = useRouter()

const handleLogin = () => {
  const token = localStorage.getItem('authToken')
  console.log('Checking login status, token:', token)
  if (token) {
    isLoggedIn.value = true
  }
}

onMounted(() => {
  handleLogin()
  console.log('Is logged in:', isLoggedIn.value)
})

// Watch for route changes to update login status
router.afterEach(() => {
  handleLogin()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-show="isLoggedIn" />
    <main class="py-6 px-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>