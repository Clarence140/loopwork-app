/**
 * ========================================
 * DELETE CONFIRMATION MODAL
 * ========================================
 *
 * Confirmation dialog before deleting a task
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../types";

interface DeleteConfirmModalProps {
  visible: boolean;
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  visible,
  task,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Ionicons name="trash" size={32} color="#EF4444" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Delete Task?</Text>

          {/* Message */}
          <Text style={styles.message}>
            Are you sure you want to delete{"\n"}
            <Text style={styles.taskTitle}>"{task.title}"</Text>?
          </Text>
          <Text style={styles.warning}>This action cannot be undone.</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Ionicons name="trash" size={18} color="#FFFFFF" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 22,
  },
  taskTitle: {
    fontWeight: "600",
    color: "#111827",
  },
  warning: {
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
