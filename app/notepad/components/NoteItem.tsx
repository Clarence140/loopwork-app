/**
 * ========================================
 * NOTE ITEM COMPONENT
 * ========================================
 *
 * Swipeable note card with preview
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
import { Note, NOTE_CATEGORIES } from "../types";

interface NoteItemProps {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (note: Note) => void;
  onPin?: (note: Note) => void;
}

export default function NoteItem({
  note,
  onPress,
  onDelete,
  onPin,
}: NoteItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwipedOpen, setIsSwipedOpen] = useState(false);

  const SWIPE_THRESHOLD = -80;
  const ACTION_WIDTH = 75;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        );
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(Math.max(gestureState.dx, -ACTION_WIDTH));
        } else if (isSwipedOpen) {
          translateX.setValue(
            Math.max(gestureState.dx - ACTION_WIDTH, -ACTION_WIDTH)
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: -ACTION_WIDTH,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
          setIsSwipedOpen(true);
        } else {
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

  const formatDate = (date: Date) => {
    const now = new Date();
    const noteDate = new Date(date);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const noteDay = new Date(
      noteDate.getFullYear(),
      noteDate.getMonth(),
      noteDate.getDate()
    );

    if (noteDay.getTime() === today.getTime()) {
      return noteDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } else if (noteDay.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return noteDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getPreview = () => {
    // Remove markdown syntax for preview
    const cleanContent = note.content
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/^[•\-]\s/gm, ""); // Remove bullets
    const preview = cleanContent.trim().split("\n")[0];
    return preview.length > 60 ? preview.substring(0, 60) + "..." : preview;
  };

  const getCategoryColor = () => {
    const cat = NOTE_CATEGORIES.find((c) => c.value === note.category);
    return cat ? cat.color : "#6B7280";
  };

  return (
    <View style={styles.container}>
      {/* Hidden Delete Button */}
      <View style={styles.hiddenActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            closeSwipe();
            onDelete(note);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Main Note Card (Swipeable) */}
      <Animated.View
        style={[styles.swipeableContainer, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={[
            styles.noteCard,
            note.color && { backgroundColor: note.color },
          ]}
          onPress={() => {
            if (isSwipedOpen) {
              closeSwipe();
            } else {
              onPress(note);
            }
          }}
          activeOpacity={0.7}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              {note.isPinned && (
                <Ionicons name="pin" size={16} color="#EF4444" />
              )}
              <Text style={styles.title} numberOfLines={1}>
                {note.title}
              </Text>
            </View>
            <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
          </View>

          {/* Preview */}
          <Text style={styles.preview} numberOfLines={2}>
            {getPreview()}
          </Text>

          {/* Category Badge */}
          <View style={styles.footer}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: getCategoryColor() + "20" },
              ]}
            >
              <Text
                style={[styles.categoryText, { color: getCategoryColor() }]}
              >
                {note.category}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    overflow: "hidden",
    borderRadius: 12,
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
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: "#6B7280",
  },
  preview: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
