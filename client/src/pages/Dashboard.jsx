import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrips, createTrip, getTripById, updateTrip, deleteTrip, uploadTripPhoto } from '../services/tripService';
import { getCurrentUser, updateProfile } from '../services/userService';
import TripCard from '../components/TripCard';
import TripForm from '../components/TripForm';
import EditProfileForm from '../components/EditProfileForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      setError('Failed to load your trips. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      // Non-critical for the trip list itself — profile link/edit just won't show correctly
    }
  };

  useEffect(() => {
    fetchTrips();
    fetchCurrentUser();
  }, []);

  const handleCreateTrip = async (formData, file) => {
    const newTrip = await createTrip(formData);
    if (file) {
      await uploadTripPhoto(newTrip._id, file);
    }
    setShowCreateForm(false);
    await fetchTrips();
  };

  const handleEditClick = async (tripId) => {
    const trip = await getTripById(tripId);
    setEditingTrip(trip);
  };

  const handleUpdateTrip = async (formData, file) => {
    await updateTrip(editingTrip._id, formData);
    if (file) {
      await uploadTripPhoto(editingTrip._id, file);
    }
    setEditingTrip(null);
    await fetchTrips();
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
      await fetchTrips();
    } catch (err) {
      setError('Failed to delete trip. Please try again.');
    }
  };

  const handleUpdateProfile = async (profileData) => {
    const updated = await updateProfile(profileData);
    setCurrentUser(updated);
    setEditingProfile(false);
  };

  if (loading) {
  return <LoadingSpinner message="Loading your trips..." />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Trips</h1>
        <div>
          {currentUser && (
            <>
              <Link to={`/profile/${currentUser.username}`} style={{ marginRight: '12px' }}>
                My Profile
              </Link>
              <button onClick={() => setEditingProfile(true)} style={{ marginRight: '12px' }}>
                Edit Profile
              </button>
            </>
          )}
          {!showCreateForm && !editingTrip && (
            <button onClick={() => setShowCreateForm(true)}>+ Create Trip</button>
          )}
        </div>
      </div>

      {editingProfile && currentUser && (
        <EditProfileForm
          initialData={currentUser}
          onSubmit={handleUpdateProfile}
          onCancel={() => setEditingProfile(false)}
        />
      )}

      {showCreateForm && (
        <TripForm onSubmit={handleCreateTrip} onCancel={() => setShowCreateForm(false)} />
      )}

      {editingTrip && (
        <TripForm
          initialData={editingTrip}
          onSubmit={handleUpdateTrip}
          onCancel={() => setEditingTrip(null)}
        />
      )}

      {trips.length === 0 ? (
        <p>No trips yet — start logging your travel memories!</p>
      ) : (
        trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            onEdit={() => handleEditClick(trip._id)}
            onDelete={() => handleDeleteTrip(trip._id)}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;