/**
 * ========================================
 * INFORMATION - TYPE DEFINITIONS
 * ========================================
 */

export interface InformationPost {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryIcon?: string;
  priority: "Urgent" | "High" | "Medium" | "Low" | "Standard";
  createdBy: string;
  createdByName: string;
  startDate?: Date;
  endDate?: Date;
  isAccessibleToAll: boolean;
  recipients?: string[]; // Employee IDs
  departments?: string[]; // Department names
  attachments?: Attachment[];
  readBy?: string[]; // Employee IDs who read this
  createdAt: Date;
  updatedAt: Date;
  companyCode: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const PRIORITY_OPTIONS = [
  { value: "Standard", color: "#6B7280", label: "Standard" },
  { value: "Low", color: "#10B981", label: "Low" },
  { value: "Medium", color: "#F59E0B", label: "Medium" },
  { value: "High", color: "#F97316", label: "High" },
  { value: "Urgent", color: "#EF4444", label: "Urgent" },
] as const;

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "announcements", name: "Announcements", icon: "📢", count: 0 },
  { id: "updates", name: "Updates", icon: "🔔", count: 0 },
  { id: "events", name: "Events", icon: "🎉", count: 0 },
  { id: "reminders", name: "Reminders", icon: "⏰", count: 0 },
  { id: "policies", name: "Policies", icon: "📋", count: 0 },
];
