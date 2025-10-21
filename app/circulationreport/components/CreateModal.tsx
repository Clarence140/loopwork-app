/**
 * ========================================
 * CREATE MODAL COMPONENT
 * ========================================
 *
 * Modal for creating new circulation reports
 */

import React from "react";
import { Modal, StyleSheet, View } from "react-native";

interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateModal({ visible, onClose }: CreateModalProps) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>{/* Create form will go here */}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
