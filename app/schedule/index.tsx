/**
 * ========================================
 * SCHEDULE - MAIN SCREEN
 * ========================================
 *
 * Main route for the Schedule/Calendar application
 */

import AppHeader from "@/components/app-header";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Schedule" subtitle="Manage your calendar" />
      <View style={styles.content}>
        <Text style={styles.placeholder}>Schedule UI coming soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    fontSize: 16,
    color: "#9CA3AF",
  },
});
