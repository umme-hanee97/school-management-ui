<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p class="text-gray-600">Join our school management system</p>
      </div>

      <!-- Signup Card -->
      <div class="bg-white rounded-lg shadow-xl p-8">
        <form @submit.prevent="handleSignup">
          <!-- Full Name -->
          <div class="mb-6">
            <label
              for="name"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
              required
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
              required
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- User Type Selection -->
          <!-- <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              User Type
            </label>
            <div class="space-y-3">
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="formData.userType"
                  value="student"
                  class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  required
                />
                <span class="ml-3 text-gray-700">Student</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="formData.userType"
                  value="teacher"
                  class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-3 text-gray-700">Teacher</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="formData.userType"
                  value="admin"
                  class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-3 text-gray-700">Admin</span>
              </label>
            </div>
            <p v-if="errors.userType" class="text-red-500 text-sm mt-1">{{ errors.userType }}</p>
          </div> -->

          <!-- Password -->
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
              required
              @input="validatePasswordStrength"
            />
            <!-- Password Strength Indicator -->
            <div v-if="formData.password" class="mt-2">
              <div class="flex items-center gap-2">
                <div
                  class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    :class="[
                      'h-full transition-all',
                      {
                        'w-1/3 bg-red-500': passwordStrength === 'weak',
                        'w-2/3 bg-yellow-500': passwordStrength === 'medium',
                        'w-full bg-green-500': passwordStrength === 'strong',
                      },
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    'text-xs font-semibold',
                    {
                      'text-red-500': passwordStrength === 'weak',
                      'text-yellow-500': passwordStrength === 'medium',
                      'text-green-500': passwordStrength === 'strong',
                    },
                  ]"
                >
                  {{ passwordStrength }}
                </span>
              </div>
              <p class="text-xs text-gray-600 mt-1">
                At least 8 characters, mix of uppercase, lowercase, numbers, and
                symbols
              </p>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label
              for="confirmPassword"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
              required
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms & Conditions -->
          <div class="mb-6">
            <label class="flex items-start cursor-pointer">
              <input
                v-model="formData.agreeTerms"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mt-1"
                required
              />
              <span class="ml-2 text-sm text-gray-600">
                I agree to the
                <a href="#" class="text-indigo-600 hover:underline"
                  >Terms and Conditions</a
                >
                and
                <a href="#" class="text-indigo-600 hover:underline"
                  >Privacy Policy</a
                >
              </span>
            </label>
            <p v-if="errors.agreeTerms" class="text-red-500 text-sm mt-1">
              {{ errors.agreeTerms }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-purple-300 shadow-lg hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Create Account
          </button>
          <!-- bg-indigo-600 -->
          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg"
          >
            <p class="text-green-800 text-sm">{{ successMessage }}</p>
          </div>

          <!-- Error Message -->
          <div
            v-if="globalError"
            class="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg"
          >
            <p class="text-red-800 text-sm">{{ globalError }}</p>
          </div>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
            Already have an account?
            <router-link
              to="/login"
              class="text-indigo-600 hover:underline font-semibold"
            >
              Sign In
            </router-link>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-gray-600 text-xs mt-6">
        © 2026 School Management System. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import js from "@eslint/js";

export default {
  name: "Register",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      },
      errors: {},
      successMessage: "",
      globalError: "",
      passwordStrength: "",
    };
  },
  methods: {
    validatePasswordStrength() {
      const password = this.formData.password;
      let strength = "weak";

      if (password.length >= 8) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        const strengthScore = [
          hasUpperCase,
          hasLowerCase,
          hasNumbers,
          hasSpecialChar,
        ].filter(Boolean).length;

        if (strengthScore >= 3) {
          strength = "strong";
        } else if (strengthScore === 2) {
          strength = "medium";
        }
      }

      this.passwordStrength = strength;
    },
    validateForm() {
      this.errors = {};
      let isValid = true;

      // Full Name validation
      if (!this.formData.name.trim()) {
        this.errors.name = "Full name is required";
        isValid = false;
      } else if (this.formData.name.trim().length < 3) {
        this.errors.name = "Full name must be at least 3 characters";
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.formData.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = "Please enter a valid email address";
        isValid = false;
      }

      // User Type validation
      // if (!this.formData.userType) {
      //   this.errors.userType = 'Please select a user type';
      //   isValid = false;
      // }

      // Password validation
      if (!this.formData.password) {
        this.errors.password = "Password is required";
        isValid = false;
      } else if (this.formData.password.length < 8) {
        this.errors.password = "Password must be at least 8 characters";
        isValid = false;
      }

      // Confirm Password validation
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      // Terms validation
      if (!this.formData.agreeTerms) {
        this.errors.agreeTerms = "You must agree to the terms and conditions";
        isValid = false;
      }

      return isValid;
    },
    async handleSignup() {
      this.successMessage = "";
      this.globalError = "";

      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: this.formData.name,
              email: this.formData.email,
              // userType: this.formData.userType,
              password: this.formData.password,
            }),
          }
        );
        let jsonResponse = await response.json();
        if (response.ok) {
          this.successMessage = "Registration successful! Redirecting to login...";
        } else {
          this.globalError =  "Registration failed. "+jsonResponse.message +" Please try again.";
        }

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        this.globalError =
          error.message ||
          "An error occurred during registration. Please try again.";
        console.error("Signup error:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
input:focus {
  outline: none;
}

input[type="radio"]:checked {
  accent-color: #4f46e5;
}

input[type="checkbox"]:checked {
  accent-color: #4f46e5;
}
</style>
