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

  getStudentsByClassSection(classId, sectionId) {
    return api.get(`/students/class/${classId}/section/${sectionId}`);
  },

  /**
   * Get student by ID
   * @param {number|string} studentId
   * @returns {Promise}
   */
  getStudentById(studentId) {
    return api.get(`/students/${studentId}`);
  },

  getStudentByEmail(email) {
    return api.get(`/students/email/${email}`);
  },

  /**
   * Create new student
   * @param {Object} studentData - { firstName, lastName, email, phone, etc }
   * @returns {Promise}
   */
  createStudent(studentData) {
    return api.post('/students', studentData);
  },


  editStudentProfile(studentData) {
    return api.post('/students/editStudentProfile', studentData);
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

  addEmergencyContact(contactData) {
    return api.post(`/students/addEmergencyContact`, contactData);
  },

  deleteEmergencyContact(studentId, contactId) {
    return api.delete(`/students/${studentId}/emergency-contacts/${contactId}`);
  },

  getEmergencyContacts(studentId) {
    return api.get(`/students/${studentId}/emergency-contacts`);
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

  getClasses() {
    return api.get('/lookup/classes');
  },

  getSections() {
    return api.get('/lookup/sections');
  },

  getSubjects() {
    return api.get('/lookup/subjects');
  }
};

export default studentService;
