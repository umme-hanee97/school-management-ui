// Centralized services export
export { default as api } from './api';
export { default as authService } from './authService';
export { default as studentService } from './studentService';
export { default as teacherService } from './teacherservice';
export { default as profileService } from './profileService';
export { default as dashboardService } from './dashboardService';
export { default as validationService } from './validationService';
export { handleApiError, isValidationError, isUnauthorizedError } from './errorHandler';
export { default as router } from '../router/index';
