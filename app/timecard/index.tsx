/**
 * ========================================
 * TIMECARD - MAIN SCREEN
 * ========================================
 *
 * Main route for the Timecard/Time Tracking application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function TimecardScreen() {
  return <View style={styles.container}>{/* Timecard UI will go here */}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
