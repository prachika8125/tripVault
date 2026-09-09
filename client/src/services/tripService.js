import api from '../api/axios';

// Fetch all trips belonging to the logged-in user
export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

// Fetch a single trip by ID (used to pre-fill the Edit form)
export const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

// Create a new trip
export const createTrip = async (tripData) => {
  const response = await api.post('/trips', tripData);
  return response.data;
};

// Update an existing trip
export const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);
  return response.data;
};

// Delete a trip
export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};