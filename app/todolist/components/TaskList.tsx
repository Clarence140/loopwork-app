/**
 * ========================================
 * TASK LIST COMPONENT
 * ========================================
 *
 * Displays the list of tasks with grouping
 * (Overdue, Today, Tomorrow, Future, Completed)
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task, TaskGroup } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  taskGroups: TaskGroup;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  getUserName: (userId: string) => string;
}

export default function TaskList({
  taskGroups,
  onToggleComplete,
  onEdit,
  onDelete,
  getUserName,
}: TaskListProps) {
  const [isUrgentCollapsed, setIsUrgentCollapsed] = useState(false); // Expanded by default
  const [isUpcomingCollapsed, setIsUpcomingCollapsed] = useState(true);
  const [isLaterCollapsed, setIsLaterCollapsed] = useState(true);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(true);

  // Render a task group section
  const renderGroup = (
    title: string,
    tasks: Task[],
    icon: string,
    color: string,
    isCollapsed: boolean,
    onToggleCollapse?: () => void,
    isUrgent = false
  ) => {
    if (tasks.length === 0) return null;

    const isCollapsible = onToggleCollapse !== undefined;

    return (
      <View
        style={[styles.groupContainer, isUrgent && styles.urgentContainer]}
        key={title}
      >
        {/* Group Header */}
        <TouchableOpacity
          style={[styles.groupHeader, isUrgent && styles.urgentHeader]}
          onPress={() =>
            isCollapsible && onToggleCollapse && onToggleCollapse()
          }
          activeOpacity={isCollapsible ? 0.7 : 1}
          disabled={!isCollapsible}
        >
          <View style={styles.groupHeaderLeft}>
            <View style={[styles.groupIcon, { backgroundColor: color + "20" }]}>
              <Ionicons
                name={icon as any}
                size={isUrgent ? 20 : 16}
                color={color}
              />
            </View>
            <Text style={[styles.groupTitle, isUrgent && styles.urgentTitle]}>
              {title}
            </Text>
            <View
              style={[styles.countBadge, isUrgent && styles.urgentCountBadge]}
            >
              <Text
                style={[styles.countText, isUrgent && styles.urgentCountText]}
              >
                {tasks.length}
              </Text>
            </View>
          </View>
          {isCollapsible && (
            <Ionicons
              name={isCollapsed ? "chevron-down" : "chevron-up"}
              size={20}
              color={isUrgent ? "#DC2626" : "#6B7280"}
            />
          )}
        </TouchableOpacity>

        {/* Tasks */}
        {!isCollapsed && (
          <View style={styles.tasksContainer}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                getUserName={getUserName}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const totalTasks =
    taskGroups.urgent.length +
    taskGroups.upcoming.length +
    taskGroups.later.length +
    taskGroups.completed.length;

  if (totalTasks === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="checkmark-done-circle-outline"
          size={64}
          color="#D1D5DB"
        />
        <Text style={styles.emptyTitle}>No tasks yet</Text>
        <Text style={styles.emptyText}>
          Tap the + button below to create your first task!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* URGENT: Overdue + Today (Collapsible, but expanded by default) */}
      {renderGroup(
        "🚨 URGENT",
        taskGroups.urgent,
        "alert-circle",
        "#DC2626",
        isUrgentCollapsed,
        () => setIsUrgentCollapsed(!isUrgentCollapsed),
        true
      )}

      {/* UPCOMING: Tomorrow + Next 7 days (Collapsible) */}
      {renderGroup(
        "📅 UPCOMING",
        taskGroups.upcoming,
        "calendar",
        "#3B82F6",
        isUpcomingCollapsed,
        () => setIsUpcomingCollapsed(!isUpcomingCollapsed)
      )}

      {/* LATER: Beyond 7 days (Collapsible) */}
      {renderGroup(
        "📆 LATER",
        taskGroups.later,
        "time",
        "#6B7280",
        isLaterCollapsed,
        () => setIsLaterCollapsed(!isLaterCollapsed)
      )}

      {/* COMPLETED: Done tasks (Collapsible) */}
      {renderGroup(
        "✅ COMPLETED",
        taskGroups.completed,
        "checkmark-circle",
        "#10B981",
        isCompletedCollapsed,
        () => setIsCompletedCollapsed(!isCompletedCollapsed)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: 20,
  },
  urgentContainer: {
    marginBottom: 20,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  urgentHeader: {
    marginBottom: 14,
  },
  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  groupIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
  },
  countBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  urgentCountBadge: {
    backgroundColor: "#FEE2E2",
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  urgentCountText: {
    color: "#DC2626",
    fontWeight: "700",
  },
  tasksContainer: {
    gap: 0,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
