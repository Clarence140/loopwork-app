/**
 * ========================================
 * USER - MAIN SCREEN
 * ========================================
 *
 * Main route for the User application
 */

import AppHeader from "@/components/app-header";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="User Directory" subtitle="Browse employees" />
      <View style={styles.content}>
        <Text style={styles.placeholder}>User Directory UI coming soon...</Text>
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
