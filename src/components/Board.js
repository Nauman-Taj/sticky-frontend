import React, { useEffect, useState } from 'react';
import api from '../api';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

export default function Board() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await api.get('/notes');
    setNotes(res.data.notes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (data) => {
    const res = await api.post('/notes', data);
    setNotes((prev) => [res.data.note, ...prev]);
  };

  const updateNote = async (id, data) => {
    const res = await api.put(`/notes/${id}`, data);
    setNotes((prev) => prev.map((n) => (n._id === id ? res.data.note : n)));
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <main className="board">
      <NoteForm onCreate={createNote} />

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">No notes yet — add your first one above</div>
      ) : (
        <div className="notes-grid">
          {sortedNotes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </main>
  );
}
