import api from './api';

export const authService = {
  /**
   * Sign in user with username and password
   * @param {string} username
   * @param {string} password
   * @returns {Promise}
   */
  signin(username, password) {
    return api.post('/auth/signin', {
      username,
      password,
    });
  },

  /**
   * Register new user
   * @param {Object} userData - { username, email, password, firstName, lastName }
   * @returns {Promise}
   */
  register(userData) {
    return api.post('/auth/signup', userData);
  },

  /**
   * Logout user (clear token)
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get current user token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Get current username
   * @returns {string|null}
   */
  getCurrentUsername() {
    return localStorage.getItem('username');
  },
};

export default authService;
