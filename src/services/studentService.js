import api from './api';

export const studentService = {
  /**
   * Get all students
   * @param {Object} params - { page, pageSize, search, etc }
   * @returns {Promise}
   */
  getStudents(params = {}) {
    return api.get('/students', { params });
  },

  /**
   * Get student by ID
   * @param {number|string} studentId
   * @returns {Promise}
   */
  getStudentById(studentId) {
    return api.get(`/students/${studentId}`);
  },

  /**
   * Create new student
   * @param {Object} studentData - { firstName, lastName, email, phone, etc }
   * @returns {Promise}
   */
  createStudent(studentData) {
    return api.post('/students', studentData);
  },

  /**
   * Update student
   * @param {number|string} studentId
   * @param {Object} studentData
   * @returns {Promise}
   */
  updateStudent(studentId, studentData) {
    return api.put(`/students/${studentId}`, studentData);
  },

  /**
   * Delete student
   * @param {number|string} studentId
   * @returns {Promise}
   */
  deleteStudent(studentId) {
    return api.delete(`/students/${studentId}`);
  },

  /**
   * Bulk operations
   */
  bulkCreateStudents(studentsData) {
    return api.post('/students/bulk', studentsData);
  },

  bulkDeleteStudents(studentIds) {
    return api.post('/students/bulk-delete', { ids: studentIds });
  },
};

export default studentService;
