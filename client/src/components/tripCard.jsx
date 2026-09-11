function TripCard({ trip }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px'
    }}>
      <h3>{trip.title}</h3>
      <p><strong>Destination:</strong> {trip.destination}</p>
      <p><strong>Dates:</strong> {formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
      <p><strong>Rating:</strong> {trip.rating ? `${trip.rating} / 5` : 'Not rated'}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default TripCard;