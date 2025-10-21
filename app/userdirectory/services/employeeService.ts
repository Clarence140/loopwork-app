/**
 * ========================================
 * USER DIRECTORY - FIREBASE SERVICE
 * ========================================
 *
 * Placeholder for Firebase operations
 */

import { Employee } from "../types";

export const getEmployees = async (
  companyCode: string
): Promise<Employee[]> => {
  console.log("👥 [employeeService] getEmployees - placeholder");
  return [];
};

export const getEmployee = async (
  companyCode: string,
  employeeId: string
): Promise<Employee | null> => {
  console.log("👥 [employeeService] getEmployee - placeholder");
  return null;
};

export const subscribeToEmployees = (
  companyCode: string,
  callback: (employees: Employee[]) => void
): (() => void) => {
  console.log("👥 [employeeService] subscribeToEmployees - placeholder");
  return () => {};
};
