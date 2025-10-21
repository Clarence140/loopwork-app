/**
 * ========================================
 * TASK FILTERS COMPONENT
 * ========================================
 *
 * Filter and sort controls for tasks
 */

import React from "react";
import { StyleSheet, View } from "react-native";

interface TaskFiltersProps {
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function TaskFilters({
  onFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  return <View style={styles.container}>{/* Filters UI will go here */}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
