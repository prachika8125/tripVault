import { useState } from 'react';

function CreateTripForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    rating: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.destination.trim()) {
      setError('Title and destination are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to save trip. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
      <h3>New Trip</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Title*</label><br />
        <input name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <label>Destination*</label><br />
        <input name="destination" value={formData.destination} onChange={handleChange} />
      </div>

      <div>
        <label>Start Date</label><br />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </div>

      <div>
        <label>End Date</label><br />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </div>

      <div>
        <label>Description</label><br />
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div>
        <label>Rating (1–5)</label><br />
        <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Trip'}
      </button>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
    </form>
  );
}

export default CreateTripForm;