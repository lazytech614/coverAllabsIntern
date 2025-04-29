"use client";

import { useEffect, useState, useMemo } from "react";
import { loadNotes, saveNotes, Note } from "@/lib/storage";
import { Edit2, Star, Trash2 } from "lucide-react";
import Spinner from "@/components/Spinner";
import ErrorBanner from "@/components/ErrorBanner";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Pagination from "@/components/Pagination";
import { toast } from "sonner";
import { gradients } from "@/lib/contants";

export default function StarredNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   // pagination
   const [currentPage, setCurrentPage] = useState(1);
   const pageSize = 6;
 

  // for “view expanded”
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // for “in-dialog” editing
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    try {
      const all = loadNotes();
      setNotes(all.filter((n) => n.starred));
    } catch {
      setError("Could not load starred notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = () => {
    const all = loadNotes();
    setNotes(all.filter((n) => n.starred));
  };

  const deleteNote = (id: string) => {
    const updated = loadNotes().filter((n) => n.id !== id);
    saveNotes(updated);
    refresh();
    setSelectedNote(null);
    toast.success("Note deleted.");
  };

  const toggleStar = (id: string) => {
    const updated = loadNotes().map((n) =>
      n.id === id ? { ...n, starred: !n.starred } : n
    );
    saveNotes(updated);
    refresh();
  
    if (selectedNote?.id === id) setSelectedNote(null);
  
    const toggled = updated.find((n) => n.id === id);
    if (!toggled) return;
  
    if (toggled.starred) {
      toast.success("⭐ Note starred!");
    } else {
      toast("⭐ Note unstarred");
    }
  };
  

  const startEditing = (note: Note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editingNote) return;
    const updated = loadNotes().map((n) =>
      n.id === editingNote.id
        ? { ...n, title: editTitle, content: editContent }
        : n
    );
    saveNotes(updated);
    setEditingNote(null);
    refresh();
  };

  // pagination math
  const totalPages = Math.ceil(notes.length / pageSize);
  const pagedNotes = useMemo(
    () => notes.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [notes, currentPage]
  );

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {error && <ErrorBanner message={error} />}

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">
          No starred notes yet. ⭐
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedNotes.map((note, idx) => {
            const bg = gradients[idx % gradients.length];
            return (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={clsx(
                  "rounded-lg p-4 text-white flex flex-col justify-between cursor-pointer",
                  "bg-gradient-to-br",
                  bg
                )}
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {note.title}
                  </h2>
                  <p className="text-sm mb-4">
                    {note.content.length > 100
                      ? `${note.content.slice(0, 100)}…`
                      : note.content}
                  </p>
                  <p className="text-xs">
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-3 mt-4 opacity-80">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(note);
                    }}
                    aria-label="Edit"
                    className="hover:opacity-80"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(note.id);
                    }}
                    aria-label="Star"
                    className="hover:opacity-80"
                  >
                    <Star size={18} className="text-yellow-300" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    aria-label="Delete"
                    className="hover:opacity-80"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
       <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

      {selectedNote && (
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) setSelectedNote(null);
          }}
        >
          <DialogContent className="max-w-2xl w-full">
            <DialogHeader>
              <DialogTitle>{selectedNote.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="overflow-y-auto max-h-[60vh] p-4 bg-white text-gray-900 rounded">
                {selectedNote.content}
              </div>
              <p className="text-right text-sm text-gray-500">
                {new Date(selectedNote.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    startEditing(selectedNote);
                  }}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => {
                    toggleStar(selectedNote.id);
                  }}
                >
                  <Star
                    size={18}
                    className={
                      selectedNote.starred ? "text-yellow-300" : ""
                    }
                  />
                </button>
                <button
                  onClick={() => {
                    deleteNote(selectedNote.id);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <Button
                variant="secondary"
                onClick={() => setSelectedNote(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingNote && (
        <Dialog
          open={true}
          onOpenChange={(o) => o || setEditingNote(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Content</label>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setEditingNote(null)}>
                Cancel
              </Button>
              <Button onClick={saveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
