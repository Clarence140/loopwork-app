/**
 * ========================================
 * POST ITEM COMPONENT
 * ========================================
 *
 * Announcement/bulletin card
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InformationPost, PRIORITY_OPTIONS } from "../types";

interface PostItemProps {
  post: InformationPost;
  onPress: (post: InformationPost) => void;
  currentUserId: string;
}

export default function PostItem({
  post,
  onPress,
  currentUserId,
}: PostItemProps) {
  const getPriorityColor = () => {
    const priority = PRIORITY_OPTIONS.find((p) => p.value === post.priority);
    return priority ? priority.color : "#6B7280";
  };

  const isUnread = !post.readBy?.includes(currentUserId);

  const formatDate = (date: Date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return postDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getPreview = () => {
    const cleanContent = post.content
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^[•\-]\s/gm, "");
    const preview = cleanContent.trim().split("\n")[0];
    return preview.length > 80 ? preview.substring(0, 80) + "..." : preview;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={() => onPress(post)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.categoryIcon}>{post.categoryIcon || "📄"}</Text>
          <View style={styles.headerText}>
            <Text style={styles.category}>{post.category}</Text>
            <Text style={styles.author}>by {post.createdByName}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {isUnread && <View style={styles.unreadDot} />}
          <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>

      {/* Title */}
      <Text
        style={[styles.title, isUnread && styles.titleUnread]}
        numberOfLines={2}
      >
        {post.title}
      </Text>

      {/* Preview */}
      <Text style={styles.preview} numberOfLines={2}>
        {getPreview()}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor() + "20" },
          ]}
        >
          <Text style={[styles.priorityText, { color: getPriorityColor() }]}>
            {post.priority}
          </Text>
        </View>
        {post.attachments && post.attachments.length > 0 && (
          <View style={styles.attachmentIndicator}>
            <Ionicons name="attach" size={14} color="#6B7280" />
            <Text style={styles.attachmentText}>{post.attachments.length}</Text>
          </View>
        )}
        {post.readBy && post.readBy.length > 0 && (
          <View style={styles.readIndicator}>
            <Ionicons name="eye" size={14} color="#6B7280" />
            <Text style={styles.readText}>{post.readBy.length}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  category: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    textTransform: "capitalize",
  },
  author: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  date: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
    lineHeight: 22,
  },
  titleUnread: {
    fontWeight: "700",
  },
  preview: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  attachmentIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  attachmentText: {
    fontSize: 11,
    color: "#6B7280",
  },
  readIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readText: {
    fontSize: 11,
    color: "#6B7280",
  },
});
