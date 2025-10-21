/**
 * ========================================
 * TASK INPUT COMPONENT
 * ========================================
 *
 * Form component for creating new tasks
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Employee, Label } from "../types";

interface TaskInputProps {
  onSubmit: (taskData: any) => void;
  employees: Employee[];
  labels: Label[];
  currentUserId: string;
}

export default function TaskInput({
  onSubmit,
  employees,
  labels,
  currentUserId,
}: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState(currentUserId);
  const [category, setCategory] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const taskData = {
      title: title.trim(),
      deadline: deadline || new Date(),
      priority,
      notes,
      assignedTo,
      category,
      tags: [],
      completed: false,
    };

    onSubmit(taskData);

    // Reset form
    setTitle("");
    setDeadline("");
    setPriority("Medium");
    setNotes("");
    setAssignedTo(currentUserId);
    setCategory("");
    setShowError(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.headerTitle}>Create New Task</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* Priority - Full Width for Better Touch Targets */}
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

        {/* Assign To and Category Row */}
        <View style={styles.row}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Assign To</Text>
            <View style={styles.selectWrapper}>
              <Text style={styles.selectText}>
                {employees.find((e) => e.id === assignedTo)?.name || "Select"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>
          </View>

          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Label</Text>
            <View style={styles.selectWrapper}>
              <Text style={styles.selectText}>{category || "No Label"}</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#1E3A8A",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    minHeight: 48,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    minHeight: 48,
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
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    minHeight: 48,
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
  submitButton: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
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
