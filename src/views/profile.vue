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
    apiBase() {
      return import.meta.env.VITE_API_BASE || "";
    },
    async loadProfile() {
      this.loading = true;
      this.error = "";
      const username = localStorage.getItem("username");
      if (!username) {
        // fallback to localStorage userProfile
        try {
          const stored = JSON.parse(localStorage.getItem("userProfile"));
          this.user = stored;
        } catch (e) {
          this.user = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 555 123 4567",
            role: "Administrator",
          };
        }
        this.loading = false;
        return;
      }
      debugger;
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token); // Check if token exists
        console.log("Token length:", token?.length); // Check if it's not empty
        // const res = await fetch(`http://localhost:8080/api/v1/users/username/${encodeURIComponent(this.username || localStorage.getItem('username'))}`,
        const res = await fetch(
          `http://localhost:8080/api/v1/users/username/test`,
          {
            headers: {
              Accept: "application/json",
              Authorization: localStorage.getItem("authToken")
                ? `Bearer ${token}`
                : "",
            },
            method: "GET",
          }
        );
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        this.user = {
          name: data.name || data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || "",
        };
      } catch (e) {
        // fallback to localStorage userProfile
        try {
          const stored = JSON.parse(localStorage.getItem("userProfile"));
          this.user = stored;
        } catch (err) {
          this.user = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 555 123 4567",
            role: "Administrator",
          };
        }
        this.error = "Could not load profile from server.";
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
