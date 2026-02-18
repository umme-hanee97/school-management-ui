<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Profile</h1>
      <p class="text-sm text-gray-500">Manage your account details and preferences</p>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProfileCard :user="user" />

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="font-semibold mb-4">About</h2>
        <p class="text-sm text-gray-600">This is a minimal profile layout. Add additional fields, activity logs, or settings here as needed.</p>

        <div class="mt-6">
          <h3 class="font-medium mb-2">Contact</h3>
          <p class="text-sm text-gray-700">Email: <span class="font-medium">{{ user.email }}</span></p>
          <p class="text-sm text-gray-700">Phone: <span class="font-medium">{{ user.phone || '—' }}</span></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileCard from '@/components/profile/ProfileCard.vue'

export default {
  name: 'ProfileView',
  components: { ProfileCard },
  data() {
    const defaultUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555 123 4567',
      role: 'Administrator'
    }

    let stored = null
    try {
      stored = JSON.parse(localStorage.getItem('userProfile'))
    } catch (e) {
      stored = null
    }

    return {
      user: stored || defaultUser
    }
  }
}
</script>

<style scoped></style>
