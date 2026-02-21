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
import { dashboardService, handleApiError } from '@/services';

export default {
  name: 'DashboardView',
  components: { Sidebar, StatCard },
  data() {
    return {
      stats: { students: 0, teachers: 0, classes: 0 },
      recent: [],
      events: [],
      isLoading: true,
      error: '',
    };
  },
  created() {
    this.loadDashboardData();
  },
  methods: {
    async loadDashboardData() {
      this.isLoading = true;
      this.error = '';

      try {
        // Load all dashboard data in parallel
        const [statsRes, studentsRes, eventsRes] = await Promise.all([
          dashboardService.getStats().catch(() => ({ data: {} })),
          dashboardService.getRecentStudents({ limit: 5 }).catch(() => ({ data: [] })),
          dashboardService.getUpcomingEvents({ limit: 5 }).catch(() => ({ data: [] })),
        ]);

        // Process stats
        const statsData = statsRes.data;
        this.stats = {
          students: statsData.studentCount || 0,
          teachers: statsData.teacherCount || 0,
          classes: statsData.classCount || 0,
        };

        // Process recent students
        this.recent = studentsRes.data.map(student => ({
          id: student.id,
          name: student.name || student.fullName || 'N/A',
          class: student.className || 'N/A',
          status: student.status || 'Active',
        }));

        // Process events
        this.events = eventsRes.data.map(event => ({
          id: event.id,
          title: event.title || event.name || 'N/A',
          date: event.date || new Date().toLocaleDateString(),
        }));

        // Fallback to sample data if no data received
        if (this.recent.length === 0) {
          this.populateSampleData();
        }
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message;
        this.populateSampleData();
      } finally {
        this.isLoading = false;
      }
    },

    populateSampleData() {
      this.recent = [
        { id: 1, name: 'Aisha Khan', class: 'Grade 10', status: 'Active' },
        { id: 2, name: 'Samuel Lee', class: 'Grade 8', status: 'Active' },
        { id: 3, name: 'Maria Gomez', class: 'Grade 9', status: 'Pending' },
      ];

      this.events = [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'Mar 5' },
        { id: 2, title: 'Midterm Exams', date: 'Mar 20' },
      ];

      if (this.stats.students === 0) {
        this.stats = { students: 1240, teachers: 58, classes: 32 };
      }
    },

    async refreshDashboard() {
      await this.loadDashboardData();
    },
  },
};
</script>

<style scoped></style>
