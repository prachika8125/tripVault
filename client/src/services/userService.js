import api from '../api/axios';

// Fetch a public profile by username — no auth needed
export const getPublicProfile = async (username) => {
  const response = await api.get(`/users/${username}/profile`);
  return response.data;
};

// Update the logged-in user's own bio/username
export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};
// Fetch the logged-in user's own full data (used for My Profile link + Edit Profile form)
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};