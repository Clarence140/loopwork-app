/**
 * ========================================
 * CREATE POST MODAL
 * ========================================
 *
 * Create new announcement/bulletin
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Category, PRIORITY_OPTIONS } from "../types";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  categories: Category[];
}

export default function CreatePostModal({
  visible,
  onClose,
  onSave,
  categories,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState<
    "Urgent" | "High" | "Medium" | "Low" | "Standard"
  >("Standard");
  const [showError, setShowError] = useState(false);
  const contentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]?.id || "");
    }
  }, [visible, categories]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!selectedCategory) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const selectedCat = categories.find((c) => c.id === selectedCategory);

    onSave({
      title: title.trim(),
      content: content.trim(),
      category: selectedCat?.name || "General",
      categoryIcon: selectedCat?.icon || "📄",
      priority,
      isAccessibleToAll: true,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPriority("Standard");
    setShowError(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const insertFormatting = (before: string, after: string = "") => {
    if (contentInputRef.current) {
      const newContent = content + before + after;
      setContent(newContent);
      contentInputRef.current.focus();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Announcement</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.headerButton}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.saveButton}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Error */}
            {showError && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
                <Text style={styles.errorText}>
                  Title, content, and category are required
                </Text>
              </View>
            )}

            {/* Category Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Category <Text style={styles.required}>*</Text>
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories
                  .filter((cat) => !cat.isDefault)
                  .map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                      style={[
                        styles.categoryChip,
                        selectedCategory === cat.id &&
                          styles.categoryChipActive,
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.categoryChipIcon}>{cat.icon}</Text>
                      <Text
                        style={[
                          styles.categoryChipText,
                          selectedCategory === cat.id &&
                            styles.categoryChipTextActive,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            {/* Priority */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityRow}>
                {PRIORITY_OPTIONS.slice(1).map((p) => (
                  <TouchableOpacity
                    key={p.value}
                    onPress={() => setPriority(p.value as any)}
                    style={[
                      styles.priorityButton,
                      priority === p.value && {
                        backgroundColor: p.color + "20",
                        borderColor: p.color,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.priorityButtonText,
                        priority === p.value && {
                          color: p.color,
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {p.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Title */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Announcement title..."
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
            </View>

            {/* Formatting Toolbar */}
            <View style={styles.toolbar}>
              <TouchableOpacity
                style={styles.toolButton}
                onPress={() => insertFormatting("**", "**")}
                activeOpacity={0.7}
              >
                <Text style={styles.toolButtonText}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolButton}
                onPress={() => insertFormatting("*", "*")}
                activeOpacity={0.7}
              >
                <Text style={[styles.toolButtonText, styles.italic]}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolButton}
                onPress={() => {
                  const newContent = content + (content ? "\n" : "") + "• ";
                  setContent(newContent);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="list" size={18} color="#6B7280" />
              </TouchableOpacity>
              <View style={styles.toolDivider} />
              <Text style={styles.toolHint}>**bold** *italic* • bullet</Text>
            </View>

            {/* Content */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Content <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                ref={contentInputRef}
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Write your announcement here..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  categoryScroll: {
    maxHeight: 60,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  categoryChipIcon: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  priorityButton: {
    flex: 1,
    minWidth: "30%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  priorityButtonText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  toolButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  toolButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  italic: {
    fontStyle: "italic",
  },
  toolDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  toolHint: {
    fontSize: 11,
    color: "#9CA3AF",
    flex: 1,
  },
  contentInput: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    minHeight: 200,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },
});
