import { useState, useEffect } from 'react';
import { getTrips } from '../services/tripService';
import TripCard from '../components/tripCard';

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchTrips();
  }, []);

  if (loading) {
    return <p style={{ color: 'red' }}>Loading your trips...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>My Trips</h1>
        <button onClick={() => alert('Create form coming in Day 4!')}>
          + Create Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <p>No trips yet — start logging your travel memories!</p>
      ) : (
        trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
      )}
    </div>
  );
}

export default Dashboard;