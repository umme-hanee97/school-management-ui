import api from './api';

export const lookupService = {

  /**
   * Get list of relationship types
   * @returns {Promise}
   */
  getRelationships() {
    return api.get('/lookup/relations');
  },

  /**
   * Get list of subjects
   * @returns {Promise}
   */
  getSubjects() {
    return api.get('/lookup/subjects');
  },

};

export default lookupService;