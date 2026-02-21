/**
 * Form validation utility service
 * Provides common validation methods for forms
 */

export const validationService = {
  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * @param {string} password
   * @returns {Object} - { isValid: boolean, strength: 'weak'|'medium'|'strong', message: string }
   */
  validatePassword(password) {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        strength: 'weak',
        message: 'Password must be at least 6 characters',
      };
    }

    let strength = 'weak';
    let score = 0;

    // Check for uppercase
    if (/[A-Z]/.test(password)) score++;
    // Check for lowercase
    if (/[a-z]/.test(password)) score++;
    // Check for numbers
    if (/\d/.test(password)) score++;
    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score >= 3 && password.length >= 8) {
      strength = 'strong';
    } else if (score >= 2) {
      strength = 'medium';
    }

    return {
      isValid: password.length >= 6,
      strength,
      message: strength === 'strong' ? 'Strong password' : `${strength} password`,
    };
  },

  /**
   * Validate required field
   * @param {string|number} value
   * @returns {boolean}
   */
  isRequired(value) {
    return value !== null && value !== undefined && value !== '';
  },

  /**
   * Validate minimum length
   * @param {string} value
   * @param {number} minLength
   * @returns {boolean}
   */
  minLength(value, minLength) {
    return value && value.length >= minLength;
  },

  /**
   * Validate maximum length
   * @param {string} value
   * @param {number} maxLength
   * @returns {boolean}
   */
  maxLength(value, maxLength) {
    return value && value.length <= maxLength;
  },

  /**
   * Validate phone number
   * @param {string} phone
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate URL format
   * @param {string} url
   * @returns {boolean}
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate number range
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */
  isInRange(value, min, max) {
    return value >= min && value <= max;
  },

  /**
   * Validate file size
   * @param {File} file
   * @param {number} maxSizeMB
   * @returns {boolean}
   */
  isValidFileSize(file, maxSizeMB) {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  },

  /**
   * Validate file type
   * @param {File} file
   * @param {Array<string>} allowedTypes - e.g., ['image/jpeg', 'image/png']
   * @returns {boolean}
   */
  isValidFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
  },

  /**
   * Validate image dimensions
   * @param {File} file
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @returns {Promise<boolean>}
   */
  async validateImageDimensions(file, maxWidth, maxHeight) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve(img.width <= maxWidth && img.height <= maxHeight);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  /**
   * Validate date format (YYYY-MM-DD)
   * @param {string} dateString
   * @returns {boolean}
   */
  isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  },

  /**
   * Check if date is in the past
   * @param {string|Date} date
   * @returns {boolean}
   */
  isPastDate(date) {
    const checkDate = typeof date === 'string' ? new Date(date) : date;
    return checkDate < new Date();
  },

  /**
   * Check if date is in the future
   * @param {string|Date} date
   * @returns {boolean}
   */
  isFutureDate(date) {
    const checkDate = typeof date === 'string' ? new Date(date) : date;
    return checkDate > new Date();
  },

  /**
   * Validate form object
   * @param {Object} formData
   * @param {Object} rules - { fieldName: ['required', 'email'], ... }
   * @returns {Object} - { isValid: boolean, errors: { fieldName: [errors] } }
   */
  validateForm(formData, rules) {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      const fieldValue = formData[field];
      const fieldErrors = [];

      fieldRules.forEach((rule) => {
        if (rule === 'required') {
          if (!this.isRequired(fieldValue)) {
            fieldErrors.push(`${field} is required`);
          }
        } else if (rule === 'email') {
          if (fieldValue && !this.isValidEmail(fieldValue)) {
            fieldErrors.push(`${field} must be a valid email`);
          }
        } else if (rule.startsWith('minLength:')) {
          const minLen = parseInt(rule.split(':')[1]);
          if (!this.minLength(fieldValue, minLen)) {
            fieldErrors.push(`${field} must be at least ${minLen} characters`);
          }
        } else if (rule.startsWith('maxLength:')) {
          const maxLen = parseInt(rule.split(':')[1]);
          if (!this.maxLength(fieldValue, maxLen)) {
            fieldErrors.push(`${field} must not exceed ${maxLen} characters`);
          }
        }
      });

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
        isValid = false;
      }
    });

    return { isValid, errors };
  },
};

export default validationService;
