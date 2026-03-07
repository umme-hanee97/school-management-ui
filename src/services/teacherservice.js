import api from './api';

export const teacherService = {
  /**
   * Get all teachers
   * @param {Object} params - { page, pageSize, search, etc }
   * @returns {Promise}
   */
  getTeachers(params = {}) {
    return api.get('/teachers', { params });
  },

  /**
   * Get teacher by ID
   * @param {number|string} teacherId
   * @returns {Promise}
   */
  getTeacherById(teacherId) {
    return api.get(`/teachers/${teacherId}`);
  },

  /**
   * Create new teacher
   * @param {Object} teacherData - { firstName, lastName, email, phone, etc }
   * @returns {Promise}
   */
  createTeacher(teacherData) {
    return api.post('/teachers', teacherData);
  },

  /**
   * Update teacher
   * @param {number|string} teacherId
   * @param {Object} teacherData
   * @returns {Promise}
   */
  updateTeacher(teacherId, teacherData) {
    return api.put(`/teachers/${teacherId}`, teacherData);
  },

  /**
   * Delete teacher
   * @param {number|string} teacherId
   * @returns {Promise}
   */
  deleteTeacher(teacherId) {
    return api.delete(`/teachers/${teacherId}`);
  },

  /**
   * Bulk operations
   */
  bulkCreateTeachers(teachersData) {
    return api.post('/teachers/bulk', teachersData);
  },

  bulkDeleteTeachers(teacherIds) {
    return api.post('/teachers/bulk-delete', { ids: teacherIds });
  }
};

export default teacherService;
