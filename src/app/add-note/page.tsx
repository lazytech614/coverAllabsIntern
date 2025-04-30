"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { loadNotes, saveNotes, Note } from "@/lib/storage";
import Spinner from "@/components/Spinner";
import ErrorBanner from "@/components/ErrorBanner";
import { toast } from "sonner";

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
      const newNote: Note = { 
        id: uuid(), 
        title, 
        content, 
        starred: false,
        createdAt: Date.now() 
      };
      saveNotes([newNote, ...notes]);
      setTitle(""); setContent("");
      toast.success("Note saved.");
    } catch (err: Error | any) {
      console.log(err.message);
      setError("Failed to save note. Please try again."); 
      toast.error("Failed to save note. Please try again.");
    } finally {
      setSaving(false);
    }
  }; 

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <ErrorBanner message={error} />}
        <div>
          <label className="block font-medium text-2xl mb-4">Title</label>
          <input
            value={title}
            placeholder="Daily Journal"
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded-md px-4 py-2 border-gray-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-2xl mb-4">Content</label>
          <textarea
            value={content}
            placeholder="Today I learned about React Hooks and how to integrate them with localStorage for persistence."
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded-md px-4 py-2 border-gray-400"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center space-x-2 bg-[#00A82D] text-white px-4 py-2 rounded 
          disabled:opacity-50 cursor-pointer"
          disabled={saving}
        >
          {saving && <Spinner />}
          <span>{saving ? "Saving..." : "Add Note"}</span>
        </button>
      </form>
    </div>
  );
}
