import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTripById } from '../services/tripService';
import PhotoGrid from '../components/PhotoGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setError('Failed to load this trip. It may not exist or you may not have access.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
  return <LoadingSpinner message="Loading your trips..." />;
}

if (error) {
  return <ErrorMessage message={error} />;
}
  return (
    <div>
      <Link to="/dashboard">← Back to Dashboard</Link>
      <h1>{trip.title}</h1>
      <p><strong>Destination:</strong> {trip.destination}</p>
      <p><strong>Dates:</strong> {formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
      <p><strong>Rating:</strong> {trip.rating ? `${trip.rating} / 5` : 'Not rated'}</p>
      {trip.description && <p>{trip.description}</p>}

      <h2>Photos</h2>
      <PhotoGrid photos={trip.photos} />
    </div>
  );
}

export default TripDetail;