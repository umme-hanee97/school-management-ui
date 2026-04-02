<template>
  <div>
    <h2>Teacher Details</h2>
    <div v-if="teacher">
      <p><strong>Name:</strong> {{ teacher.name }}</p>
      <p><strong>Subject:</strong> {{ teacher.subject }}</p>
      <p><strong>Email:</strong> {{ teacher.email }}</p>
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
