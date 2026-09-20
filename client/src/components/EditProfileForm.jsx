import { useState } from 'react';

function EditProfileForm({ initialData, onSubmit, onCancel }) {
  const [username, setUsername] = useState(initialData.username || '');
  const [bio, setBio] = useState(initialData.bio || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ username, bio });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
      <h3>Edit Profile</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Username</label><br />
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label>Bio</label><br />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={300} />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
    </form>
  );
}

export default EditProfileForm;