export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  starred: boolean;
}

const STORAGE_KEY = "my-notes-app:notes";

function safeParse<T>(json: string): T | null {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function loadNotes(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse<Note[]>(raw) || [] : [];
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
