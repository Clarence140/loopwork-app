/**
 * ========================================
 * ADDRESS BOOK - MAIN SCREEN
 * ========================================
 *
 * Main route for the Address Book application
 */

import React from "react";
import { StyleSheet, View } from "react-native";

export default function AddressBookScreen() {
  return (
    <View style={styles.container}>{/* Address Book UI will go here */}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
