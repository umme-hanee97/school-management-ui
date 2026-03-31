<template>
  <div class="p-6">
    <header class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Teachers</h1>
          <p class="text-sm text-gray-500">Manage and view all teachers</p>
        </div>
        <router-link
          to="/teachers/add"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Add Teacher
        </router-link>
      </div>
    </header>

    <!-- Alert Messages -->
    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700 text-sm font-medium">{{ error }}</p>
    </div>

    <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="text-center">
        <div class="animate-spin text-indigo-600 mb-4">⏳</div>
        <p class="text-gray-600">Loading teachers...</p>
      </div>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Search and Filter -->
      <div class="p-4 border-b border-gray-200">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="student in filteredTeachers" :key="student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ student.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.email }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.phoneNumber || "—" }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.address || "—" }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    {
                      'bg-green-100 text-green-800': student.status === 'Active',
                      'bg-yellow-100 text-yellow-800': student.status === 'Pending',
                      'bg-red-100 text-red-800': student.status === 'Inactive',
                    },
                  ]"
                >
                  {{ student.status || "Active" }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm space-x-2">
                <router-link
                  :to="`/teachers/edit/${student.id}`"
                  class="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteStudent(student.id)"
                  :disabled="deletingId === student.id"
                  class="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                >
                  {{ deletingId === student.id ? "Deleting..." : "Delete" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTeachers.length === 0" class="p-8 text-center">
          <p class="text-gray-500 mb-4">No teachers found</p>
          <router-link
            to="/teachers/add"
            class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add First Student
          </router-link>
        </div>
      </div>

      <!-- Pagination Info -->
      <div v-if="teachers.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p class="text-sm text-gray-600">Showing {{ teachers.length }} teachers</p>
      </div>
    </div>
  </div>
</template>

<script>
import { handleApiError } from "@/services";
import teacherService from "@/services/teacherservice";

export default {
  name: "ListTeacherView",
  data() {
    return {
      teachers: [],
      searchQuery: "",
      isLoading: true,
      isDeleting: false,
      deletingId: null,
      error: "",
      successMessage: "",
    };
  },
  computed: {
    filteredTeachers() {
      if (!this.searchQuery.trim()) {
        return this.teachers;
      }

      const query = this.searchQuery.toLowerCase();
      return this.teachers.filter(teacher => {
        return (
          teacher.name.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query)
        );
      });
    },
  },
  created() {
    this.loadTeachers();
  },
  methods: {
    async loadTeachers() {
      this.isLoading = true;
      this.error = "";

      try {
        const { data } = await teacherService.getTeachers({
          page: 1,
          pageSize: 100,
        });

        this.teachers = Array.isArray(data) ? data : data.teachers || [];
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message || "Failed to load teachers";
        this.teachers = [];
      } finally {
        this.isLoading = false;
      }
    },

    async deleteStudent(teacherId) {
      if (!confirm("Are you sure you want to delete this teacher?")) {
        return;
      }

      this.deletingId = teacherId;

      try {
        await teacherService.deleteStudent(teacherId);
        this.teachers = this.teachers.filter(s => s.id !== teacherId);
        this.successMessage = "Teacher deleted successfully!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message || "Failed to delete teacher";
      } finally {
        this.deletingId = null;
      }
    },

    async refreshTeachers() {
      await this.loadTeachers();
    },
  },
};
</script>

<style scoped></style>