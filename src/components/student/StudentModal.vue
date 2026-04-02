<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
      <ViewStudent :student="student" />
    </div>
  </div>
</template>

<script>
import ViewStudent from '@/views/student/view-student.vue';
export default {
  name: 'StudentModal',
  components: { ViewStudent },
  props: {
    show: Boolean,
    student: Object
  }
}
</script>

<style scoped>
</style>
