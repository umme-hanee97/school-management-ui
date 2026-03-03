import api from './api';

export const lookupService = {
  /**
   * Get list of countries  * @returns {Promise} **/
    getSubjects() {
    return api.get('/lookup/subjects');
  },

};

export default lookupService;