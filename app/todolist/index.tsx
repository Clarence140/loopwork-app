/**
 * ========================================
 * TODOLIST - MAIN SCREEN
 * ========================================
 *
 * Main route for the Todo List application
 * Handles the main logic and state management
 */

import AppHeader from "@/components/app-header";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import SuccessToast from "./components/SuccessToast";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import {
  mockCurrentUser,
  mockEmployees,
  mockLabels,
  mockTasks,
} from "./mockData";
import { Task, TaskGroup } from "./types";

export default function TodoListScreen() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Active" | "Completed"
  >("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Helper: Get user name by ID
  const getUserName = (userId: string): string => {
    const employee = mockEmployees.find((e) => e.id === userId);
    return employee ? employee.name : "Unknown";
  };

  // Filter tasks based on search and status
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.notes.toLowerCase().includes(query) ||
          task.category.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus === "Active") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filterStatus === "Completed") {
      filtered = filtered.filter((task) => task.completed);
    }

    return filtered;
  }, [tasks, searchQuery, filterStatus]);

  // Helper: Group tasks by FOCUS VIEW logic
  const groupTasks = useMemo((): TaskGroup => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);

    const groups: TaskGroup = {
      urgent: [], // Overdue + Today
      upcoming: [], // Tomorrow + Next 7 days
      later: [], // Beyond 7 days
      completed: [],
    };

    filteredTasks.forEach((task) => {
      if (task.completed) {
        groups.completed.push(task);
        return;
      }

      const deadline = new Date(task.deadline);
      const taskDate = new Date(
        deadline.getFullYear(),
        deadline.getMonth(),
        deadline.getDate()
      );

      if (taskDate <= today) {
        // Overdue or Today = URGENT
        groups.urgent.push(task);
      } else if (taskDate <= next7Days) {
        // Tomorrow to next 7 days = UPCOMING
        groups.upcoming.push(task);
      } else {
        // Beyond 7 days = LATER
        groups.later.push(task);
      }
    });

    return groups;
  }, [filteredTasks]);

  // Add new task
  const handleAddTask = (taskData: any) => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: taskData.title,
      deadline: taskData.deadline,
      priority: taskData.priority,
      notes: taskData.notes || "",
      completed: false,
      category: taskData.category || "",
      tags: taskData.tags || [],
      createdBy: mockCurrentUser.id,
      assignedTo: taskData.assignedTo || mockCurrentUser.id,
      createdAt: new Date(),
      completedAt: null,
      companyCode: mockCurrentUser.companyCode,
    };

    setTasks([...tasks, newTask]);
    setSuccessMessage("Task created successfully!");
    setShowSuccessToast(true);
  };

  // Toggle task completion
  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date() : null,
            }
          : t
      )
    );
    if (task) {
      setSuccessMessage(
        task.completed ? "Task marked as active!" : "Task completed!"
      );
      setShowSuccessToast(true);
    }
  };

  // Edit task (placeholder for now)
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleSaveEdit = (taskId: string, taskData: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    );
    setSuccessMessage("Changes saved successfully!");
    setShowSuccessToast(true);
  };

  // Delete task
  const handleDeleteTask = (task: Task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    setSuccessMessage("Task deleted successfully!");
    setShowSuccessToast(true);
  };

  const activeTasks = tasks.filter((t) => !t.completed).length;

  return (
    <View style={styles.container}>
      {/* App Header - Consistent across all apps */}
      <AppHeader
        title="TodoList"
        subtitle={`${activeTasks} active task${activeTasks !== 1 ? "s" : ""}`}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Search and Filters - Now at top! */}
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
        />

        {/* Task List with Groups - Tasks visible immediately! */}
        <TaskList
          taskGroups={groupTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          getUserName={getUserName}
        />
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Task Modal */}
      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTask}
        employees={mockEmployees}
        labels={mockLabels}
        currentUserId={mockCurrentUser.id}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        visible={showEditModal}
        task={taskToEdit}
        onClose={() => {
          setShowEditModal(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleSaveEdit}
        employees={mockEmployees}
        labels={mockLabels}
      />

      {/* Success Toast */}
      <SuccessToast
        visible={showSuccessToast}
        message={successMessage}
        onHide={() => setShowSuccessToast(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
