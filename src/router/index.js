import Login from '@/components/security/login.vue';
import Register from '@/components/security/register.vue';
import AddStudent from '@/views/student/add-student.vue';
import editStudentProfile from '@/views/student/edit-student-profile.vue';
import EditStudent from '@/views/student/edit-student.vue';
import ListAllStudent from '@/views/student/list-all-student.vue';
import ListStudent from '@/views/student/list-student.vue';
import AddTeacher from '@/views/teacher/add-teacher.vue';
import ListTeacher from '@/views/teacher/list-teacher.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: Login },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard/:username?', name: 'Dashboard', props: true, component: () => import('@/views/dashboard.vue'), meta: { requiresAuth: true } }
  , { path: '/profile/:username?', name: 'Profile', component: () => import('@/views/profile.vue'), meta: { requiresAuth: true } }
  , { path: '/profile/edit/:username?', name: 'ProfileEdit', props: true, component: () => import('@/views/profile-edit.vue'), meta: { requiresAuth: true } }
  , { path: '/profile/change-password/:username?', name: 'ChangePassword', props: true, component: () => import('@/views/change-password.vue'), meta: { requiresAuth: true } }
  , { path: '/edit-student-profile/:username?', name: 'EditStudentProfile', props: true, component: () => import('@/views/student/edit-student-profile.vue'), meta: { requiresAuth: true } }
  , { path: '/edit-teacher-profile/:username?', name: 'EditTeacherProfile', props: true, component: () => import('@/views/teacher/edit-teacher-profile.vue'), meta: { requiresAuth: true } },
  { path: '/allStudents', name: 'ListAllStudents', component: ListAllStudent, meta: { requiresAuth: true } },
  { path: '/students/:classId?/:sectionId?', name: 'ListStudents', props: true, component: ListStudent, meta: { requiresAuth: true } },
  { path: '/students/add', name: 'AddStudent', component: AddStudent, meta: { requiresAuth: true } },
  { path: '/students/edit/:id?', name: 'EditStudent',props: true, component: EditStudent, meta: { requiresAuth: true } },
  { path: '/students/add-emergency-contact/:studentId?', name: 'AddEmergencyContact', component: () => import('@/views/student/add-emergency-contact.vue'), meta: { requiresAuth: true } },
  { path: '/teachers', name: 'ListTeacher', component: ListTeacher, meta: { requiresAuth: true } },
  { path: '/teachers/add', name: 'AddTeacher', component: AddTeacher, meta: { requiresAuth: true } },
  { path: '/teachers/edit/:id?', name: 'EditTeacher', props: true, component: () => import('@/views/teacher/edit-teacher.vue'), meta: { requiresAuth: true } },
  { path: '/classes', name: 'ListClass', component: () => import('@/views/classes.vue'), meta: { requiresAuth: true } }
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
