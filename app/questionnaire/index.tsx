/**
 * ========================================
 * QUESTIONNAIRE - MAIN SCREEN
 * ========================================
 *
 * Main route for the Questionnaire application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function QuestionnaireScreen() {
  return (
    <View style={styles.container}>{/* Questionnaire UI will go here */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
