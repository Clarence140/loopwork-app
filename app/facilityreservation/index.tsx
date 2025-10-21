/**
 * ========================================
 * FACILITY - MAIN SCREEN
 * ========================================
 *
 * Main route for the Facility application
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FacilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facility</Text>
      {/* Facility UI will go here */}
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
