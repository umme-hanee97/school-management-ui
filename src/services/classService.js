import api from './api';

// Fetch all classes with their sections
export const getClassesWithSections = async () => {
  const response = await api.get('lookup/classes'); // Adjust endpoint as needed
  return response.data;
};
