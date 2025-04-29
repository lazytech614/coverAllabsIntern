// src/lib/storage.ts
export interface Note { id: string; title: string; content: string; createdAt: number; }

const STORAGE_KEY = "my-notes-app:notes";

function safeParse<T>(json: string): T | null {
  try { return JSON.parse(json) }
  catch { return null }
}

export function loadNotes(): Note[] {
  // Why localStorage + key naming: isolating our app data prevents collisions.
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (safeParse<Note[]>(raw) || []) : [];
}

export function saveNotes(notes: Note[]): void {
  // Why show spinner here: gives user feedback that data is being persisted.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
