<template>
  <div class="p-6 max-w-3xl mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Edit Profile</h1>
      <p class="text-sm text-gray-500">Update your personal information</p>
    </header>

    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full name</label>
          <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <input v-model="form.role" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
          <button type="button" @click="cancel" class="px-4 py-2 border rounded">Cancel</button>
        </div>

        <p v-if="message" :class="messageClass">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data() {
    return {
      form: {
        name: '',
        email: '',
        role: ''
      },
      message: '',
      messageClass: 'text-sm text-green-600',
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    apiBase() {
      return import.meta.env.VITE_API_BASE || ''
    },
    async loadProfile() {
      const username = localStorage.getItem('username')
      const authToken = localStorage.getItem('authToken')
      if (!username) {
        // fallback to stored profile
        const stored = localStorage.getItem('userProfile')
        if (stored) {
          try { this.form = JSON.parse(stored) } catch (e) {}
        }
        return
      }
      try {
        const res = await fetch(`${this.apiBase()}/api/users/${encodeURIComponent(username)}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : ''
          }
        })
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        this.form = {
          name: data.name || data.fullName || '',
          email: data.email || '',
          role: data.role || ''
        }
      } catch (e) {
        // fallback to stored profile
        const stored = localStorage.getItem('userProfile')
        if (stored) {
          try { this.form = JSON.parse(stored) } catch (err) {}
        }
      }
    },
    async saveProfile() {
      if (!this.form.name || !this.form.email) {
        this.message = 'Name and email are required.'
        this.messageClass = 'text-sm text-red-600'
        return
      }

      const username = localStorage.getItem('username') || this.form.email
      try {
        const res = await fetch(`${this.apiBase()}/api/users/${encodeURIComponent(username)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : ''
          },
          body: JSON.stringify(this.form)
        })

        if (!res.ok) {
          const err = await res.text()
          this.message = `Save failed: ${err}`
          this.messageClass = 'text-sm text-red-600'
          return
        }

        const saved = await res.json().catch(() => ({}))
        localStorage.setItem('userProfile', JSON.stringify(this.form))
        this.message = 'Profile saved.'
        this.messageClass = 'text-sm text-green-600'
        this.$router.push('/profile')
      } catch (e) {
        this.message = 'Unable to save profile.'
        this.messageClass = 'text-sm text-red-600'
      }
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
