/**
 * Handle API errors consistently across the application
 * @param {Error} error - axios error object
 * @returns {Object} - formatted error object
 */
export const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';
  let errorCode = 'UNKNOWN_ERROR';
  let statusCode = null;

  if (error.response) {
    // Server responded with error status
    statusCode = error.response.status;
    errorMessage = error.response.data?.message || error.response.statusText;
    errorCode = error.response.data?.code || `HTTP_${statusCode}`;
  } else if (error.request) {
    // Request made but no response
    errorMessage = 'No response from server. Please check your connection.';
    errorCode = 'NO_RESPONSE';
  } else {
    // Error in request setup
    errorMessage = error.message;
    errorCode = 'REQUEST_ERROR';
  }

  return {
    message: errorMessage,
    code: errorCode,
    statusCode,
    originalError: error,
  };
};

/**
 * Check if error is a specific type
 * @param {Error} error
 * @param {number} statusCode
 * @returns {boolean}
 */
export const isErrorWithStatus = (error, statusCode) => {
  return error.response?.status === statusCode;
};

/**
 * Check if error is a validation error (400)
 * @param {Error} error
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return isErrorWithStatus(error, 400);
};

/**
 * Check if error is unauthorized (401)
 * @param {Error} error
 * @returns {boolean}
 */
export const isUnauthorizedError = (error) => {
  return isErrorWithStatus(error, 401);
};

/**
 * Check if error is forbidden (403)
 * @param {Error} error
 * @returns {boolean}
 */
export const isForbiddenError = (error) => {
  return isErrorWithStatus(error, 403);
};

/**
 * Check if error is not found (404)
 * @param {Error} error
 * @returns {boolean}
 */
export const isNotFoundError = (error) => {
  return isErrorWithStatus(error, 404);
};

export default {
  handleApiError,
  isErrorWithStatus,
  isValidationError,
  isUnauthorizedError,
  isForbiddenError,
  isNotFoundError,
};
