import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicProfile } from '../services/userService';

function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPublicProfile(username);
        setProfile(data);
      } catch (err) {
        setError('This profile does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>@{profile.username}</p>
      {profile.bio && <p>{profile.bio}</p>}

      <h2>Trips</h2>
      {profile.trips.length === 0 ? (
        <p>No trips shared yet.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {profile.trips.map((trip) => (
            <div key={trip._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px' }}>
              {trip.coverImage && (
                <img
                  src={trip.coverImage}
                  alt={trip.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
                />
              )}
              <h3>{trip.title}</h3>
              <p>{trip.destination}</p>
              <p>{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
              <p>{trip.rating ? `${trip.rating} / 5` : 'Not rated'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicProfile;