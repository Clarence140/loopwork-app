/**
 * ========================================
 * EDIT TASK MODAL COMPONENT
 * ========================================
 *
 * Modal for editing existing tasks
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Employee, Label, Task } from "../types";

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (taskId: string, taskData: Partial<Task>) => void;
  employees: Employee[];
  labels: Label[];
}

export default function EditTaskModal({
  visible,
  task,
  onClose,
  onSubmit,
  employees,
  labels,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("");
  const [showError, setShowError] = useState(false);

  // Load task data when modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDeadline(
        task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : ""
      );
      setPriority(task.priority || "Medium");
      setNotes(task.notes || "");
      setAssignedTo(task.assignedTo || "");
      setCategory(task.category || "");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!task) return;

    const taskData: Partial<Task> = {
      title: title.trim(),
      deadline: deadline ? new Date(deadline) : task.deadline,
      priority,
      notes,
      assignedTo,
      category,
    };

    onSubmit(task.id, taskData);
    onClose();
  };

  const handleClose = () => {
    setShowError(false);
    onClose();
  };

  if (!task) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>Edit Task</Text>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={26} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Task Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
              placeholderTextColor="#9CA3AF"
            />
            {showError && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text style={styles.errorText}>Task title is required</Text>
              </View>
            )}
          </View>

          {/* Deadline */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Deadline</Text>
            <TextInput
              style={styles.input}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Priority */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
              {(["High", "Medium", "Low"] as const).map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  style={[
                    styles.priorityButton,
                    priority === p && styles.priorityButtonActive,
                    priority === p && p === "High" && styles.priorityHigh,
                    priority === p && p === "Medium" && styles.priorityMedium,
                    priority === p && p === "Low" && styles.priorityLow,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      priority === p && styles.priorityTextActive,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Assign To */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Assign To</Text>
            <View style={styles.selectWrapper}>
              <Text style={styles.selectText}>
                {employees.find((e) => e.id === assignedTo)?.name || "Select"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>
          </View>

          {/* Label */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Label</Text>
            <View style={styles.selectWrapper}>
              <Text style={styles.selectText}>{category || "No Label"}</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>
          </View>

          {/* Notes */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional details, description, or notes..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                !title.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!title.trim()}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 6,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    minHeight: 46,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    minHeight: 44,
    justifyContent: "center",
  },
  priorityButtonActive: {
    borderWidth: 2,
  },
  priorityHigh: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },
  priorityMedium: {
    backgroundColor: "#DBEAFE",
    borderColor: "#3B82F6",
  },
  priorityLow: {
    backgroundColor: "#D1FAE5",
    borderColor: "#10B981",
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  priorityTextActive: {
    color: "#111827",
  },
  selectWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    minHeight: 46,
  },
  selectText: {
    fontSize: 14,
    color: "#111827",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
    marginLeft: 6,
  },
  buttonRow: {
    marginTop: 16,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
