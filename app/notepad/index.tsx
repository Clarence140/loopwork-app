/**
 * ========================================
 * NOTEPAD - MAIN SCREEN
 * ========================================
 *
 * Main route for the Notepad application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function NotepadScreen() {
  return <View style={styles.container}>{/* Notepad UI will go here */}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
