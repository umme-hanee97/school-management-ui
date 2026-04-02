<template>
  <div class="min-h-screen bg-slate-50 py-10 px-4">
    <div class="max-w-2xl mx-auto">
      <header class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Account Security
        </p>
        <h1 class="mt-2 text-3xl font-bold text-slate-900">Change Password</h1>
        <p class="mt-2 text-sm text-slate-600">
          Update your password to keep your account secure.
        </p>
      </header>

      <section class="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <div class="border-b border-slate-200 px-6 py-5">
          <h2 class="text-lg font-semibold">Password Details</h2>
          <p class="mt-1 text-sm">
            Use a strong password with a mix of letters, numbers, and symbols.
          </p>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-5">
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700">
              Current Password
            </label>
            <input
              id="password"
              v-model.trim="form.password"
              type="password"
              autocomplete="off"
              class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your current password"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-slate-700">
              New Password
            </label>
            <input
              id="newPassword"
              v-model.trim="form.newPassword"
              type="password"
              autocomplete="new-password"
              class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Choose a new password"
            />
            <div v-if="form.newPassword" class="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Strength
                </span>
                <span :class="strengthTextClass" class="text-sm font-semibold">
                  {{ passwordStatus.message }}
                </span>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  :class="strengthBarClass"
                  class="h-full rounded-full transition-all duration-300"
                ></div>
              </div>
            </div>
            <p v-if="errors.newPassword" class="mt-2 text-sm text-red-600">
              {{ errors.newPassword }}
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-slate-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              v-model.trim="form.confirmPassword"
              type="password"
              autocomplete="new-password"
              class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Re-enter your new password"
            />
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            After a successful password change, use your new password the next time you sign in.
          </div>

          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              @click="cancel"
              class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {{ isSubmitting ? "Updating..." : "Update Password" }}
            </button>
          </div>

          <p v-if="message" :class="messageClass" class="text-sm font-medium">
            {{ message }}
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { handleApiError, profileService, validationService } from "@/services";

export default {
  name: "ChangePasswordView",
  props: {
    username: { type: String, required: false },
  },
  data() {
    return {
      form: {
        name: this.username || localStorage.getItem("username") || "",  
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      errors: {},
      message: "",
      messageClass: "text-green-600",
      isSubmitting: false,
    };
  },
  computed: {
    passwordStatus() {
      if (!this.form.newPassword) {
        return {
          strength: "weak",
          message: "Enter a new password",
        };
      }

      return validationService.validatePassword(this.form.newPassword);
    },

    strengthBarClass() {
      if (this.passwordStatus.strength === "strong") {
        return "w-full bg-emerald-500";
      }

      if (this.passwordStatus.strength === "medium") {
        return "w-2/3 bg-amber-500";
      }

      return "w-1/3 bg-rose-500";
    },

    strengthTextClass() {
      if (this.passwordStatus.strength === "strong") {
        return "text-emerald-600";
      }

      if (this.passwordStatus.strength === "medium") {
        return "text-amber-600";
      }

      return "text-rose-600";
    },

    profileRoute() {
      return {
        name: "Profile",
        params: {
          username: this.username || localStorage.getItem("username") || "",
        },
      };
    },
  },
  methods: {
    validateForm() {
      const errors = {};

      if (!this.form.password) {
        errors.password = "Current password is required.";
      }

      if (!this.form.newPassword) {
        errors.newPassword = "New password is required.";
      } else if (!this.passwordStatus.isValid) {
        errors.newPassword = this.passwordStatus.message;
      } else if (this.form.newPassword === this.form.password) {
        errors.newPassword = "New password must be different from your current password.";
      }

      if (!this.form.confirmPassword) {
        errors.confirmPassword = "Please confirm your new password.";
      } else if (this.form.newPassword !== this.form.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },

    resetForm() {
      this.form.password = "";
      this.form.newPassword = "";
      this.form.confirmPassword = "";
    },

    async submitForm() {
      this.message = "";

      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      try {
        await profileService.changePassword(
          this.form.name,
          this.form.password,
          this.form.newPassword
        );

        this.message = "Password updated successfully.";
        this.messageClass = "text-green-600";
        this.errors = {};
        this.resetForm();

        setTimeout(() => {
          this.$router.push(this.profileRoute);
        }, 1200);
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.message = errorInfo.message || "Failed to update password.";
        this.messageClass = "text-red-600";
      } finally {
        this.isSubmitting = false;
      }
    },

    cancel() {
      this.$router.push(this.profileRoute);
    },
  },
};
</script>
