/**
 * ========================================
 * DOCUMENT LIST COMPONENT
 * ========================================
 *
 * Displays list of circulation reports/documents
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function DocumentList() {
  return (
    <View style={styles.container}>{/* Document list will go here */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
