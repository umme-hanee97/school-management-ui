<template>
  <div>
    <h2>Student Details</h2>
    <div v-if="student">
        <div class="mb-4">
        <img :src="'data:' + student.fileType + ';base64,' + student.fileB64" alt="Student Photo" class="w-32 h-32 rounded-full object-cover mb-4">
        </div>
      <p><strong>Name:</strong> {{ student.name }}</p>
      <p><strong>Father Name:</strong> {{ student.fatherName }}</p>
      <p><strong>Mother Name:</strong> {{ student.motherName }}</p>
      <p><strong>Phone Number:</strong> {{ student.phoneNumber }}</p>
      <p><strong>Address:</strong> {{ student.address }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Class:</strong> {{ student.className }}</p>
      <p><strong>Section:</strong> {{ student.sectionName }}</p>
      <p><strong>Roll Number:</strong> {{ student.rollNumber }}</p>
      <p><strong>Class Teacher:</strong> {{ student.teacherName }}</p>
      <p><strong>Subjects:</strong><ol v-for="(subject) in student.subjectNames" :key="subject"><li>{{ subject }}</li></ol></p>
      <!-- Add more fields as needed -->
    </div>
    <div v-else>
      <p>No student data available.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewStudent',
  props: {
    student: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>
/* Add styles as needed */
</style>
