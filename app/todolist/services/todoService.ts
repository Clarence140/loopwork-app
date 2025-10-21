/**
 * ========================================
 * TODOLIST SERVICE
 * ========================================
 *
 * Handles all Firestore operations for tasks
 * Functions only - no UI components
 * Based on loopwork web version
 */

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Task } from "../types";

/**
 * ========================================
 * TASK OPERATIONS
 * ========================================
 */

/**
 * Get all tasks for a specific employee
 * @param companyCode - Company code
 * @param employeeId - Employee ID
 * @param filter - "myTasks" | "createdByMe"
 * @returns Promise<Task[]> - Array of tasks
 */
export const getTasks = async (
  companyCode: string,
  employeeId: string,
  filter: "myTasks" | "createdByMe" = "myTasks"
): Promise<Task[]> => {
  try {
    if (!db) {
      console.warn("⚠️ Firestore not initialized");
      return [];
    }

    const tasksRef = collection(db, "companies", companyCode, "tasks");
    let q;

    if (filter === "myTasks") {
      // Get tasks assigned TO this employee
      q = query(tasksRef, where("assignedTo", "==", employeeId));
    } else if (filter === "createdByMe") {
      // Get tasks created BY this employee
      q = query(tasksRef, where("createdBy", "==", employeeId));
    } else {
      // Default: get tasks assigned to this employee
      q = query(tasksRef, where("assignedTo", "==", employeeId));
    }

    console.log(`🔍 [todoService] Querying tasks for:`, {
      companyCode,
      employeeId,
      filter,
    });

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const taskData: Task = {
        id: doc.id,
        title: data.title || "",
        deadline: data.deadline?.toDate?.() || data.deadline,
        priority: data.priority || "Medium",
        notes: data.notes || "",
        completed: data.completed || false,
        category: data.category || "",
        tags: data.tags || [],
        createdBy: data.createdBy || "",
        assignedTo: data.assignedTo || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
        completedAt: data.completedAt?.toDate?.() || null,
        companyCode: data.companyCode || companyCode,
        sourceDocumentId: data.sourceDocumentId,
      };

      console.log(`📋 [todoService] Found task:`, {
        id: doc.id,
        title: taskData.title,
        assignedTo: taskData.assignedTo,
        createdBy: taskData.createdBy,
      });

      // Filter for "createdByMe": exclude self-assigned tasks
      if (filter === "createdByMe") {
        if (taskData.assignedTo !== employeeId) {
          tasks.push(taskData);
        }
      } else {
        tasks.push(taskData);
      }
    });

    console.log(
      `✅ [todoService] Retrieved ${tasks.length} tasks for ${employeeId} (${filter})`
    );
    return tasks;
  } catch (error) {
    console.error("❌ [todoService] Error getting tasks:", error);
    throw error;
  }
};

/**
 * Subscribe to real-time task updates
 * @param companyCode - Company code
 * @param employeeId - Employee ID
 * @param callback - Function to call when tasks update
 * @param filter - "myTasks" | "createdByMe"
 * @returns Unsubscribe function
 */
export const subscribeToTasks = (
  companyCode: string,
  employeeId: string,
  callback: (tasks: Task[]) => void,
  filter: "myTasks" | "createdByMe" = "myTasks"
) => {
  try {
    if (!db) {
      console.warn("⚠️ Firestore not initialized");
      return () => {};
    }

    const tasksRef = collection(db, "companies", companyCode, "tasks");
    let q;

    if (filter === "myTasks") {
      q = query(tasksRef, where("assignedTo", "==", employeeId));
    } else if (filter === "createdByMe") {
      q = query(tasksRef, where("createdBy", "==", employeeId));
    } else {
      q = query(tasksRef, where("assignedTo", "==", employeeId));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks: Task[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const taskData: Task = {
          id: doc.id,
          title: data.title || "",
          deadline: data.deadline?.toDate?.() || data.deadline,
          priority: data.priority || "Medium",
          notes: data.notes || "",
          completed: data.completed || false,
          category: data.category || "",
          tags: data.tags || [],
          createdBy: data.createdBy || "",
          assignedTo: data.assignedTo || "",
          createdAt: data.createdAt?.toDate?.() || new Date(),
          completedAt: data.completedAt?.toDate?.() || null,
          companyCode: data.companyCode || companyCode,
          sourceDocumentId: data.sourceDocumentId,
        };

        // Filter for "createdByMe": exclude self-assigned tasks
        if (filter === "createdByMe") {
          if (taskData.assignedTo !== employeeId) {
            tasks.push(taskData);
          }
        } else {
          tasks.push(taskData);
        }
      });

      callback(tasks);
    });

    return unsubscribe;
  } catch (error) {
    console.error("❌ [todoService] Error subscribing to tasks:", error);
    return () => {};
  }
};

/**
 * Add a new task
 */
export const addTask = async (
  companyCode: string,
  employeeId: string,
  taskData: any
) => {
  // Implementation in next step
  return "";
};

/**
 * Update an existing task
 */
export const updateTask = async (
  companyCode: string,
  taskId: string,
  updates: any
) => {
  // Implementation in next step
};

/**
 * Delete a task
 */
export const deleteTask = async (companyCode: string, taskId: string) => {
  // Implementation in next step
};

/**
 * Toggle task completion
 */
export const toggleTaskCompletion = async (
  companyCode: string,
  taskId: string,
  completed: boolean
) => {
  // Implementation in next step
};
