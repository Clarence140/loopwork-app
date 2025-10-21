/**
 * ========================================
 * NOTEPAD - MAIN SCREEN
 * ========================================
 *
 * Personal notes for each employee
 */

import AppHeader from "@/components/app-header";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NoteItem from "./components/NoteItem";
import NoteModal from "./components/NoteModal";
import { mockNotes } from "./mockData";
import { Note, NOTE_CATEGORIES } from "./types";

export default function NotepadScreen() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((note) => note.category === categoryFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // Sort: pinned first, then by updatedAt
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes, searchQuery, categoryFilter]);

  // Create new note
  const handleCreateNote = (data: {
    title: string;
    content: string;
    category: string;
    color?: string;
  }) => {
    const newNote: Note = {
      id: `note_${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      color: data.color,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "emp_001",
      companyCode: "DEMO",
      isPinned: false,
    };

    setNotes([newNote, ...notes]);
  };

  // Update existing note
  const handleUpdateNote = (data: {
    title: string;
    content: string;
    category: string;
    color?: string;
  }) => {
    if (!selectedNote) return;

    setNotes(
      notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              ...data,
              updatedAt: new Date(),
            }
          : note
      )
    );
  };

  // Open note for viewing/editing
  const handleOpenNote = (note: Note) => {
    setSelectedNote(note);
    setShowNoteModal(true);
  };

  // Delete note with confirmation
  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      setNotes(notes.filter((note) => note.id !== noteToDelete.id));
    }
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  };

  // Pin/unpin note
  const handlePinNote = (note: Note) => {
    setNotes(
      notes.map((n) => (n.id === note.id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Notepad"
        subtitle={`${filteredNotes.length} note${
          filteredNotes.length !== 1 ? "s" : ""
        }`}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search notes..."
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilterContainer}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <TouchableOpacity
          onPress={() => setCategoryFilter("All")}
          style={[
            styles.filterChip,
            categoryFilter === "All" && styles.filterChipActive,
          ]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              categoryFilter === "All" && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {NOTE_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setCategoryFilter(cat.value)}
            style={[
              styles.filterChip,
              categoryFilter === cat.value && {
                backgroundColor: cat.color + "20",
                borderColor: cat.color,
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={cat.icon as any}
              size={14}
              color={categoryFilter === cat.value ? cat.color : "#6B7280"}
            />
            <Text
              style={[
                styles.filterChipText,
                categoryFilter === cat.value && {
                  color: cat.color,
                  fontWeight: "600",
                },
              ]}
            >
              {cat.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notes List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>
              {searchQuery ? "No notes found" : "No notes yet"}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Try a different search term"
                : "Tap the + button to create your first note"}
            </Text>
          </View>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onPress={handleOpenNote}
              onDelete={handleDeleteNote}
              onPin={handlePinNote}
            />
          ))
        )}
      </ScrollView>

      {/* FAB - Create Note */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedNote(null);
          setShowNoteModal(true);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Note Modal */}
      <NoteModal
        visible={showNoteModal}
        note={selectedNote}
        onClose={() => {
          setShowNoteModal(false);
          setSelectedNote(null);
        }}
        onSave={selectedNote ? handleUpdateNote : handleCreateNote}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.deleteModal}>
            <View style={styles.deleteIconWrapper}>
              <Ionicons name="trash" size={32} color="#EF4444" />
            </View>
            <Text style={styles.deleteTitle}>Delete Note?</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete{"\n"}
              <Text style={styles.deleteNoteTitle}>
                "{noteToDelete?.title}"
              </Text>
              ?
            </Text>
            <Text style={styles.deleteWarning}>
              This action cannot be undone.
            </Text>
            <View style={styles.deleteButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteConfirm(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDelete}
                activeOpacity={0.7}
              >
                <Ionicons name="trash" size={18} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  categoryFilterContainer: {
    maxHeight: 50,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoryFilterContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  filterChipText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
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
    paddingHorizontal: 40,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  deleteModal: {
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
  deleteIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  deleteMessage: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 22,
  },
  deleteNoteTitle: {
    fontWeight: "600",
    color: "#111827",
  },
  deleteWarning: {
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 24,
  },
  deleteButtonRow: {
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
