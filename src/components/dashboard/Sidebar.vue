<template>
  <aside class="w-64 bg-white rounded-lg p-4 shadow h-full">
    <div class="mb-6">
      <div class="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-md text-indigo-600 font-bold">SH</div>
    </div>
    <nav class="space-y-2">
      <router-link to="/dashboard" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium">Dashboard</router-link>
      <router-link to="/students" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700">Students</router-link>
      <router-link to="/teachers" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700">Teachers</router-link>
      <router-link to="/classes" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700">Classes</router-link>
      <router-link to="/profile" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700">Profile</router-link>
      <router-link to="/settings" class="block px-3 py-2 rounded hover:bg-indigo-50 text-gray-700">Settings</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped></style>
