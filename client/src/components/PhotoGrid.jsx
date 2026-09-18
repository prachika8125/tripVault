function PhotoGrid({ photos }) {
  if (!photos || photos.length === 0) {
    return <p>No photos uploaded yet for this trip.</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '8px',
      marginTop: '12px'
    }}>
      {photos.map((url, index) => (
        <img
          key={url}
          src={url}
          alt={`Trip photo ${index + 1}`}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;