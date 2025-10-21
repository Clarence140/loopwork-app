/**
 * ========================================
 * DISCUSSION - MAIN SCREEN
 * ========================================
 *
 * Main route for the Discussion/Forum application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function DiscussionScreen() {
  return (
    <View style={styles.container}>{/* Discussion UI will go here */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
