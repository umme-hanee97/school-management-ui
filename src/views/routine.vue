<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Class Routine</h1>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th class="border px-4 py-2 bg-gray-100">Day</th>
          <th v-for="period in periods" :key="period" class="border px-4 py-2 bg-gray-100">
            Period {{ period }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day, i) in days" :key="day">
          <td class="border px-4 py-2 font-semibold">{{ day }}</td>
          <td v-for="period in periods" :key="period" class="border px-4 py-2">
            {{ routine[i][period - 1] || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RoutinePage',
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      periods: [1, 2, 3, 4, 5, 6, 7, 8], // Adjust as needed
      // Mock data: Each sub-array is a day's periods
      routine: [
        ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'PE', 'History', 'Art'],
        ['English', 'Math', 'Chemistry', 'Physics', 'PE', 'Biology', 'Art', 'History'],
        ['Physics', 'Math', 'English', 'Biology', 'Chemistry', 'PE', 'History', 'Art'],
        ['Chemistry', 'English', 'Math', 'Physics', 'Biology', 'PE', 'Art', 'History'],
        ['Biology', 'Math', 'English', 'Chemistry', 'Physics', 'PE', 'History', 'Art'],
        ['PE', 'Math', 'English', 'Physics', 'Chemistry', 'Biology', 'Art', 'History'],
        ['Art', 'Math', 'English', 'Chemistry', 'Physics', 'PE', 'History', 'Biology'],
      ],
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  text-align: center;
}
</style>
