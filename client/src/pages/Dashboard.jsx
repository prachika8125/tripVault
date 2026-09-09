import { useState, useEffect } from 'react';
import { getTrips } from '../services/tripService';

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
      <h1>My Trips</h1>
      {/* Trip cards + empty state come in Chunk 4 */}
      <pre>{JSON.stringify(trips, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;