/**
 * ========================================
 * CABINET - MAIN SCREEN
 * ========================================
 *
 * Main route for the Cabinet/File Storage application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function CabinetScreen() {
  return <View style={styles.container}>{/* Cabinet UI will go here */}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
