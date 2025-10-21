/**
 * ========================================
 * CONTACT DETAILS MODAL
 * ========================================
 *
 * Full contact information view
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Contact, CONTACT_CATEGORIES } from "../types";

interface ContactDetailsModalProps {
  visible: boolean;
  contact: Contact | null;
  onClose: () => void;
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
}

export default function ContactDetailsModal({
  visible,
  contact,
  onClose,
  onEdit,
  onDelete,
}: ContactDetailsModalProps) {
  if (!contact) return null;

  const getCategoryInfo = () => {
    return (
      CONTACT_CATEGORIES.find((c) => c.value === contact.category) ||
      CONTACT_CATEGORIES[0]
    );
  };

  const categoryInfo = getCategoryInfo();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    if (contact.email) {
      Linking.openURL(`mailto:${contact.email}`);
    }
  };

  const getInitials = () => {
    const names = contact.name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return contact.name.substring(0, 2).toUpperCase();
  };

  const renderField = (
    icon: string,
    label: string,
    value: string | undefined,
    action?: () => void
  ) => {
    if (!value) return null;

    return (
      <TouchableOpacity
        style={styles.field}
        onPress={action}
        activeOpacity={action ? 0.7 : 1}
        disabled={!action}
      >
        <View style={styles.fieldIcon}>
          <Ionicons name={icon as any} size={18} color="#6B7280" />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <Text style={styles.fieldValue}>{value}</Text>
        </View>
        {action && (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={28} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            {onEdit && (
              <TouchableOpacity
                onPress={() => onEdit(contact)}
                style={styles.headerButton}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={24} color="#1E3A8A" />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                onPress={() => onDelete(contact)}
                style={styles.headerButton}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View
              style={[
                styles.largeAvatar,
                { backgroundColor: categoryInfo.color + "20" },
              ]}
            >
              <Text
                style={[styles.largeInitials, { color: categoryInfo.color }]}
              >
                {getInitials()}
              </Text>
            </View>
            <Text style={styles.contactName}>{contact.name}</Text>
            {contact.jobTitle && (
              <Text style={styles.jobTitle}>{contact.jobTitle}</Text>
            )}
            <View
              style={[
                styles.largeCategoryBadge,
                { backgroundColor: categoryInfo.color + "20" },
              ]}
            >
              <Ionicons
                name={categoryInfo.icon as any}
                size={14}
                color={categoryInfo.color}
              />
              <Text
                style={[
                  styles.categoryBadgeText,
                  { color: categoryInfo.color },
                ]}
              >
                {contact.category}
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            {(contact.mobilePhone || contact.telephone) && (
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() =>
                  handleCall(contact.mobilePhone || contact.telephone || "")
                }
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, styles.callIcon]}>
                  <Ionicons name="call" size={22} color="#10B981" />
                </View>
                <Text style={styles.quickActionLabel}>Call</Text>
              </TouchableOpacity>
            )}
            {contact.email && (
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={handleEmail}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, styles.emailIcon]}>
                  <Ionicons name="mail" size={22} color="#3B82F6" />
                </View>
                <Text style={styles.quickActionLabel}>Email</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            {renderField(
              "call",
              "Mobile Phone",
              contact.mobilePhone,
              contact.mobilePhone
                ? () => handleCall(contact.mobilePhone!)
                : undefined
            )}
            {renderField(
              "call-outline",
              "Telephone",
              contact.telephone,
              contact.telephone
                ? () => handleCall(contact.telephone!)
                : undefined
            )}
            {renderField("mail", "Email", contact.email, handleEmail)}
            {renderField("calendar", "Birthday", contact.birthday)}
          </View>

          {/* Company Information */}
          {(contact.company ||
            contact.jobTitle ||
            contact.department ||
            contact.division) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Company Information</Text>
              {renderField("business", "Company", contact.company)}
              {renderField("briefcase", "Job Title", contact.jobTitle)}
              {renderField("people", "Department", contact.department)}
              {renderField("git-branch", "Division", contact.division)}
              {renderField("location", "Workplace", contact.workplace)}
              {renderField("call", "Workplace Phone", contact.workplacePhone)}
            </View>
          )}

          {/* Address */}
          {(contact.street ||
            contact.city ||
            contact.stateProvince ||
            contact.postalCode) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address</Text>
              {renderField("location", "Street", contact.street)}
              {renderField("location-outline", "City", contact.city)}
              {renderField("map", "State/Province", contact.stateProvince)}
              {renderField("mail-outline", "Postal Code", contact.postalCode)}
              {renderField("globe", "Country/Region", contact.countryRegion)}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  largeAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  largeInitials: {
    fontSize: 36,
    fontWeight: "700",
  },
  contactName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 12,
  },
  largeCategoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  quickActionButton: {
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  callIcon: {
    backgroundColor: "#D1FAE5",
  },
  emailIcon: {
    backgroundColor: "#DBEAFE",
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 16,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
});
