<template>
  <div class="bg-white rounded-lg shadow p-6 w-full max-w-md">
    <div class="flex items-center gap-4">
      <div
        class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl"
      >
        {{ initials }}
      </div>
      <div>
        <h3 class="text-lg font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>
    </div>
    <div class="mt-4">
      <!-- <p class="text-sm text-gray-600">Role: <span class="font-medium">{{ user.roles || 'N/A' }}</span></p> -->
      <p class="text-sm text-gray-600">
        Role:
        <span class="font-medium">
          {{ displayRole }}
        </span>
      </p>
    </div>
    <div class="mt-6 flex gap-2">
      <router-link
        :to="editProfileRoute"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >Edit Profile</router-link
      >
      <router-link
        :to="changePasswordRoute"
        class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
      >
        Change Password
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    user: { type: Object, required: true },
  },
  computed: {
    normalizedRoles() {
      if (Array.isArray(this.user?.roles)) {
        return this.user.roles;
      }

      if (typeof this.user?.roles === "string" && this.user.roles) {
        return [this.user.roles];
      }

      return [];
    },

    initials() {
      const name = (this.user && this.user.name) || "";
      if (name) {
        return name
          .split(" ")
          .map((s) => s[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
      }
      const email = (this.user && this.user.email) || "";
      return (email[0] || "U").toUpperCase();
    },

    displayRole() {
      if (!this.normalizedRoles.length) return "";
      if (
        this.normalizedRoles.length === 1 &&
        this.normalizedRoles[0] === "USER"
      ) {
        return "User";
      }
      return this.normalizedRoles
        .filter((r) => r !== "USER")
        .map((r) => r.charAt(0) + r.slice(1).toLowerCase())
        .join(", ");
    },

    profileUsername() {
      return this.user?.username || localStorage.getItem("username") || "";
    },

    editProfileRoute() {
      if (!this.normalizedRoles.length) {
        return {
          name: "ProfileEdit",
          params: { username: this.profileUsername },
        };
      }

      const roles = this.normalizedRoles.map((r) => r.toLowerCase());

      if (roles.includes("student")) {
        return {
          name: "EditStudentProfile",
          params: { username: this.profileUsername },
        };
      }

      if (roles.includes("teacher")) {
        return {
          name: "EditTeacherProfile",
          params: { username: this.profileUsername },
        };
      }
      return {
        name: "ProfileEdit",
        params: { username: this.profileUsername },
      };
    },

    changePasswordRoute() {
      return {
        name: "ChangePassword",
        params: { username: this.profileUsername },
      };
    },
  },
};
</script>

<style scoped></style>
