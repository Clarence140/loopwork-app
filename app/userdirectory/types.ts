/**
 * ========================================
 * USER DIRECTORY - TYPE DEFINITIONS
 * ========================================
 */

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  position: string;
  department: string;
  division?: string;
  phone?: string;
  mobilePhone?: string;
  birthday?: string;
  hireDate?: string;
  status: "Active" | "Inactive" | "On Leave";
  profileImage?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  companyCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DEPARTMENT_COLORS: Record<string, string> = {
  IT: "#3B82F6",
  Engineering: "#06B6D4",
  "Human Resources": "#10B981",
  Finance: "#F59E0B",
  Marketing: "#A855F7",
  Operations: "#F97316",
  "Customer Success": "#EC4899",
  Sales: "#6366F1",
  Admin: "#64748B",
};

export const STATUS_COLORS: Record<string, string> = {
  Active: "#10B981",
  Inactive: "#6B7280",
  "On Leave": "#F59E0B",
};
