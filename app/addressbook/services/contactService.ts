/**
 * ========================================
 * ADDRESS BOOK - FIREBASE SERVICE
 * ========================================
 *
 * Placeholder for Firebase operations
 */

import { Contact, ContactFormData } from "../types";

export const getContacts = async (
  companyCode: string,
  userId: string
): Promise<Contact[]> => {
  console.log("📇 [contactService] getContacts - placeholder");
  return [];
};

export const addContact = async (
  companyCode: string,
  userId: string,
  contactData: ContactFormData
): Promise<string> => {
  console.log("📇 [contactService] addContact - placeholder");
  return "contact_" + Date.now();
};

export const updateContact = async (
  companyCode: string,
  contactId: string,
  contactData: Partial<ContactFormData>
): Promise<void> => {
  console.log("📇 [contactService] updateContact - placeholder");
};

export const deleteContact = async (
  companyCode: string,
  contactId: string
): Promise<void> => {
  console.log("📇 [contactService] deleteContact - placeholder");
};
