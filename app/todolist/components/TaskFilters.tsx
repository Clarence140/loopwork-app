/**
 * ========================================
 * TASK FILTERS COMPONENT
 * ========================================
 *
 * Filter and sort controls for tasks
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: "All" | "Active" | "Completed";
  onFilterStatusChange: (status: "All" | "Active" | "Completed") => void;
}

export default function TaskFilters({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
}: TaskFiltersProps) {
  const statusOptions: Array<"All" | "Active" | "Completed"> = [
    "All",
    "Active",
    "Completed",
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search tasks..."
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <Ionicons name="close-circle" size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Status Filter Pills */}
      <View style={styles.filterRow}>
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => onFilterStatusChange(status)}
            style={[
              styles.filterPill,
              filterStatus === status && styles.filterPillActive,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterPillText,
                filterStatus === status && styles.filterPillTextActive,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    gap: 8,
    minHeight: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    minHeight: 38,
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
  },
});
