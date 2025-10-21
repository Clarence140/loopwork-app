/**
 * ========================================
 * NOTEPAD - TYPE DEFINITIONS
 * ========================================
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string; // Work, Personal, Ideas, etc.
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  companyCode: string;
  color?: string; // Optional color for note (for visual distinction)
  isPinned?: boolean; // Optional pin to top
}

export interface NoteFormData {
  title: string;
  content: string;
  category: string;
  color?: string;
  isPinned?: boolean;
}

export const NOTE_CATEGORIES = [
  { value: "Personal", color: "#10B981", icon: "person" },
  { value: "Work", color: "#3B82F6", icon: "briefcase" },
  { value: "Ideas", color: "#F59E0B", icon: "bulb" },
  { value: "Important", color: "#EF4444", icon: "alert-circle" },
  { value: "Other", color: "#6B7280", icon: "document-text" },
] as const;
