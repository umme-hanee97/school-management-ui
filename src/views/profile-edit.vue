<template>
  <div class="p-6 max-w-3xl mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Edit Profile</h1>
      <p class="text-sm text-gray-500">Update your personal information</p>
    </header>

    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Full name</label
          >
          <input
            v-model="form.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <div class="mt-1 space-y-2">
            <div
              v-for="role in roles"
              :key="role.name"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :id="role.name"
                :value="role.name"
                v-model="form.roles"
                class="mr-2 h-4 w-4 text-indigo-600 rounded"
              />
              <label :for="role.name" class="text-sm text-gray-700">
                {{ role.name.charAt(0) + role.name.slice(1).toLowerCase() }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>

        <p v-if="message" :class="messageClass">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { profileService, handleApiError } from "@/services";

export default {
  name: "ProfileEdit",
  data() {
    return {
      form: {
        name: "",
        email: "",
        roles: [],
        phone: "",
      },
      message: "",
      messageClass: "text-sm text-green-600",
      isLoading: false,
      roles: []
    };
  },
  props: {
    username: { type: String, required: false },
  },
  created() {
    this.loadProfile(), this.loadAllRoles();
  },
  methods: {
    async loadProfile() {
      try {
        const { data } = await profileService.getProfile(this.username);
        this.form = {
          name: data.name || data.fullName || "",
          email: data.email || "",
          roles: data.roles || [],
        };
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.loadFallbackProfile();
      }
    },

    loadFallbackProfile() {
      try {
        const stored = localStorage.getItem("userProfile");
        if (stored) {
          this.form = JSON.parse(stored);
        }
      } catch (e) {
        // Ignore errors
      }
    },

    async saveProfile() {
      debugger
      if (!this.form.name || !this.form.email) {
        this.message = "Name and email are required.";
        this.messageClass = "text-sm text-red-600";
        return;
      }

      this.isLoading = true;

      try {
        const response = await profileService.updateProfile(this.form.name, this.form);

        if (response.status === 200) {
          // Cache profile locally
        localStorage.setItem("userProfile", JSON.stringify(this.form));

        this.message = "Profile saved successfully!";
        this.messageClass = "text-sm text-green-600";

        // Redirect after 1.5 seconds
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1500);
        } else {
          this.message = "Error saving profile: " + (response.message || "Unknown error");
        this.messageClass = "text-sm text-red-600";
        }
        
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.message = errorInfo.message || "Failed to save profile.";
        this.messageClass = "text-sm text-red-600";
      } finally {
        this.isLoading = false;
      }
    },

    loadAllRoles() {
      profileService
        .getAllRoles()
        .then(({ data }) => {
          this.roles = data;
        })
        .catch((error) => {
          const errorInfo = handleApiError(error);
          this.message = errorInfo.message || "Failed to load roles.";
          this.messageClass = "text-sm text-red-600";
        });
    },

    toggleRole(role) {
      if (this.form.role.includes(role)) {
        this.form.role = this.form.role.filter((r) => r !== role);
      } else {
        this.form.role.push(role);
      }
    },

    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
