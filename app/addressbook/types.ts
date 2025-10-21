/**
 * ========================================
 * ADDRESS BOOK - TYPE DEFINITIONS
 * ========================================
 */

export interface Contact {
  id: string;
  name: string;
  company?: string;
  telephone?: string;
  mobilePhone?: string;
  email?: string;
  birthday?: string;
  jobTitle?: string;
  department?: string;
  category: "Personal" | "Public" | "Company";
  isPublic: boolean;
  createdBy: string;
  companyCode: string;
  // Address fields
  street?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  countryRegion?: string;
  // Additional fields
  workplace?: string;
  workplacePhone?: string;
  division?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  company?: string;
  telephone?: string;
  mobilePhone?: string;
  email?: string;
  birthday?: string;
  jobTitle?: string;
  department?: string;
  category: "Personal" | "Public" | "Company";
  isPublic: boolean;
  street?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  countryRegion?: string;
}

export const CONTACT_CATEGORIES = [
  { value: "Personal", color: "#10B981", icon: "person" },
  { value: "Public", color: "#3B82F6", icon: "globe" },
  { value: "Company", color: "#F59E0B", icon: "business" },
] as const;
