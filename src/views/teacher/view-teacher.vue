<template>
  <div>
    <h2>Teacher Details</h2>
    <div v-if="teacher">
      <div class="mb-4">
        <img :src="'data:' + teacher.fileType + ';base64,' + teacher.fileB64" alt="Teacher Photo" class="w-32 h-32 rounded-full object-cover mb-4">
        </div>
      <p><strong>Name:</strong> {{ teacher.name }}</p>
      <p><strong>Subject:</strong> {{ teacher.subject }}</p>
      <p><strong>Email:</strong> {{ teacher.email }}</p>
      <p><strong>Subjects:</strong><ol v-for="(subject) in teacher.subjectNames" :key="subject"><li>{{ subject }}</li></ol></p>
      <!-- Add more fields as needed -->
    </div>
    <div v-else>
      <p>No teacher data available.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewTeacher',
  props: {
    teacher: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>
/* Add styles as needed */
</style>
