<template>
  <div class="item-center w-1/3 m-auto mt-10 shadow-2xl rounded-lg p-10">
    <form @submit.prevent="submitForm">
        <h1 class="text-2xl place-self-center">Register</h1>
      <input type="text" v-model="formData.id" class="hidden" />
      <div class="w-5/6 m-auto space-y-4">
        <fwb-Input
          label="Name"
          input-class="input-style"
          placeholder="Enter Your Name"
          v-model="formData.name"
        />
        <fwb-Input
          label="Email"
          input-class="input-style"
          placeholder="Enter Your Email"
          v-model="formData.email"
        />
        <div>
          <label class="text-sm font-semibold">Class</label><br />
          <select class="select-style" v-model="formData.classId">
            <option selected disabled>Select One</option>
            <option
              v-for="(value, key) in classes"
              :key="key"
              :value="value.id"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-sm font-semibold">Section</label><br />
          <select class="select-style" v-model="formData.sectionId">
            <option selected disabled>Select One</option>
            <option
              v-for="(value, key) in sections"
              :key="key"
              :value="value.id"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <fwb-Input
          type="number"
          label="Roll No."
          input-class="input-style"
          placeholder="Enter Your Roll No"
          v-model="formData.rollNo"
        />
        <div>
          <label class="text-sm font-semibold">Photo</label>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border border-sky-200 rounded-md cursor-pointer bg-slate-50"
            >
              <div
                class="flex flex-col items-center justify-center pt-5 pb-6"
                id="dropzone"
              >
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center w-full h-screen"
              >
                <img
                  id="image-preview"
                  class="hidden w-4/5 h-4/5 object-cover rounded-md"
                />
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="showImage"
              />
            </label>
          </div>
        </div>
        <fwb-button gradient="cyan-blue" class="w-full" type="submit"
          >Create Account</fwb-button
        >
      </div>
    </form>
    <div class="place-self-center mt-3">Already Have and account? <a href="" class="hover:underline decoration-solid">Log In</a> </div>
  </div>
</template>

<script>
import { FwbSelect, FwbInput, FwbFileInput, FwbButton } from "flowbite-vue";
import { toast } from "vue3-toastify";
import { studentService, handleApiError } from "@/services";
import "vue3-toastify/dist/index.css";

export default {
  name: "AddStudentView",
  components: { FwbSelect, FwbInput, FwbFileInput, FwbButton },
  data() {
    return {
      classes: [],
      sections: [],
      formData: {
        id: "",
        name: "",
        email: "",
        classId: "",
        sectionId: "",
        rollNo: "",
      },
      fileB64: null,
      isLoading: false,
      isLoadingOptions: true,
    };
  },
  created() {
    this.loadClassesAndSections();
  },
  methods: {
    /**
     * Load available classes and sections
     */
    async loadClassesAndSections() {
      this.isLoadingOptions = true;
      try {
        // Load both in parallel
        const [classesRes, sectionsRes] = await Promise.all([
          this.loadClasses(),
          this.loadSections(),
        ]);
        
        this.classes = classesRes || [];
        this.sections = sectionsRes || [];
      } catch (error) {
        const errorInfo = handleApiError(error);
        toast.error(`Failed to load options: ${errorInfo.message}`);
      } finally {
        this.isLoadingOptions = false;
      }
    },

    /**
     * Load classes from API (can be customized based on backend)
     */
    async loadClasses() {
      try {
        // Using studentService - adjust endpoint if needed
        const { data } = await studentService.getStudents({ page: 1, pageSize: 1000 });
        // This is a placeholder - adjust based on actual API structure
        return [];
      } catch (error) {
        console.error("Error loading classes:", error);
        return [];
      }
    },

    /**
     * Load sections from API (can be customized based on backend)
     */
    async loadSections() {
      try {
        // This is a placeholder - adjust based on actual API structure
        return [];
      } catch (error) {
        console.error("Error loading sections:", error);
        return [];
      }
    },

    /**
     * Validate form before submission
     */
    validateForm() {
      if (!this.formData.name.trim()) {
        toast.error("Name is required");
        return false;
      }
      if (!this.formData.email.trim()) {
        toast.error("Email is required");
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
          email: this.formData.email,
          classId: this.formData.classId,
          sectionId: this.formData.sectionId,
          rollNo: this.formData.rollNo,
          photo: this.fileB64,
        };

        // Use studentService to create student
        await studentService.createStudent(payload);
        
        toast.success("Student created successfully!");
        
        // Reset form
        this.resetForm();
        
        // Redirect after 1.5 seconds
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
        email: "",
        classId: "",
        sectionId: "",
        rollNo: "",
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
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
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

<style></style>