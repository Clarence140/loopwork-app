/**
 * ========================================
 * NOTEPAD - FIREBASE SERVICE
 * ========================================
 *
 * Placeholder for Firebase operations
 * Will be implemented when connecting to backend
 */

import { Note, NoteFormData } from "../types";

// Placeholder functions for future Firebase integration
export const getNotes = async (
  companyCode: string,
  userId: string
): Promise<Note[]> => {
  console.log("📝 [noteService] getNotes - placeholder");
  return [];
};

export const addNote = async (
  companyCode: string,
  userId: string,
  noteData: NoteFormData
): Promise<string> => {
  console.log("📝 [noteService] addNote - placeholder");
  return "note_" + Date.now();
};

export const updateNote = async (
  companyCode: string,
  noteId: string,
  noteData: Partial<NoteFormData>
): Promise<void> => {
  console.log("📝 [noteService] updateNote - placeholder");
};

export const deleteNote = async (
  companyCode: string,
  noteId: string
): Promise<void> => {
  console.log("📝 [noteService] deleteNote - placeholder");
};

export const pinNote = async (
  companyCode: string,
  noteId: string,
  isPinned: boolean
): Promise<void> => {
  console.log("📝 [noteService] pinNote - placeholder");
};
