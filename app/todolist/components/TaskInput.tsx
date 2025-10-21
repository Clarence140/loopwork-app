/**
 * ========================================
 * TASK INPUT COMPONENT
 * ========================================
 *
 * Form component for creating new tasks
 */

import React from "react";
import { StyleSheet, View } from "react-native";

interface TaskInputProps {
  onSubmit?: (taskData: any) => void;
}

export default function TaskInput({ onSubmit }: TaskInputProps) {
  return (
    <View style={styles.container}>{/* Task input form will go here */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
