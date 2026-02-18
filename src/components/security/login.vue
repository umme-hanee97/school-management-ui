<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
          <span class="text-3xl font-bold text-indigo-600">📚</span>
        </div>
        <h1 class="text-4xl font-bold text-white mb-2">SchoolHub</h1>
        <p class="text-indigo-100">School Management System</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Title -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p class="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <!-- username Field -->
          <div class="mb-5">
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="formData.username"
                type="username"
                placeholder="TestUser"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-200': errors.username }"
              />
              <span class="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>
            <p v-if="errors.username" class="text-red-500 text-sm mt-1.5">
              {{ errors.username }}
            </p>
          </div>

          <!-- Password Field -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-200': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1.5">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center">
              <input
                v-model="formData.rememberMe"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <router-link
              to="/forgot-password"
              class="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
            >
              Forgot password?
            </router-link>
          </div>

          <!-- Error Message -->
          <div
            v-if="errors.global"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-red-700 text-sm font-medium">{{ errors.global }}</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <span class="animate-spin mr-2">⏳</span> Signing in...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-3 text-gray-500 text-sm">or</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center">
          <p class="text-gray-600 text-sm">
            Don't have an account?
            <router-link
              to="/register"
              class="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold transition"
            >
              Sign Up
            </router-link>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-indigo-100 text-xs">
          © 2026 School Management System. All rights reserved.
        </p>
        <div class="mt-3 flex justify-center gap-4">
          <a href="#" class="text-indigo-100 hover:text-white text-xs transition">Privacy</a>
          <span class="text-indigo-100">•</span>
          <a href="#" class="text-indigo-100 hover:text-white text-xs transition">Terms</a>
          <span class="text-indigo-100">•</span>
          <a href="#" class="text-indigo-100 hover:text-white text-xs transition">Support</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        rememberMe: false,
      },
      errors: {},
      successMessage: "",
      isLoading: false,
      showPassword: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;

      // username validation
      if (!this.formData.username.trim()) {
        this.errors.username = "Username is required";
        isValid = false;
      }

      // Password validation
      if (!this.formData.password) {
        this.errors.password = "Password is required";
        isValid = false;
      } else if (this.formData.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      return isValid;
    },

    async handleLogin() {
      this.successMessage = "";
      this.errors = {};
      this.errors.global = "";

      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: this.formData.username,
              password: this.formData.password,
            }),
          }
        );
        
        const jsonResponse = await response.json();

        if (response.ok) {
          this.successMessage = "Login successful! Redirecting to dashboard...";
          
          // Store token if provided
          if (jsonResponse.jwtToken) {
            localStorage.setItem("authToken", jsonResponse.jwtToken);
            localStorage.setItem("username", this.formData.username);
          }

          // Store remember me preference
          if (this.formData.rememberMe) {
            localStorage.setItem("rememberUsername", this.formData.username);
          }

          // Redirect to dashboard after 1.5 seconds
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1500);
        } else {
          this.errors.global =
            jsonResponse.message ||
            "Login failed. Please check your credentials and try again.";
        }
      } catch (error) {
        this.errors.global =
          error.message ||
          "An error occurred during login. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    // Check if username was remembered
    const rememberedUsername = localStorage.getItem("rememberUsername");
    if (rememberedUsername) {
      this.formData.username = rememberedUsername;
      this.formData.rememberMe = true;
    }
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}

input[type="checkbox"]:checked {
  accent-color: #4f46e5;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
