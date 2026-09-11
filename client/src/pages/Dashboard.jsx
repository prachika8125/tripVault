import { useState, useEffect } from 'react';
import { getTrips, createTrip, getTripById, updateTrip } from '../services/tripService';
import TripCard from '../components/TripCard';
import TripForm from '../components/tripForm';

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

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

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCreateTrip = async (formData) => {
    await createTrip(formData);
    setShowCreateForm(false);
    await fetchTrips();
  };

  const handleEditClick = async (tripId) => {
    const trip = await getTripById(tripId);
    setEditingTrip(trip);
  };

  const handleUpdateTrip = async (formData) => {
    await updateTrip(editingTrip._id, formData);
    setEditingTrip(null);
    await fetchTrips();
  };

  if (loading) {
    return <p>Loading your trips...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Trips</h1>
        {!showCreateForm && !editingTrip && (
          <button onClick={() => setShowCreateForm(true)}>+ Create Trip</button>
        )}
      </div>

      {showCreateForm && (
        <TripForm
          onSubmit={handleCreateTrip}
          onCancel={() => setShowCreateForm(false)}
        />
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
          <TripCard key={trip._id} trip={trip} onEdit={() => handleEditClick(trip._id)} />
        ))
      )}
    </div>
  );
}

export default Dashboard;