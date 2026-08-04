import React, { useState } from 'react';

export default function NoteCard({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const save = async () => {
    await onUpdate(note._id, { title, content });
    setEditing(false);
  };

  const togglePin = () => onUpdate(note._id, { pinned: !note.pinned });

  return (
    <div className="note-card" style={{ background: note.color }}>
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 8, border: 'none', background: 'rgba(255,255,255,0.5)', borderRadius: 6, padding: 6 }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'rgba(255,255,255,0.5)', borderRadius: 6, padding: 6 }}
          />
        </>
      ) : (
        <>
          {note.title && <h3>{note.title}</h3>}
          <p>{note.content}</p>
        </>
      )}

      <div className="note-footer">
        <button className="icon-btn" onClick={togglePin} title={note.pinned ? 'Unpin' : 'Pin'}>
          {note.pinned ? 'Unpin' : 'Pin'}
        </button>
        <div className="note-actions">
          {editing ? (
            <button className="icon-btn" onClick={save} title="Save">
              Save
            </button>
          ) : (
            <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">
              Edit
            </button>
          )}
          <button className="icon-btn" onClick={() => onDelete(note._id)} title="Delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
