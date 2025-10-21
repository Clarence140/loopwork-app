/**
 * ========================================
 * POST DETAILS MODAL
 * ========================================
 *
 * Full view of announcement/bulletin
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { renderMarkdown } from "../../notepad/utils/markdownRenderer";
import { InformationPost, PRIORITY_OPTIONS } from "../types";

interface PostDetailsModalProps {
  visible: boolean;
  post: InformationPost | null;
  onClose: () => void;
  onMarkAsRead?: (postId: string) => void;
  onDelete?: (post: InformationPost) => void;
  currentUserId: string;
}

export default function PostDetailsModal({
  visible,
  post,
  onClose,
  onMarkAsRead,
  onDelete,
  currentUserId,
}: PostDetailsModalProps) {
  if (!post) return null;

  const getPriorityColor = () => {
    const priority = PRIORITY_OPTIONS.find((p) => p.value === post.priority);
    return priority ? priority.color : "#6B7280";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleClose = () => {
    // Mark as read when closing
    if (onMarkAsRead && !post.readBy?.includes(currentUserId)) {
      onMarkAsRead(post.id);
    }
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
          <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
            <Ionicons name="close" size={28} color="#6B7280" />
          </TouchableOpacity>
          {onDelete && post.createdBy === currentUserId && (
            <TouchableOpacity
              onPress={() => onDelete(post)}
              style={styles.deleteButton}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Category & Priority */}
          <View style={styles.metaSection}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryIcon}>
                {post.categoryIcon || "📄"}
              </Text>
              <Text style={styles.categoryName}>{post.category}</Text>
            </View>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor() + "20" },
              ]}
            >
              <Text
                style={[styles.priorityText, { color: getPriorityColor() }]}
              >
                {post.priority}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{post.title}</Text>

          {/* Author & Date */}
          <View style={styles.authorSection}>
            <View style={styles.authorAvatar}>
              <Ionicons name="person" size={16} color="#6B7280" />
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{post.createdByName}</Text>
              <Text style={styles.postDate}>{formatDate(post.createdAt)}</Text>
            </View>
          </View>

          {/* Posting Period */}
          {post.startDate && post.endDate && (
            <View style={styles.periodSection}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.periodText}>
                Active: {new Date(post.startDate).toLocaleDateString()} -{" "}
                {new Date(post.endDate).toLocaleDateString()}
              </Text>
            </View>
          )}

          {/* Content */}
          <View style={styles.contentSection}>
            {renderMarkdown(post.content)}
          </View>

          {/* Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <View style={styles.attachmentsSection}>
              <Text style={styles.attachmentsTitle}>Attachments</Text>
              {post.attachments.map((attachment) => (
                <View key={attachment.id} style={styles.attachmentItem}>
                  <Ionicons name="document-attach" size={20} color="#3B82F6" />
                  <Text style={styles.attachmentName}>{attachment.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Read Status */}
          {post.readBy && post.readBy.length > 0 && (
            <View style={styles.readSection}>
              <Ionicons name="eye-outline" size={16} color="#6B7280" />
              <Text style={styles.readText}>
                {post.readBy.length}{" "}
                {post.readBy.length === 1 ? "person" : "people"} read this
              </Text>
            </View>
          )}
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
  deleteButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  metaSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    textTransform: "capitalize",
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 32,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  postDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  periodSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FEF3C7",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  periodText: {
    fontSize: 13,
    color: "#92400E",
  },
  contentSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  attachmentsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  attachmentsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  attachmentName: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  readSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  readText: {
    fontSize: 13,
    color: "#6B7280",
  },
});
