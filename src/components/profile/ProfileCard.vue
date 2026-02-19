<template>
  <div class="bg-white rounded-lg shadow p-6 w-full max-w-md">
    <div class="flex items-center gap-4">
      <div class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">{{ initials }}</div>
      <div>
        <h3 class="text-lg font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm text-gray-600">Role: <span class="font-medium">{{ user.role || 'N/A' }}</span></p>
    </div>
    <div class="mt-6 flex gap-2">
    <router-link :to="{ name: 'ProfileEdit', params: { username: user.username } }" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Edit Profile</router-link>
      <button class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Change Password</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    user: { type: Object, required: true },
  },
  computed: {
    initials() {
      
      const name = (this.user && this.user.name) || '';
      if (name) {
        return name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
      }
      const email = (this.user && this.user.email) || '';
      return (email[0] || 'U').toUpperCase();
    }
  }
}
</script>

<style scoped></style>
