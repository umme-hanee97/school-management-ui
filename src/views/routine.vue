
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Class {{ classId }} Section {{ sectionId }} Routine</h1>
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
        <tr v-for="(day) in days" :key="day">
          <td class="border px-4 py-2 font-semibold">{{ day }}</td>
          <template v-if="isWeekend(day)">
            <td :colspan="periods.length" class="border px-4 py-2 bg-yellow-100 text-yellow-800">Weekend</td>
          </template>
          <template v-else>
            <td v-for="period in periods" :key="period" class="border px-4 py-2">
              <template v-if="getPeriod(day, period)">
                <div class="cursor-pointer hover:bg-blue-50 p-2 rounded" @click="goToEdit(day, period)">
                  <div class="font-semibold">{{ getPeriod(day, period).subject }}</div>
                  <div class="text-xs text-gray-500">{{ getPeriod(day, period).startTime }} - {{ getPeriod(day, period).endTime }}</div>
                </div>
              </template>
              <template v-else-if="showPlus(day, period)">
                <div class="flex justify-center items-center h-full">
                  <button class="text-2xl text-blue-500 hover:text-blue-700" @click="goToAdd(day, period)">+</button>
                </div>
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RoutinePage',
  props: {
    classId: { type: String, required: false },
    sectionId: { type: String, required: false },
  },
  setup(props) {
    const router = useRouter();
    const days = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    const periods = [1, 2, 3, 4, 5, 6, 7, 8];

    // Example routine data structure: { [day]: [{subject, startTime, endTime, ...}] }
    const routine = ref({
      'Monday': [
        { subject: 'Math', startTime: '09:00', endTime: '09:45' },
        { subject: 'English', startTime: '09:50', endTime: '10:35' },
      ],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': [],
    });

    function isWeekend(day) {
      return day === 'Friday' || day === 'Saturday';
    }

    function getPeriod(day, period) {
      // periods are 1-indexed
      return routine.value[day] && routine.value[day][period - 1] ? routine.value[day][period - 1] : null;
    }

    function showPlus(day, period) {
      // Only show plus for the first empty slot
      const periodsArr = routine.value[day] || [];
      if (periodsArr.length >= 8) return false;
      return periodsArr.length + 1 === period;
    }

    function goToEdit(day, period) {
      router.push({
        path: `/routine/edit-period`,
        query: { day, period, classId: props.classId, sectionId: props.sectionId }
      });
    }

    function goToAdd(day, period) {
      router.push({
        path: `/routine/add-period`,
        query: { day, period, classId: props.classId, sectionId: props.sectionId }
      });
    }

    return {
      days,
      periods,
      routine,
      isWeekend,
      getPeriod,
      showPlus,
      goToEdit,
      goToAdd
    };
  }
};
</script>


<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  text-align: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
