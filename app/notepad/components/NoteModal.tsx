/**
 * ========================================
 * NOTE MODAL COMPONENT
 * ========================================
 *
 * Modal for creating/editing notes
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
import { Note, NOTE_CATEGORIES } from "../types";

interface NoteModalProps {
  visible: boolean;
  note: Note | null; // null = create new, Note = edit existing
  onClose: () => void;
  onSave: (data: {
    title: string;
    content: string;
    category: string;
    color?: string;
  }) => void;
}

const NOTE_COLORS = [
  { color: "#FFFFFF", name: "White" },
  { color: "#DBEAFE", name: "Blue" },
  { color: "#FEF3C7", name: "Yellow" },
  { color: "#D1FAE5", name: "Green" },
  { color: "#FEE2E2", name: "Red" },
  { color: "#F3E8FF", name: "Purple" },
];

export default function NoteModal({
  visible,
  note,
  onClose,
  onSave,
}: NoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [showError, setShowError] = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // '', 'Saving...', 'Saved'
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (note) {
      // Editing existing note
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category || "Personal");
      setSelectedColor(note.color || "#FFFFFF");
    } else {
      // Creating new note
      setTitle("");
      setContent("");
      setCategory("Personal");
      setSelectedColor("#FFFFFF");
    }
    setSaveStatus("");
  }, [note, visible]);

  // Autosave effect
  useEffect(() => {
    if (!note || !title.trim() || !visible) return; // Only autosave when editing existing note

    setSaveStatus("Saving...");

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      onSave({
        title: title.trim() || "Untitled Note",
        content: content.trim(),
        category,
        color: selectedColor,
      });
      setSaveStatus("Saved");
      setTimeout(() => setSaveStatus(""), 2000);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content, category, selectedColor]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Clear autosave timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    onSave({
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      category,
      color: selectedColor,
    });

    handleClose();
  };

  // Insert markdown syntax at cursor
  const insertFormatting = (before: string, after: string = "") => {
    if (contentInputRef.current) {
      const currentContent = content;
      const newContent = currentContent + before + after;
      setContent(newContent);
      // Focus back on input
      contentInputRef.current.focus();
    }
  };

  const handleClose = () => {
    // Clear autosave timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setTitle("");
    setContent("");
    setCategory("Personal");
    setSelectedColor("#FFFFFF");
    setShowError(false);
    setSaveStatus("");
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>
              {note ? "Edit Note" : "New Note"}
            </Text>
            {saveStatus && <Text style={styles.saveStatus}>{saveStatus}</Text>}
          </View>
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
              <Text style={styles.saveButtonText}>
                {note ? "Done" : "Save"}
              </Text>
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
            {/* Error Message */}
            {showError && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
                <Text style={styles.errorText}>
                  Please add a title or content
                </Text>
              </View>
            )}

            {/* Category Selector */}
            <View style={styles.categoryRow}>
              {NOTE_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  onPress={() => setCategory(cat.value)}
                  style={[
                    styles.categoryChip,
                    category === cat.value && {
                      backgroundColor: cat.color + "20",
                      borderColor: cat.color,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={category === cat.value ? cat.color : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat.value && {
                        color: cat.color,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {cat.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Title Input */}
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Note title..."
              placeholderTextColor="#9CA3AF"
              autoFocus={!note}
            />

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
              <Text style={styles.toolHint}>
                Tip: **bold** *italic* • bullet
              </Text>
            </View>

            {/* Content Input */}
            <TextInput
              ref={contentInputRef}
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Start typing...\n\nUse **text** for bold, *text* for italic, • for bullets"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />

            {/* Color Picker */}
            <View style={styles.colorSection}>
              <Text style={styles.colorLabel}>Note Color</Text>
              <View style={styles.colorPicker}>
                {NOTE_COLORS.map((item) => (
                  <TouchableOpacity
                    key={item.color}
                    onPress={() => setSelectedColor(item.color)}
                    style={[
                      styles.colorOption,
                      { backgroundColor: item.color },
                      selectedColor === item.color &&
                        styles.colorOptionSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    {selectedColor === item.color && (
                      <Ionicons name="checkmark" size={20} color="#1E3A8A" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  saveStatus: {
    fontSize: 13,
    color: "#10B981",
    fontStyle: "italic",
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
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  categoryChipText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
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
  titleInput: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    paddingVertical: 8,
  },
  contentInput: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    minHeight: 300,
    paddingVertical: 8,
  },
  colorSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  colorPicker: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  colorOptionSelected: {
    borderColor: "#1E3A8A",
    borderWidth: 3,
  },
});
