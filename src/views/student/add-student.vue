<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Student</h1>
        <p class="text-gray-600">Fill in all the required information below</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-8">
        <input type="text" v-model="formData.id" class="hidden" />

        <!-- Personal Information Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
              <input
                type="text"
                v-model="formData.name"
                placeholder="Enter student name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Father's Name</label>
              <input
                type="text"
                v-model="formData.fatherName"
                placeholder="Enter father's name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Mother's Name</label>
              <input
                type="text"
                v-model="formData.motherName"
                placeholder="Enter mother's name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                v-model="formData.email"
                placeholder="Enter email address"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                v-model="formData.contactNo"
                placeholder="Enter contact number"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div class="mt-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              v-model="formData.address"
              placeholder="Enter full address"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>

        <!-- Academic Information Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Class *</label>
              <select
                v-model="formData.classId"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="" disabled>Select a class</option>
                <option
                  v-for="(value, key) in classes"
                  :key="key"
                  :value="value.id"
                >
                  {{ value.className }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Section *</label>
              <select
                v-model="formData.sectionId"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="" disabled>Select a section</option>
                <option
                  v-for="(value, key) in sections"
                  :key="key"
                  :value="value.id"
                >
                  {{ value.sectionName }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Roll Number *</label>
              <input
                type="number"
                v-model="formData.rollNo"
                placeholder="Enter roll number"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Teacher</label>
              <select
                v-model="formData.teacherId"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" disabled>Select a teacher</option>
                <option
                  v-for="(value, key) in teachers"
                  :key="key"
                  :value="value.id"
                >
                  {{ value.teacherName }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Date of Birth Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Date of Birth</h2>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              v-model="formData.dateOfBirth"
              class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Subjects Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Subjects</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="subject in subjects"
              :key="subject.id"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :id="'subject-' + subject.id"
                :value="subject.id"
                v-model="formData.selectedSubjects"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                :for="'subject-' + subject.id"
                class="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
              >
                {{ subject.subjectName }}
              </label>
            </div>
          </div>
        </div>

        <!-- Profile Picture Section -->
        <div class="border-b pb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div
                class="flex flex-col items-center justify-center pt-5 pb-6"
                id="dropzone"
              >
                <svg
                  class="w-10 h-10 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-600">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500">
                  PNG, JPG, GIF (MAX. 5MB)
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center w-full"
              >
                <img
                  id="image-preview"
                  class="hidden max-w-xs max-h-56 object-contain rounded-lg"
                />
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="showImage"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4 pt-6">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-md transition duration-200"
          >
            {{ isLoading ? 'Creating Student...' : 'Create Student' }}
          </button>
          <button
            type="reset"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-md transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { studentService, handleApiError } from "@/services";
import "vue3-toastify/dist/index.css";

export default {
  name: "AddStudentView",
  data() {
    return {
      classes: [],
      sections: [],
      teachers: [],
      subjects: [],
      formData: {
        id: "",
        name: "",
        fatherName: "",
        motherName: "",
        email: "",
        contactNo: "",
        address: "",
        dateOfBirth: "",
        classId: "",
        sectionId: "",
        rollNo: "",
        teacherId: "",
        selectedSubjects: [],
      },
      fileB64: null,
      isLoading: false,
      isLoadingOptions: true,
    };
  },
  created() {
    this.loadAllOptions();
  },
  methods: {
    /**
     * Load all required options (classes, sections, teachers, subjects)
     */
    async loadAllOptions() {
      this.isLoadingOptions = true;
      try {
        const [classesRes, sectionsRes, teachersRes, subjectsRes] = await Promise.all([
          this.loadClasses(),
          this.loadSections(),
          this.loadTeachers(),
          this.loadSubjects(),
        ]);
        
        this.classes = classesRes || [];
        this.sections = sectionsRes || [];
        this.teachers = teachersRes || [];
        this.subjects = subjectsRes || [];
      } catch (error) {
        const errorInfo = handleApiError(error);
        toast.error(`Failed to load options: ${errorInfo.message}`);
      } finally {
        this.isLoadingOptions = false;
      }
    },

    /**
     * Load classes from API
     */
    async loadClasses() {
      try {
        const { data } = await studentService.getClasses();
        return data || [];
      } catch (error) {
        console.error("Error loading classes:", error);
        return [];
      }
    },

    /**
     * Load sections from API
     */
    async loadSections() {
      try {
        const { data } = await studentService.getSections();
        return data || [];
      } catch (error) {
        console.error("Error loading sections:", error);
        return [];
      }
    },

    /**
     * Load teachers from API
     */
    async loadTeachers() {
      try {
        const { data } = await studentService.getTeachers();
        return data || [];
      } catch (error) {
        console.error("Error loading teachers:", error);
        return [];
      }
    },

    /**
     * Load subjects from API
     */
    async loadSubjects() {
      try {
        const { data } = await studentService.getSubjects();
        return data || [];
      } catch (error) {
        console.error("Error loading subjects:", error);
        return [];
      }
    },

    /**
     * Validate form before submission
     */
    validateForm() {
      if (!this.formData.name.trim()) {
        toast.error("Student name is required");
        return false;
      }
      if (!this.formData.email.trim()) {
        toast.error("Email is required");
        return false;
      }
      if (!this.isValidEmail(this.formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
      if (!this.formData.classId) {
        toast.error("Please select a class");
        return false;
      }
      if (!this.formData.sectionId) {
        toast.error("Please select a section");
        return false;
      }
      if (!this.formData.rollNo) {
        toast.error("Roll number is required");
        return false;
      }
      return true;
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    /**
     * Submit student form
     */
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      try {
        const payload = {
          name: this.formData.name,
          fatherName: this.formData.fatherName,
          motherName: this.formData.motherName,
          email: this.formData.email,
          contactNo: this.formData.contactNo,
          address: this.formData.address,
          dateOfBirth: this.formData.dateOfBirth,
          classId: this.formData.classId,
          sectionId: this.formData.sectionId,
          rollNo: this.formData.rollNo,
          teacherId: this.formData.teacherId,
          subjectIds: this.formData.selectedSubjects,
          profilePicture: this.fileB64,
        };

        await studentService.createStudent(payload);
        
        toast.success("Student created successfully!");
        this.resetForm();
        
        setTimeout(() => {
          this.$router.push("/students");
        }, 1500);
      } catch (error) {
        const errorInfo = handleApiError(error);
        toast.error(errorInfo.message || "Failed to create student");
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Reset form to initial state
     */
    resetForm() {
      this.formData = {
        id: "",
        name: "",
        fatherName: "",
        motherName: "",
        email: "",
        contactNo: "",
        address: "",
        dateOfBirth: "",
        classId: "",
        sectionId: "",
        rollNo: "",
        teacherId: "",
        selectedSubjects: [],
      };
      this.fileB64 = null;
      const fileInput = document.getElementById("dropzone-file");
      if (fileInput) {
        fileInput.value = "";
      }
      const imagePreview = document.getElementById("image-preview");
      const svgDiv = document.getElementById("dropzone");
      if (imagePreview) {
        imagePreview.classList.add("hidden");
      }
      if (svgDiv) {
        svgDiv.classList.remove("hidden");
      }
    },

    /**
     * Handle image selection and preview
     */
    showImage() {
      const fileInput = document.getElementById("dropzone-file");
      const imagePreview = document.getElementById("image-preview");
      const svgDiv = document.getElementById("dropzone");
      const file = fileInput.files[0];

      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          fileInput.value = "";
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          fileInput.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          svgDiv.classList.add("hidden");
          imagePreview.classList.remove("hidden");
          imagePreview.src = e.target.result;
          this.fileB64 = e.target.result.split(",")[1];
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for form inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>