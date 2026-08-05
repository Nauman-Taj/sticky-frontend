import React, { useState } from 'react';

const COLORS = ['#20c997', '#ffd43b', '#ff8787', '#74c0fc', '#ffa1ff', '#b197fc'];

export default function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#20c997');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      setError('Please add a title or some content before adding a note.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await onCreate({ title, content, color });
      setTitle('');
      setContent('');
      setColor('#20c997');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="note-form-card" onSubmit={handleSubmit} noValidate>
      {error && <div className="error-banner">{error}</div>}
      <div className="field">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
      </div>
      <div className="field">
        <textarea
          placeholder="Write a note"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
        />
      </div>
      <div className="color-picker">
        {COLORS.map((c) => (
          <span
            key={c}
            className={`color-swatch ${color === c ? 'selected' : ''}`}
            style={{ background: c, border: c === '#ffffff' ? '1px solid #ddd' : undefined }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Adding...' : '+ Add note'}
      </button>
    </form>
  );
}
