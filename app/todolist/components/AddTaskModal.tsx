/**
 * ========================================
 * ADD TASK MODAL COMPONENT
 * ========================================
 *
 * Modal with full task creation form
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { Employee, Label } from "../types";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
  employees: Employee[];
  labels: Label[];
  currentUserId: string;
}

export default function AddTaskModal({
  visible,
  onClose,
  onSubmit,
  employees,
  labels,
  currentUserId,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState(currentUserId);
  const [category, setCategory] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLabelPicker, setShowLabelPicker] = useState(false);

  const defaultLabels = [
    "Work",
    "Personal",
    "Important",
    "Urgent",
    "Meeting",
    "Review",
  ];

  const handleSubmit = () => {
    if (!title.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Convert deadline string to Date object
    let deadlineDate: Date;
    if (deadline && deadline.trim()) {
      deadlineDate = new Date(deadline);
      // Check if valid date
      if (isNaN(deadlineDate.getTime())) {
        deadlineDate = new Date(); // Default to today if invalid
      }
    } else {
      // Default to today if no deadline provided
      deadlineDate = new Date();
    }

    const taskData = {
      title: title.trim(),
      deadline: deadlineDate,
      priority,
      notes,
      assignedTo,
      category,
      tags: [],
      completed: false,
    };

    onSubmit(taskData);

    // Reset form and close modal
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDeadline("");
    setPriority("Medium");
    setNotes("");
    setAssignedTo(currentUserId);
    setCategory("");
    setShowError(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Minimalist Modal Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>New Task</Text>
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
              autoFocus
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
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                // For now, set to today if empty
                if (!deadline) {
                  const today = new Date();
                  const formatted = today.toISOString().split("T")[0];
                  setDeadline(formatted);
                }
              }}
            >
              <Text
                style={deadline ? styles.inputText : styles.placeholderText}
              >
                {deadline || "Tap to set (default: Today)"}
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => setShowLabelPicker(true)}
            >
              <Text style={styles.selectText}>
                {category || "Tap to select"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>

            {/* Label Dropdown */}
            {showLabelPicker && (
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdown}>
                  {/* No Label Option */}
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory("");
                      setShowLabelPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        !category && styles.dropdownTextActive,
                      ]}
                    >
                      No Label
                    </Text>
                    {!category && (
                      <Ionicons name="checkmark" size={18} color="#1E3A8A" />
                    )}
                  </TouchableOpacity>

                  {/* Label Options */}
                  {defaultLabels.map((label) => (
                    <TouchableOpacity
                      key={label}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategory(label);
                        setShowLabelPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          category === label && styles.dropdownTextActive,
                        ]}
                      >
                        {label}
                      </Text>
                      {category === label && (
                        <Ionicons name="checkmark" size={18} color="#1E3A8A" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
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

          {/* Submit Button - Full Width */}
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
              <Text style={styles.submitButtonText}>Add Task</Text>
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
  inputText: {
    fontSize: 15,
    color: "#111827",
  },
  placeholderText: {
    fontSize: 15,
    color: "#9CA3AF",
  },
  dropdownContainer: {
    position: "relative",
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 250,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownText: {
    fontSize: 15,
    color: "#374151",
  },
  dropdownTextActive: {
    color: "#1E3A8A",
    fontWeight: "600",
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
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  submitButton: {
    flex: 1,
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
