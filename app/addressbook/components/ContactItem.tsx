/**
 * ========================================
 * CONTACT ITEM COMPONENT
 * ========================================
 *
 * Contact card in the list
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Contact, CONTACT_CATEGORIES } from "../types";

interface ContactItemProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
}

export default function ContactItem({ contact, onPress }: ContactItemProps) {
  const getCategoryInfo = () => {
    return (
      CONTACT_CATEGORIES.find((c) => c.value === contact.category) ||
      CONTACT_CATEGORIES[0]
    );
  };

  const categoryInfo = getCategoryInfo();

  const handleCall = (e: any) => {
    e.stopPropagation();
    const phone = contact.mobilePhone || contact.telephone;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmail = (e: any) => {
    e.stopPropagation();
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(contact)}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <View
        style={[styles.avatar, { backgroundColor: categoryInfo.color + "20" }]}
      >
        <Text style={[styles.initials, { color: categoryInfo.color }]}>
          {getInitials()}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {contact.name}
          </Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryInfo.color + "20" },
            ]}
          >
            <Ionicons
              name={categoryInfo.icon as any}
              size={10}
              color={categoryInfo.color}
            />
            <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
              {contact.category}
            </Text>
          </View>
        </View>

        {contact.company && (
          <View style={styles.metaRow}>
            <Ionicons name="business-outline" size={12} color="#6B7280" />
            <Text style={styles.metaText} numberOfLines={1}>
              {contact.company}
            </Text>
          </View>
        )}

        {contact.jobTitle && (
          <View style={styles.metaRow}>
            <Ionicons name="briefcase-outline" size={12} color="#6B7280" />
            <Text style={styles.metaText} numberOfLines={1}>
              {contact.jobTitle}
            </Text>
          </View>
        )}

        {(contact.mobilePhone || contact.telephone) && (
          <View style={styles.metaRow}>
            <Ionicons name="call-outline" size={12} color="#6B7280" />
            <Text style={styles.metaText} numberOfLines={1}>
              {contact.mobilePhone || contact.telephone}
            </Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.actions}>
        {(contact.mobilePhone || contact.telephone) && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call" size={18} color="#10B981" />
          </TouchableOpacity>
        )}
        {contact.email && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEmail}
            activeOpacity={0.7}
          >
            <Ionicons name="mail" size={18} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
    flex: 1,
  },
  actions: {
    flexDirection: "column",
    gap: 6,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
});
