/**
 * ========================================
 * ADD CONTACT MODAL
 * ========================================
 *
 * Simplified form for adding contacts on mobile
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Contact, CONTACT_CATEGORIES } from "../types";

interface AddContactModalProps {
  visible: boolean;
  contact: Contact | null; // null = add new, Contact = edit
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function AddContactModal({
  visible,
  contact,
  onClose,
  onSave,
}: AddContactModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<"Personal" | "Public" | "Company">(
    "Personal"
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (contact) {
      // Editing
      setName(contact.name);
      setCompany(contact.company || "");
      setJobTitle(contact.jobTitle || "");
      setDepartment(contact.department || "");
      setMobilePhone(contact.mobilePhone || "");
      setTelephone(contact.telephone || "");
      setEmail(contact.email || "");
      setCategory(contact.category);
    } else {
      // New contact
      resetForm();
    }
  }, [contact, visible]);

  const resetForm = () => {
    setName("");
    setCompany("");
    setJobTitle("");
    setDepartment("");
    setMobilePhone("");
    setTelephone("");
    setEmail("");
    setCategory("Personal");
    setShowError(false);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const contactData = {
      name: name.trim(),
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      department: department.trim(),
      mobilePhone: mobilePhone.trim(),
      telephone: telephone.trim(),
      email: email.trim(),
      category,
      isPublic: category === "Public" || category === "Company",
    };

    onSave(contactData);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {contact ? "Edit Contact" : "New Contact"}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.headerButton}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.saveButton}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Error */}
            {showError && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
                <Text style={styles.errorText}>Name is required</Text>
              </View>
            )}

            {/* Category */}
            <View style={styles.categoryRow}>
              {CONTACT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  onPress={() => setCategory(cat.value)}
                  style={[
                    styles.categoryChip,
                    category === cat.value && {
                      backgroundColor: cat.color + "20",
                      borderColor: cat.color,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={category === cat.value ? cat.color : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat.value && {
                        color: cat.color,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {cat.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor="#9CA3AF"
                autoFocus={!contact}
              />
            </View>

            {/* Company */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Company</Text>
              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholder="Company name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Job Title */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.input}
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="Position or title"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Department */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Department</Text>
              <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
                placeholder="Department"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Mobile Phone */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Phone</Text>
              <TextInput
                style={styles.input}
                value={mobilePhone}
                onChangeText={setMobilePhone}
                placeholder="+1-555-0123"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            {/* Telephone */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Telephone</Text>
              <TextInput
                style={styles.input}
                value={telephone}
                onChangeText={setTelephone}
                placeholder="+1-555-0123"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
    flex: 1,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  categoryChipText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 6,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    minHeight: 46,
  },
  bottomSpacer: {
    height: 40,
  },
});
