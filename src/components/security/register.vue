<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
          <span class="text-3xl font-bold text-indigo-600">📚</span>
        </div>
        <h1 class="text-4xl font-bold text-white mb-2">SchoolHub</h1>
        <p class="text-indigo-100">Create your account</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Get started</h2>
          <p class="text-gray-500 text-sm mt-1">Create a new account to access the dashboard</p>
        </div>

        <form @submit.prevent="handleSignup">
          <div class="mb-4">
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Jane Doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
                @input="validatePasswordStrength"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>

            <div v-if="formData.password" class="mt-3">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div :class="['h-full transition-all', passwordBarClass]"></div>
                </div>
                <span :class="passwordTextClass" class="text-xs font-semibold">{{ passwordStrength }}</span>
              </div>
              <p class="text-xs text-gray-600 mt-1">At least 8 characters with mix of letters, numbers and symbols</p>
            </div>
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <div class="mb-4">
            <label class="flex items-start cursor-pointer">
              <input v-model="formData.agreeTerms" type="checkbox" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mt-1" />
              <span class="ml-2 text-sm text-gray-600">I agree to the <a href="#" class="text-indigo-600 hover:underline">Terms</a> and <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a></span>
            </label>
            <p v-if="errors.agreeTerms" class="text-red-500 text-sm mt-1">{{ errors.agreeTerms }}</p>
          </div>

          <div v-if="errors.global" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-700 text-sm font-medium">{{ errors.global }}</p>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="!isLoading">Create account</span>
            <span v-else class="flex items-center justify-center"><span class="animate-spin mr-2">⏳</span> Creating...</span>
          </button>
        </form>

        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-3 text-gray-500 text-sm">or</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <div class="text-center">
          <p class="text-gray-600 text-sm">Already have an account? <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-semibold">Sign In</router-link></p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-indigo-100 text-xs">© 2026 School Management System. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { authService, handleApiError } from '@/services';

export default {
  services: { authService, handleApiError },
  name: 'Register',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      },
      errors: {},
      successMessage: '',
      isLoading: false,
      showPassword: false,
      passwordStrength: '',
    };
  },
  computed: {
    passwordBarClass() {
      if (this.passwordStrength === 'weak') return 'w-1/3 bg-red-500';
      if (this.passwordStrength === 'medium') return 'w-2/3 bg-yellow-500';
      if (this.passwordStrength === 'strong') return 'w-full bg-green-500';
      return 'w-0 bg-transparent';
    },
    passwordTextClass() {
      if (this.passwordStrength === 'weak') return 'text-red-500';
      if (this.passwordStrength === 'medium') return 'text-yellow-500';
      if (this.passwordStrength === 'strong') return 'text-green-500';
      return 'text-gray-500';
    },
  },
  methods: {
    validatePasswordStrength() {
      const password = this.formData.password || '';
      let strength = 'weak';
      if (password.length >= 8) {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNum = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const score = [hasUpper, hasLower, hasNum, hasSpecial].filter(Boolean).length;
        if (score >= 3) strength = 'strong';
        else if (score === 2) strength = 'medium';
      }
      this.passwordStrength = strength;
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    validateForm() {
      this.errors = {};
      let ok = true;
      if (!this.formData.name.trim()) {
        this.errors.name = 'Full name is required';
        ok = false;
      } else if (this.formData.name.trim().length < 3) {
        this.errors.name = 'Full name must be at least 3 characters';
        ok = false;
      }
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email is required';
        ok = false;
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Please enter a valid email address';
        ok = false;
      }
      if (!this.formData.password) {
        this.errors.password = 'Password is required';
        ok = false;
      } else if (this.formData.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters';
        ok = false;
      }
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password';
        ok = false;
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
        ok = false;
      }
      if (!this.formData.agreeTerms) {
        this.errors.agreeTerms = 'You must agree to the terms and conditions';
        ok = false;
      }
      return ok;
    },
    async handleSignup() {
      this.successMessage = '';
      this.errors.global = '';
      if (!this.validateForm()) return;
      this.isLoading = true;
      try {
        await this.$options.services.authService.register({
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
        });
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.$router.push('/login'), 1500);
      } catch (error) {
        const errorInfo = this.$options.services.handleApiError(error);
        this.errors.global = errorInfo.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
input:focus { outline: none; }
input[type="checkbox"]:checked { accent-color: #4f46e5; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
</style>
<!-- input[type="checkbox"]:checked {
  accent-color: #4f46e5;
}
</style> -->
