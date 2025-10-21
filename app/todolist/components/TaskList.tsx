/**
 * ========================================
 * TASK LIST COMPONENT
 * ========================================
 *
 * Displays the list of tasks with grouping
 * (Overdue, Today, Tomorrow, Future, Completed)
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TaskListProps {
  tasks: any[];
  onTaskPress?: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskPress }: TaskListProps) {
  return (
    <View style={styles.container}>
      <Text>Task List Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
