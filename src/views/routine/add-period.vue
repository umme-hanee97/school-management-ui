
<template>
  <div class="add-period-page max-w-xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Add Period</h2>
    <div v-if="showWeekendQuestion">
      <label class="block mb-4 font-medium">Is this a weekend?</label>
      <div class="flex gap-4 mb-6">
        <button class="btn btn-primary" @click="setWeekend(true)">Yes</button>
        <button class="btn btn-primary" @click="setWeekend(false)">No</button>
      </div>
    </div>
    <div v-else>
      <div v-if="isWeekend">
        <div class="text-yellow-700 bg-yellow-100 p-4 rounded">This is a weekend. No periods can be added.</div>
      </div>
      <form v-else @submit.prevent="handleSubmit">
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
  </div>
</template>


<script setup>
import { ref } from 'vue';

const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const showWeekendQuestion = ref(true);
const isWeekend = ref(false);

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

function setWeekend(val) {
  isWeekend.value = val;
  showWeekendQuestion.value = false;
}

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
