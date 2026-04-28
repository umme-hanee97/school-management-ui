<template>
  <div class="add-period-page max-w-xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Add Period</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Day</label>
        <select v-model="form.day" class="input">
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Class</label>
        <input v-model="form.class" type="text" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Section</label>
        <input v-model="form.section" type="text" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Subject</label>
        <input v-model="form.subject" type="text" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Teacher</label>
        <input v-model="form.teacher" type="text" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Start Time</label>
        <input v-model="form.startTime" type="time" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">End Time</label>
        <input v-model="form.endTime" type="time" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Duration (minutes)</label>
        <input v-model.number="form.duration" type="number" min="1" class="input" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Room Number</label>
        <input v-model="form.roomNumber" type="text" class="input" required />
      </div>
      <button type="submit" class="btn btn-primary w-full">Add Period</button>
    </form>
    <div v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const form = ref({
  day: days[0],
  class: '',
  section: '',
  subject: '',
  teacher: '',
  startTime: '',
  endTime: '',
  duration: '',
  roomNumber: ''
});

const successMessage = ref('');

function handleSubmit() {
  // TODO: Replace with API call or service integration
  successMessage.value = 'Period added successfully!';
  // Reset form
  form.value = {
    day: days[0],
    class: '',
    section: '',
    subject: '',
    teacher: '',
    startTime: '',
    endTime: '',
    duration: '',
    roomNumber: ''
  };
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #1d4ed8;
}
</style>
