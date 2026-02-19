import Login from '@/components/security/login.vue';
import Register from '@/components/security/register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: Login },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: () => import('@/views/dashboard.vue'), meta: { requiresAuth: true } }
  ,{ path: '/profile/:username?', name: 'Profile', component: () => import('@/views/profile.vue'), meta: { requiresAuth: true } }
  ,{ path: '/profile/edit/:username?', name: 'ProfileEdit', component: () => import('@/views/profile-edit.vue'), meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Global auth guard: check localStorage for `authToken` set during login
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  // If target requires auth and user isn't authenticated, redirect to login
  if (to.meta && to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: '/login' });
  }

  // If user is authenticated and trying to access login or register, redirect to dashboard
  if (isAuthenticated && (to.path === '/login' || to.path === '/' || to.path === '/register')) {
    return next({ path: '/dashboard' });
  }

  return next();
});

export default router;
