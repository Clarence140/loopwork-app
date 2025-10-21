/**
 * ========================================
 * CIRCULATION REPORT TYPES
 * ========================================
 *
 * TypeScript type definitions for Circulation Reports
 */

export interface CirculationReport {
  id: string;
  title: string;
  subject: string;
  content: string;
  recipients: string[];
  deadline: Date | string;
  status: "pending" | "approved" | "rejected" | "completed";
  createdBy: string;
  createdAt: Date;
  companyCode: string;
  attachments?: Attachment[];
  tags?: string[];
  inputMode?: "editor" | "form";
  formFields?: Record<string, any>;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}
