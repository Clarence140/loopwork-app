/**
 * ========================================
 * INFORMATION - MAIN SCREEN
 * ========================================
 *
 * Company bulletin board / announcements
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
import CreatePostModal from "./components/CreatePostModal";
import PostDetailsModal from "./components/PostDetailsModal";
import PostItem from "./components/PostItem";
import { mockPosts } from "./mockData";
import { Category, DEFAULT_CATEGORIES, InformationPost } from "./types";

export default function InformationScreen() {
  const [posts, setPosts] = useState<InformationPost[]>(mockPosts);
  const [categories] = useState<Category[]>([
    { id: "all", name: "All", icon: "📋", count: 0 },
    ...DEFAULT_CATEGORIES,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<InformationPost | null>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<InformationPost | null>(
    null
  );

  const currentUserId = "emp_001"; // Mock current user

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Unread filter (if active)
    if (showUnreadOnly) {
      filtered = filtered.filter(
        (post) => !post.readBy?.includes(currentUserId)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.createdByName.toLowerCase().includes(query)
      );
    }

    // Sort by created date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts, categoryFilter, showUnreadOnly, searchQuery, currentUserId]);

  // Count unread
  const unreadCount = posts.filter(
    (post) => !post.readBy?.includes(currentUserId)
  ).length;

  // Create new post
  const handleCreatePost = (data: any) => {
    const newPost: InformationPost = {
      id: `post_${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      categoryIcon: data.categoryIcon,
      priority: data.priority,
      createdBy: currentUserId,
      createdByName: "You",
      isAccessibleToAll: data.isAccessibleToAll,
      readBy: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      companyCode: "DEMO",
    };

    setPosts([newPost, ...posts]);
  };

  // View post
  const handleViewPost = (post: InformationPost) => {
    setSelectedPost(post);
    setShowDetailsModal(true);
  };

  // Mark as read
  const handleMarkAsRead = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              readBy: [...(post.readBy || []), currentUserId],
            }
          : post
      )
    );
  };

  // Delete post
  const handleDeletePost = (post: InformationPost) => {
    setShowDetailsModal(false);
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter((p) => p.id !== postToDelete.id));
    }
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Information"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
            : `${filteredPosts.length} post${
                filteredPosts.length !== 1 ? "s" : ""
              }`
        }
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search announcements..."
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Combined Filter Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterRowContent}
      >
        {/* Unread Filter (Only shows if there are unread posts) */}
        {unreadCount > 0 && (
          <>
            <TouchableOpacity
              onPress={() => setShowUnreadOnly(!showUnreadOnly)}
              style={[
                styles.filterChip,
                showUnreadOnly && styles.filterChipActive,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="mail-unread"
                size={16}
                color={showUnreadOnly ? "#FFFFFF" : "#EF4444"}
              />
              <Text
                style={[
                  styles.filterChipText,
                  showUnreadOnly && styles.filterChipTextActive,
                ]}
              >
                Unread
              </Text>
              <View
                style={[
                  styles.filterBadge,
                  showUnreadOnly && styles.filterBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterBadgeText,
                    showUnreadOnly && styles.filterBadgeTextActive,
                  ]}
                >
                  {unreadCount}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.filterDivider} />
          </>
        )}

        {/* Category Filters */}
        {categories
          .filter((cat) => cat.id !== "all")
          .map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() =>
                setCategoryFilter(categoryFilter === cat.id ? "all" : cat.id)
              }
              style={[
                styles.categoryChip,
                categoryFilter === cat.id && styles.categoryChipActive,
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  categoryFilter === cat.id && styles.categoryTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Posts Feed */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredPosts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="megaphone-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>
              {searchQuery
                ? "No posts found"
                : showUnreadOnly
                ? "No unread posts"
                : "No announcements"}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Try a different search term"
                : showUnreadOnly
                ? "You're all caught up!"
                : "New announcements will appear here"}
            </Text>
          </View>
        ) : (
          filteredPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onPress={handleViewPost}
              currentUserId={currentUserId}
            />
          ))
        )}
      </ScrollView>

      {/* FAB - Create Post */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Create Post Modal */}
      <CreatePostModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreatePost}
        categories={categories}
      />

      {/* Post Details Modal */}
      <PostDetailsModal
        visible={showDetailsModal}
        post={selectedPost}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedPost(null);
        }}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeletePost}
        currentUserId={currentUserId}
      />

      {/* Delete Confirmation */}
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
            <Text style={styles.deleteTitle}>Delete Post?</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete{"\n"}
              <Text style={styles.deletePostTitle}>
                "{postToDelete?.title}"
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
    marginTop: 12,
    marginBottom: 8,
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
  filterRow: {
    maxHeight: 50,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterRowContent: {
    gap: 10,
    paddingRight: 16,
    alignItems: "center",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#EF4444",
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  filterChipText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  filterBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  filterBadgeActive: {
    backgroundColor: "#DC2626",
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EF4444",
  },
  filterBadgeTextActive: {
    color: "#FFFFFF",
  },
  filterDivider: {
    width: 2,
    height: 28,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  categoryChipActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
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
  deletePostTitle: {
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
