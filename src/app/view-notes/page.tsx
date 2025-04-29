// src/app/view-notes/page.tsx
"use client";
import { useEffect, useState } from "react";
import { loadNotes, Note } from "@/lib/storage";
import Spinner from "@/components/Spinner";
import ErrorBanner from "@/components/ErrorBanner";

export default function ViewNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = loadNotes();
      setNotes(data);
    } catch {
      setError("Could not load notes.");
    } finally {
      setLoading(false);
    }
  }, []); // Why useEffect to sync storage → state.

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      {error && <ErrorBanner message={error} />}
      {notes.length === 0 ? (
        <p>No notes yet. Add one!</p>
      ) : (
        notes.map(note => (
          <div key={note.id} className="border rounded p-4 bg-white shadow-sm">
            <h2 className="font-semibold">{note.title}</h2>
            <p className="text-sm text-gray-600">
              {note.content.length > 100
                ? `${note.content.slice(0, 100)}…`
                : note.content}
            </p>
            <small className="text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
