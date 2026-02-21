<template>
  <div class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Profile</h1>
      <p class="text-sm text-gray-500">
        Manage your account details and preferences
      </p>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProfileCard :user="user" />

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="font-semibold mb-4">About</h2>
        <p class="text-sm text-gray-600">
          This is a minimal profile layout. Add additional fields, activity
          logs, or settings here as needed.
        </p>

        <div class="mt-6">
          <h3 class="font-medium mb-2">Contact</h3>
          <p class="text-sm text-gray-700">
            Email: <span class="font-medium">{{ user.email }}</span>
          </p>
          <p class="text-sm text-gray-700">
            Phone: <span class="font-medium">{{ user.phone || "—" }}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileCard from "@/components/profile/ProfileCard.vue";
import { profileService, handleApiError } from "@/services";

export default {
  name: "ProfileView",
  components: { ProfileCard },
  props: {
    username: { type: String, required: false },
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        role: "",
      },
      loading: true,
      error: "",
    };
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      this.loading = true;
      this.error = "";

      try {
        const username = this.username || localStorage.getItem("username");
        
        if (!username) {
          // If no username, try to load current user profile
          const { data } = await profileService.getCurrentProfile();
          this.mapProfileData(data);
        } else {
          // Load specific user profile
          const { data } = await profileService.getProfile(username);
          this.mapProfileData(data);
        }
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message;
        
        // Fallback to localStorage or default data
        this.loadFallbackProfile();
      } finally {
        this.loading = false;
      }
    },

    mapProfileData(data) {
      this.user = {
        name: data.name || data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "",
      };
    },

    loadFallbackProfile() {
      try {
        const stored = JSON.parse(localStorage.getItem("userProfile"));
        if (stored) {
          this.user = stored;
          return;
        }
      } catch (e) {
        // Ignore parsing errors
      }

      // Default fallback data
      this.user = {
        name: "User",
        email: localStorage.getItem("username") || "user@example.com",
        phone: "",
        role: "User",
      };
    },
  },
};
</script>

<style scoped></style>
