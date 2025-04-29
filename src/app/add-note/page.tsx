// src/app/add-note/page.tsx
"use client";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { loadNotes, saveNotes, Note } from "@/lib/storage";
import Spinner from "@/components/Spinner";
import ErrorBanner from "@/components/ErrorBanner";

export default function AddNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const notes = loadNotes();
      const newNote: Note = { id: uuid(), title, content, createdAt: Date.now() };
      saveNotes([newNote, ...notes]);
      setTitle(""); setContent("");
    } catch (err) {
      setError("Failed to save note. Please try again."); // Why display error banner.
    } finally {
      setSaving(false);
    }
  }; // Why I chose useState + this submit handler.

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorBanner message={error} />}
      <div>
        <label className="block font-medium">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Content</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border rounded px-2 py-1"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={saving}
      >
        {saving && <Spinner />}
        <span>{saving ? "Saving..." : "Add Note"}</span>
      </button>
    </form>
  );
}
