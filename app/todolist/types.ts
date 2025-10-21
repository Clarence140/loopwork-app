/**
 * ========================================
 * TODOLIST TYPES
 * ========================================
 *
 * TypeScript type definitions for Todo List
 * Matching the web version structure
 */

export interface Task {
  id: string;
  title: string;
  deadline: Date | string;
  priority: "High" | "Medium" | "Low";
  notes: string;
  completed: boolean;
  category: string;
  tags: string[];
  createdBy: string; // Employee ID who created the task
  assignedTo: string; // Employee ID who should do the task
  createdAt: Date;
  completedAt: Date | null;
  companyCode: string;
  sourceDocumentId?: string; // For circulation report integration
}

export interface TaskSettings {
  activeSection?: string;
  // Task Display & Layout
  taskViewMode: "compact" | "normal" | "comfortable";
  maxOverdueTasks: number; // 3, 5, 10, or 999 (unlimited)
  notesPreviewLength: number; // 30, 50, 100
  showTaskCounts: boolean;
  // Task Behavior & Defaults
  defaultPriority: "High" | "Medium" | "Low";
  defaultDeadline: "none" | "today" | "tomorrow" | "nextWeek";
  autoDeleteCompleted: number; // days: never=0, 1, 3, 7, 30
  defaultSort: "manual" | "priority" | "deadline";
  // Notifications
  deadlineReminders?: "off" | "1hour" | "1day";
  overdueAlerts?: "off" | "daily" | "immediate";
  completionCelebrations?: "off" | "simple" | "animated";
  // Quick Actions
  taskCompletion?: "confirmation" | "direct";
  notesModal?: "auto" | "click";
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Employee {
  id: string;
  name: string;
  email?: string;
  department?: string;
  position?: string;
}

export interface TaskGroup {
  urgent: Task[]; // Overdue + Today
  upcoming: Task[]; // Tomorrow + Next 7 days
  later: Task[]; // Beyond 7 days
  completed: Task[];
}
