/**
 * ========================================
 * MOCK DATA FOR TODOLIST
 * ========================================
 *
 * Temporary mock data for UI development
 * Will be replaced with real Firestore data later
 */

import { Employee, Label, Task } from "./types";

// Mock employees for assignment
export const mockEmployees: Employee[] = [
  {
    id: "emp001",
    name: "John Doe",
    email: "john@company.com",
    department: "IT",
    position: "Manager",
  },
  {
    id: "emp002",
    name: "Jane Smith",
    email: "jane@company.com",
    department: "HR",
    position: "Specialist",
  },
  {
    id: "emp003",
    name: "Mike Johnson",
    email: "mike@company.com",
    department: "Operations",
    position: "Supervisor",
  },
  {
    id: "emp004",
    name: "Sarah Williams",
    email: "sarah@company.com",
    department: "Finance",
    position: "Analyst",
  },
];

// Mock labels/categories
export const mockLabels: Label[] = [
  { id: "label001", name: "Work", color: "#3B82F6" },
  { id: "label002", name: "Personal", color: "#10B981" },
  { id: "label003", name: "Urgent", color: "#EF4444" },
  { id: "label004", name: "Meeting", color: "#8B5CF6" },
  { id: "label005", name: "Review", color: "#F59E0B" },
];

// Mock tasks for testing
export const mockTasks: Task[] = [
  {
    id: "task001",
    title: "Review Q4 Budget Report",
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (OVERDUE)
    priority: "High",
    notes:
      "Need to review and approve the Q4 budget allocations for all departments.",
    completed: false,
    category: "Work",
    tags: ["urgent", "finance"],
    createdBy: "emp002",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task002",
    title: "Update employee handbook",
    deadline: new Date(), // TODAY
    priority: "Medium",
    notes:
      "Update the employee handbook with new company policies and procedures.",
    completed: false,
    category: "Work",
    tags: ["hr", "documentation"],
    createdBy: "emp001",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task003",
    title: "Team meeting preparation",
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // TOMORROW
    priority: "Medium",
    notes:
      "Prepare agenda and presentation materials for the monthly team meeting.",
    completed: false,
    category: "Meeting",
    tags: ["meeting", "presentation"],
    createdBy: "emp001",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task004",
    title: "Complete project documentation",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // NEXT WEEK
    priority: "Low",
    notes: "Finalize all project documentation before handoff to client.",
    completed: false,
    category: "Work",
    tags: ["documentation", "project"],
    createdBy: "emp001",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task005",
    title: "Submit expense report",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // YESTERDAY (OVERDUE)
    priority: "High",
    notes: "Submit all receipts and expense claims for business trip.",
    completed: false,
    category: "Personal",
    tags: ["finance", "urgent"],
    createdBy: "emp001",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task006",
    title: "Review code pull requests",
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (OVERDUE)
    priority: "High",
    notes:
      "Review and approve pending code pull requests from the development team.",
    completed: true,
    category: "Review",
    tags: ["development", "code-review"],
    createdBy: "emp001",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    companyCode: "ABCD",
  },
  {
    id: "task007",
    title: "Onboard new employee",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 DAYS LATER
    priority: "Medium",
    notes:
      "Prepare workstation and schedule orientation sessions for new hire.",
    completed: false,
    category: "Work",
    tags: ["hr", "onboarding"],
    createdBy: "emp002",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    completedAt: null,
    companyCode: "ABCD",
  },
  {
    id: "task008",
    title: "Fix production bug",
    deadline: new Date(), // TODAY
    priority: "High",
    notes:
      "Critical bug in production - users cannot submit forms. Need immediate fix!",
    completed: true,
    category: "Work",
    tags: ["urgent", "bug"],
    createdBy: "emp003",
    assignedTo: "emp001",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    completedAt: new Date(),
    companyCode: "ABCD",
  },
];

// Current logged-in user (for testing)
export const mockCurrentUser = {
  id: "emp001",
  name: "John Doe",
  email: "john@company.com",
  companyCode: "ABCD",
};
