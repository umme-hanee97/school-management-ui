<template>
  <div class="add-emergency-contact p-6 max-w-lg mx-auto bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Add Emergency Contact</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Contact Name</label>
        <input v-model="contact.name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Relationship</label>
        <input v-model="contact.relationship" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Phone Number</label>
        <input v-model="contact.phone" type="tel" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Email (optional)</label>
        <input v-model="contact.email" type="email" class="w-full border rounded px-3 py-2" />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Contact</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddEmergencyContact',
  data() {
    return {
      contact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm() {
      // TODO: Integrate with backend or service layer
      alert('Emergency contact added!');
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.add-emergency-contact {
  margin-top: 40px;
}
</style>
