import api from './api';

export const profileService = {
  /**
   * Get user profile
   * @param {string} username
   * @returns {Promise}
   */
  getProfile(username) {
    return api.get(`/users/username/${username}`);
  },

  /**
   * Get current user profile
   * @returns {Promise}
   */
  getCurrentProfile() {
    return api.get('/profile/me');
  },

  /**
   * Update user profile
   * @param {Object} profileData - { firstName, lastName, email, phone, etc }
   * @returns {Promise}
   */
  updateProfile(profileData) {
    return api.put('/profile', profileData);
  },

  /**
   * Update user avatar/profile picture
   * @param {File} imageFile
   * @returns {Promise}
   */
  uploadProfilePicture(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAllRoles() {
    return api.get('/roles');
  },

  /**
   * Change password
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise}
   */
  changePassword(currentPassword, newPassword) {
    return api.post('/profile/change-password', {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Get user activity/statistics
   * @returns {Promise}
   */
  getActivity() {
    return api.get('/profile/activity');
  },
};

export default profileService;
