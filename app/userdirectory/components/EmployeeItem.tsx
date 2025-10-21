/**
 * ========================================
 * EMPLOYEE ITEM COMPONENT
 * ========================================
 *
 * Employee card in the directory list
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
import { DEPARTMENT_COLORS, Employee, STATUS_COLORS } from "../types";

interface EmployeeItemProps {
  employee: Employee;
  onPress: (employee: Employee) => void;
}

export default function EmployeeItem({ employee, onPress }: EmployeeItemProps) {
  const getDepartmentColor = () => {
    return DEPARTMENT_COLORS[employee.department] || "#64748B";
  };

  const getStatusColor = () => {
    return STATUS_COLORS[employee.status] || "#6B7280";
  };

  const getInitials = () => {
    const names = employee.name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return employee.name.substring(0, 2).toUpperCase();
  };

  const handleCall = (e: any) => {
    e.stopPropagation();
    const phone = employee.mobilePhone || employee.phone;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmail = (e: any) => {
    e.stopPropagation();
    if (employee.email) {
      Linking.openURL(`mailto:${employee.email}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(employee)}
      activeOpacity={0.7}
    >
      {/* Avatar with status indicator */}
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: getDepartmentColor() + "20" },
          ]}
        >
          <Text style={[styles.initials, { color: getDepartmentColor() }]}>
            {getInitials()}
          </Text>
        </View>
        <View
          style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {employee.name}
        </Text>
        <Text style={styles.position} numberOfLines={1}>
          {employee.position}
        </Text>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.departmentBadge,
              { backgroundColor: getDepartmentColor() + "20" },
            ]}
          >
            <Text
              style={[styles.departmentText, { color: getDepartmentColor() }]}
            >
              {employee.department}
            </Text>
          </View>
          {/* Quick contact info */}
          {(employee.mobilePhone || employee.phone) && (
            <View style={styles.contactInfo}>
              <Ionicons name="call-outline" size={11} color="#9CA3AF" />
              <Text style={styles.contactText} numberOfLines={1}>
                {employee.mobilePhone || employee.phone}
              </Text>
            </View>
          )}
        </View>
        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          {employee.email && (
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <Ionicons name="mail-outline" size={14} color="#3B82F6" />
              <Text style={styles.quickActionText}>Email</Text>
            </TouchableOpacity>
          )}
          {(employee.mobilePhone || employee.phone) && (
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <Ionicons name="call-outline" size={14} color="#10B981" />
              <Text style={styles.quickActionText}>Call</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chevron Indicator */}
      <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
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
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 18,
    fontWeight: "700",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  position: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  departmentBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  departmentText: {
    fontSize: 11,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  contactText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  quickActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
});
