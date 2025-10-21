/**
 * ========================================
 * TODOLIST TYPES
 * ========================================
 *
 * TypeScript type definitions for Todo List
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
  createdBy: string;
  assignedTo: string;
  createdAt: Date;
  completedAt: Date | null;
  companyCode: string;
  sourceDocumentId?: string; // For circulation report integration
}

export interface TaskSettings {
  taskViewMode: "compact" | "normal" | "comfortable";
  maxOverdueTasks: number;
  defaultPriority: "High" | "Medium" | "Low";
  defaultDeadline: "none" | "today" | "tomorrow" | "nextWeek";
  autoDeleteCompleted: number; // days
  defaultSort: "manual" | "priority" | "deadline";
}

export interface Label {
  id: string;
  name: string;
  color: string;
}
