<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Add New Teacher</h1>
        <p class="text-gray-600">
          Fill in the information below to add a new teacher to the system
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-8 space-y-6">
          <!-- Name Field -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Full Name <span class="text-red-600">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Enter teacher's full name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Email Address <span class="text-red-600">*</span>
            </label>
            <input
              id="email"
              :value="formData.email"
              type="email"
              placeholder="Enter teacher's email address"
              required
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone Number Field -->
          <div>
            <label
              for="phoneNumber"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Phone Number <span class="text-red-600">*</span>
            </label>
            <input
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              placeholder="Enter teacher's phone number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <p v-if="errors.phoneNumber" class="mt-1 text-sm text-red-600">
              {{ errors.phoneNumber }}
            </p>
          </div>

          <!-- Address Field -->
          <div>
            <label
              for="address"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Address <span class="text-red-600">*</span>
            </label>
            <textarea
              id="address"
              v-model="formData.address"
              placeholder="Enter teacher's address"
              rows="3"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            ></textarea>
            <p v-if="errors.address" class="mt-1 text-sm text-red-600">
              {{ errors.address }}
            </p>
          </div>

          <!-- Date of Birth Field -->
          <div>
            <label
              for="dateOfBirth"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Date of Birth <span class="text-red-600">*</span>
            </label>
            <input
              id="dateOfBirth"
              v-model="formData.dateOfBirth"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-red-600">
              {{ errors.dateOfBirth }}
            </p>
          </div>

          <!-- Subject Field -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">
              Subject <span class="text-red-600">*</span>
            </label>
            <div
              class="space-y-2 p-4 border border-gray-300 rounded-lg bg-gray-50"
            >
              <div
                v-if="subjects.length === 0"
                class="text-gray-500 text-sm text-center py-4"
              >
                Loading subjects...
              </div>
              <div
                v-for="subject in subjects"
                :key="subject.id"
                class="flex items-center"
              >
                <input
                  :id="`subject-${subject.id}`"
                  type="checkbox"
                  :checked="formData.subjectIds.includes(subject.id)"
                  @change="
                    (event) => toggleSubject(subject.id, event.target.checked)
                  "
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  :for="`subject-${subject.id}`"
                  class="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {{ subject.subjectName }}
                </label>
              </div>
            </div>
            <p v-if="errors.subject" class="mt-1 text-sm text-red-600">
              {{ errors.subject }}
            </p>
          </div>

          <!-- Profile Picture Upload -->
          <div>
            <label
              for="profilePicture"
              class="block text-sm font-medium text-gray-900 mb-2"
            >
              Profile Picture <span class="text-gray-500">(Optional)</span>
            </label>
            <div class="relative">
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                @change="handleFileUpload"
                class="sr-only"
              />
              <!-- Image Preview -->
              <div
                v-if="formData.fileB64"
                class="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100"
              >
                <img
                  :src="'data:'+formData.fileType+';base64,'+formData.fileB64"
                  :alt="formData.fileName"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
                >
                  <label
                    for="profilePicture"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors flex items-center gap-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Change
                  </label>
                  <button
                    type="button"
                    @click="removeImage"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
                <div
                  class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ formData.fileName }}
                </div>
              </div>

              <!-- Upload Placeholder -->
              <label
                v-else
                for="profilePicture"
                class="flex items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div class="text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V12a4 4 0 00-4-4zm0 0V4m0 4a4 4 0 014 4v8m0 0l-6-6m6 6l6-6"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="mt-2 text-sm text-gray-600">
                    <span class="font-medium text-blue-600 hover:text-blue-700"
                      >Click to upload</span
                    >
                    or drag and drop
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="isLoading"
              id="submitBtn"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                v-if="!isLoading"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <svg
                v-else
                class="animate-spin w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {{ isLoading ? "Saving..." : "Add Teacher" }}
            </button>
            <button
              type="reset"
              @click="resetForm"
              class="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
      >
        <svg
          class="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lookupService from "@/services/lookupService";
import teacherService from "@/services/teacherservice";
import { profileService } from "@/services";
import { reactive, ref, onMounted } from "vue";
// import router from "@/router";

export default {
  props: {
    username: { type: String, required: true },
  },
  setup(props) {
    const formData = reactive({
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      subjectIds: [],
      fileB64: "",
      fileType: "",
      fileName: "",
    });

    // const fileB64 = ref("");
    // const fileName = ref("");
    const isLoading = ref(false);
    const subjects = ref([]);
    const errors = reactive({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      subject: "",
    });
    const successMessage = ref("");

    const loadProfile = async () => {
      try {
        const { data } = await profileService.getProfile(props.username);
        formData.email = data.email || "";
        const teacherData = await teacherService.getTeacherByEmail(data.email);
        // const submitBtn = document.getElementById("submitBtn");
        if (teacherData != null) {
          formData.id = teacherData.data.id;
          formData.name = teacherData.data.name;
          formData.email = teacherData.data.email;
          formData.phoneNumber = teacherData.data.phoneNumber;
          formData.address = teacherData.data.address;
          formData.dateOfBirth = teacherData.data.dateOfBirth;
          formData.subjectIds = teacherData.data.subjectIds;
          formData.fileB64 = teacherData.data.fileB64;
          formData.fileType = teacherData.data.fileType;
          formData.fileName = teacherData.data.fileName;
          // submitBtn.innerText = this.isLoading ? "Updating..." : "Update Teacher" ;
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        formData.email = "";
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await lookupService.getSubjects();
        subjects.value = response.data;
      } catch (error) {
        console.error("Error fetching subjects:", error);
        // Fallback data for testing
        subjects.value = [
          { id: 1, subjectName: "Mathematics", subjectCode: "MATH" },
          { id: 2, subjectName: "Science", subjectCode: "SCI" },
          { id: 3, subjectName: "English", subjectCode: "ENG" },
          { id: 4, subjectName: "History", subjectCode: "HIST" },
          { id: 5, subjectName: "Geography", subjectCode: "GEO" },
        ];
      }
    };

    const toggleSubject = (subjectId, isChecked) => {
      if (isChecked) {
        if (!formData.subjectIds.includes(subjectId)) {
          formData.subjectIds.push(subjectId);
        }
      } else {
        formData.subjectIds = formData.subjectIds.filter(
          (id) => id !== subjectId
        );
      }
    };

    const validateForm = () => {
      errors.name = "";
      errors.email = "";
      errors.phoneNumber = "";
      errors.address = "";
      errors.dateOfBirth = "";
      errors.subject = "";

      if (!formData.name.trim()) {
        errors.name = "Full name is required";
      }

      if (!formData.email.trim()) {
        errors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = "Phone number is required";
      } else if (!/^[0-9\-\+\s\(\)]{10,}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Please enter a valid phone number";
      }

      if (!formData.address.trim()) {
        errors.address = "Address is required";
      }

      if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
      }

      if (formData.subjectIds.length === 0) {
        errors.subject = "Please select at least one subject";
      }

      return (
        !errors.name &&
        !errors.email &&
        !errors.phoneNumber &&
        !errors.address &&
        !errors.dateOfBirth &&
        !errors.subject
      );
    };

    const handleFileUpload = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        formData.fileType = file.type;
        formData.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.fileB64 = e.target?.result.split(",")[1] || "";
        };
        reader.readAsDataURL(file);
      }
    };

    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }

      isLoading.value = true;
      try {
        const response = await teacherService.editTeacherProfile(formData);
        // Simulate API call to save teacher data
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (response.status === 200) {
          // Show success message
          successMessage.value = "Teacher added successfully!";

          // Reset form after submission
          resetForm();

          // Clear success message after 3 seconds
          setTimeout(() => {
            this.$router.push("/dashboard");
            successMessage.value = "";
          }, 2000);
        }
      } catch (error) {
        console.error("Error saving teacher data:", error);
        successMessage.value = "Error adding teacher. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    const resetForm = () => {
      formData.name = "";
      formData.email = "";
      formData.phoneNumber = "";
      formData.address = "";
      formData.dateOfBirth = "";
      formData.subjectIds = [];
      formData.fileB64 = "";
      formData.fileType = "";
      formData.fileName = "";
      errors.name = "";
      errors.email = "";
      errors.subject = "";
    };

    const removeImage = () => {
      formData.fileB64 = "";
      formData.fileName = "";
    };

    onMounted(() => {
      fetchSubjects();
      loadProfile();
    });

    return {
      formData,
      // fileB64,
      // fileName,
      isLoading,
      errors,
      successMessage,
      subjects,
      submitForm,
      resetForm,
      removeImage,
      handleFileUpload,
      toggleSubject,
    };
  },
};
</script>