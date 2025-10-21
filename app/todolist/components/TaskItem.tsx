/**
 * ========================================
 * TASK ITEM COMPONENT
 * ========================================
 *
 * Single task card display
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "../types";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  getUserName: (userId: string) => string;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  getUserName,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwipedOpen, setIsSwipedOpen] = useState(false);

  const SWIPE_THRESHOLD = -80; // Minimum swipe distance to reveal actions
  const ACTION_WIDTH = 150; // Width of action buttons area

  // Pan responder for swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        );
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow left swipe (negative dx)
        if (gestureState.dx < 0) {
          translateX.setValue(Math.max(gestureState.dx, -ACTION_WIDTH));
        } else if (isSwipedOpen) {
          // Allow right swipe to close if already open
          translateX.setValue(
            Math.max(gestureState.dx - ACTION_WIDTH, -ACTION_WIDTH)
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          // Swipe left detected - open actions
          Animated.spring(translateX, {
            toValue: -ACTION_WIDTH,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
          setIsSwipedOpen(true);
        } else {
          // Close actions
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
          setIsSwipedOpen(false);
        }
      },
    })
  ).current;

  const closeSwipe = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
    setIsSwipedOpen(false);
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (task.completed) return false;
    const deadline = new Date(task.deadline);
    const now = new Date();
    return deadline < now;
  };

  // Format deadline
  const formatDeadline = () => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDate = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate()
    );

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;

    return deadline.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        deadline.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Get priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return {
          bg: "#FEE2E2",
          border: "#EF4444",
          text: "#991B1B",
        };
      case "Medium":
        return {
          bg: "#DBEAFE",
          border: "#3B82F6",
          text: "#1E40AF",
        };
      case "Low":
        return {
          bg: "#D1FAE5",
          border: "#10B981",
          text: "#065F46",
        };
    }
  };

  const priorityColors = getPriorityColor();

  return (
    <View style={styles.container}>
      {/* Hidden Action Buttons (Behind) */}
      <View style={styles.hiddenActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            closeSwipe();
            onEdit && onEdit(task);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={22} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            closeSwipe();
            setShowDeleteConfirm(true);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Main Task Row (Swipeable) */}
      <Animated.View
        style={[styles.swipeableContainer, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.taskRow}
          onPress={() => {
            if (isSwipedOpen) {
              closeSwipe();
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          activeOpacity={0.7}
        >
          {/* Checkbox */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
            style={styles.checkbox}
            activeOpacity={0.7}
          >
            {task.completed ? (
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="#D1D5DB" />
            )}
          </TouchableOpacity>

          {/* Task Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text
              style={[styles.title, task.completed && styles.titleCompleted]}
              numberOfLines={2}
            >
              {task.title}
            </Text>

            {/* Meta Info */}
            <View style={styles.metaRow}>
              {/* Deadline */}
              <View style={styles.metaItem}>
                <Ionicons
                  name="calendar-outline"
                  size={12}
                  color={isOverdue() ? "#EF4444" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.metaText,
                    isOverdue() && styles.metaTextOverdue,
                    task.completed && styles.metaTextCompleted,
                  ]}
                >
                  {formatDeadline()}
                </Text>
              </View>

              {/* Priority Badge */}
              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor: priorityColors.bg,
                    borderColor: priorityColors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityBadgeText,
                    { color: priorityColors.text },
                  ]}
                >
                  {task.priority}
                </Text>
              </View>

              {/* Assigned To */}
              {task.assignedTo && (
                <View style={styles.metaItem}>
                  <Ionicons name="person-outline" size={12} color="#6B7280" />
                  <Text style={styles.metaText}>
                    {getUserName(task.assignedTo)}
                  </Text>
                </View>
              )}
            </View>

            {/* Category/Label */}
            {task.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{task.category}</Text>
              </View>
            )}

            {/* Circulation Report Badge */}
            {task.sourceDocumentId && (
              <View style={styles.sourceBadge}>
                <Ionicons name="document-text" size={12} color="#3B82F6" />
                <Text style={styles.sourceBadgeText}>
                  From Circulation Report
                </Text>
              </View>
            )}
          </View>

          {/* Expand Chevron Only */}
          <TouchableOpacity
            style={styles.expandButton}
            onPress={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>

      {/* Expanded Notes Section */}
      {isExpanded && task.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{task.notes}</Text>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        visible={showDeleteConfirm}
        task={task}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete && onDelete(task);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    position: "relative",
  },
  hiddenActions: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "stretch",
  },
  editButton: {
    backgroundColor: "#3B82F6",
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  swipeableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  taskRow: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    lineHeight: 22,
    flexShrink: 1,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  metaTextOverdue: {
    color: "#EF4444",
    fontWeight: "600",
  },
  metaTextCompleted: {
    color: "#9CA3AF",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  sourceBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: "#93C5FD",
  },
  sourceBadgeText: {
    fontSize: 10,
    color: "#1E40AF",
    fontWeight: "600",
  },
  expandButton: {
    padding: 6,
    minWidth: 32,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginLeft: 4,
  },
  notesSection: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    paddingLeft: 52,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
  },
});
