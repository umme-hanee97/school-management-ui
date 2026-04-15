import api from './api';

// Fetch all classes
export const getClasses = async () => {
  const response = await api.get('lookup/classes/with-section'); // Adjust endpoint as needed
  return response.data;
};

