<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto flex gap-6">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main content -->
      <div class="flex-1">
        <header class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div class="flex items-center gap-4">
            <input placeholder="Search" class="px-3 py-2 border rounded-lg" />
            <div class="bg-white px-3 py-2 rounded-lg shadow">Admin</div>
          </div>
        </header>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Students" :value="stats.students" iconBg="bg-indigo-500"> 
            <template #icon>🎒</template>
          </StatCard>
          <StatCard title="Teachers" :value="stats.teachers" iconBg="bg-green-500"> 
            <template #icon>🧑‍🏫</template>
          </StatCard>
          <StatCard title="Classes" :value="stats.classes" iconBg="bg-yellow-500"> 
            <template #icon>🏫</template>
          </StatCard>
        </div>

        <!-- Recent Students table and activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="font-semibold mb-3">Recent Students</h2>
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="text-gray-500">
                  <th class="pb-2">Name</th>
                  <th class="pb-2">Class</th>
                  <th class="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in recent" :key="student.id" class="border-t">
                  <td class="py-2">{{ student.name }}</td>
                  <td class="py-2">{{ student.class }}</td>
                  <td class="py-2 text-sm text-gray-600">{{ student.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="font-semibold mb-3">Upcoming Events</h2>
            <ul class="text-sm text-gray-700 space-y-2">
              <li v-for="event in events" :key="event.id">• {{ event.title }} — <span class="text-gray-500">{{ event.date }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/dashboard/Sidebar.vue';
import StatCard from '@/components/dashboard/StatCard.vue';

export default {
  name: 'DashboardView',
  components: { Sidebar, StatCard },
  data() {
    return {
      stats: { students: 1240, teachers: 58, classes: 32 },
      recent: [
        { id: 1, name: 'Aisha Khan', class: 'Grade 10', status: 'Active' },
        { id: 2, name: 'Samuel Lee', class: 'Grade 8', status: 'Active' },
        { id: 3, name: 'Maria Gomez', class: 'Grade 9', status: 'Pending' },
      ],
      events: [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'Mar 5' },
        { id: 2, title: 'Midterm Exams', date: 'Mar 20' },
      ],
    };
  },
};
</script>

<style scoped></style>
