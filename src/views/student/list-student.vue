<template>
  <div class="p-6">
    <header class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Students</h1>
          <p class="text-sm text-gray-500">Manage and view all students</p>
        </div>
        <router-link
          to="/students/add"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Add Student
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
        <p class="text-gray-600">Loading students...</p>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Class</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Roll No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ student.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.email }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.className || "—" }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ student.rollNo || "—" }}</td>
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
                  :to="`/students/edit/${student.id}`"
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
        <div v-if="filteredStudents.length === 0" class="p-8 text-center">
          <p class="text-gray-500 mb-4">No students found</p>
          <router-link
            to="/students/add"
            class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add First Student
          </router-link>
        </div>
      </div>

      <!-- Pagination Info -->
      <div v-if="students.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p class="text-sm text-gray-600">Showing {{ students.length }} students</p>
      </div>
    </div>
  </div>
</template>

<script>
import { studentService, handleApiError } from "@/services";

export default {
  name: "ListStudentView",
  data() {
    return {
      students: [],
      searchQuery: "",
      isLoading: true,
      isDeleting: false,
      deletingId: null,
      error: "",
      successMessage: "",
    };
  },
  computed: {
    filteredStudents() {
      if (!this.searchQuery.trim()) {
        return this.students;
      }

      const query = this.searchQuery.toLowerCase();
      return this.students.filter(student => {
        return (
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
        );
      });
    },
  },
  created() {
    this.loadStudents();
  },
  methods: {
    async loadStudents() {
      this.isLoading = true;
      this.error = "";

      try {
        const { data } = await studentService.getStudents({
          page: 1,
          pageSize: 100,
        });

        this.students = Array.isArray(data) ? data : data.students || [];
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message || "Failed to load students";
        this.students = [];
      } finally {
        this.isLoading = false;
      }
    },

    async deleteStudent(studentId) {
      if (!confirm("Are you sure you want to delete this student?")) {
        return;
      }

      this.deletingId = studentId;

      try {
        await studentService.deleteStudent(studentId);
        this.students = this.students.filter(s => s.id !== studentId);
        this.successMessage = "Student deleted successfully!";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message || "Failed to delete student";
      } finally {
        this.deletingId = null;
      }
    },

    async refreshStudents() {
      await this.loadStudents();
    },
  },
};
</script>

<style scoped></style>