/**
 * ========================================
 * USER - MAIN SCREEN
 * ========================================
 *
 * Main route for the User application
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User</Text>
      {/* User UI will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
