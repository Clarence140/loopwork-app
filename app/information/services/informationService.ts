/**
 * ========================================
 * INFORMATION - FIREBASE SERVICE
 * ========================================
 *
 * Placeholder for Firebase operations
 */

import { InformationPost } from "../types";

export const getPosts = async (
  companyCode: string,
  userId: string
): Promise<InformationPost[]> => {
  console.log("📢 [informationService] getPosts - placeholder");
  return [];
};

export const addPost = async (
  companyCode: string,
  userId: string,
  postData: any
): Promise<string> => {
  console.log("📢 [informationService] addPost - placeholder");
  return "post_" + Date.now();
};

export const updatePost = async (
  companyCode: string,
  postId: string,
  postData: Partial<any>
): Promise<void> => {
  console.log("📢 [informationService] updatePost - placeholder");
};

export const deletePost = async (
  companyCode: string,
  postId: string
): Promise<void> => {
  console.log("📢 [informationService] deletePost - placeholder");
};

export const markAsRead = async (
  companyCode: string,
  postId: string,
  userId: string
): Promise<void> => {
  console.log("📢 [informationService] markAsRead - placeholder");
};
