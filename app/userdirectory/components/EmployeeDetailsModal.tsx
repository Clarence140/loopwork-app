/**
 * ========================================
 * EMPLOYEE DETAILS MODAL
 * ========================================
 *
 * Full employee profile view
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
import { DEPARTMENT_COLORS, Employee, STATUS_COLORS } from "../types";

interface EmployeeDetailsModalProps {
  visible: boolean;
  employee: Employee | null;
  onClose: () => void;
}

export default function EmployeeDetailsModal({
  visible,
  employee,
  onClose,
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

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

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    if (employee.email) {
      Linking.openURL(`mailto:${employee.email}`);
    }
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
        {/* Header with Employee Name */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={28} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {employee.name}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Compact Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.largeAvatar,
                  { backgroundColor: getDepartmentColor() + "20" },
                ]}
              >
                <Text
                  style={[
                    styles.largeInitials,
                    { color: getDepartmentColor() },
                  ]}
                >
                  {getInitials()}
                </Text>
              </View>
              <View
                style={[
                  styles.largeStatusDot,
                  { backgroundColor: getStatusColor() },
                ]}
              />
            </View>
            <Text style={styles.employeePosition}>{employee.position}</Text>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.departmentBadge,
                  { backgroundColor: getDepartmentColor() + "20" },
                ]}
              >
                <Text
                  style={[
                    styles.departmentBadgeText,
                    { color: getDepartmentColor() },
                  ]}
                >
                  {employee.department}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor() + "20" },
                ]}
              >
                <Text
                  style={[styles.statusBadgeText, { color: getStatusColor() }]}
                >
                  {employee.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Employee Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employee Information</Text>
            {renderField("id-card", "Employee ID", employee.employeeId)}
            {renderField("mail", "Email", employee.email, handleEmail)}
            {renderField(
              "call",
              "Mobile Phone",
              employee.mobilePhone,
              employee.mobilePhone
                ? () => handleCall(employee.mobilePhone!)
                : undefined
            )}
            {renderField(
              "call-outline",
              "Office Phone",
              employee.phone,
              employee.phone ? () => handleCall(employee.phone!) : undefined
            )}
            {renderField("calendar", "Birthday", employee.birthday)}
            {renderField("briefcase", "Hire Date", employee.hireDate)}
          </View>

          {/* Organization */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organization</Text>
            {renderField("business", "Department", employee.department)}
            {renderField("git-branch", "Division", employee.division)}
            {renderField("briefcase-outline", "Position", employee.position)}
          </View>

          {/* Emergency Contact */}
          {(employee.emergencyContact || employee.emergencyPhone) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              {renderField("person", "Contact", employee.emergencyContact)}
              {renderField(
                "call",
                "Phone",
                employee.emergencyPhone,
                employee.emergencyPhone
                  ? () => handleCall(employee.emergencyPhone!)
                  : undefined
              )}
            </View>
          )}

          {/* Address */}
          {employee.address && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address</Text>
              {renderField("location", "Address", employee.address)}
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  largeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  largeInitials: {
    fontSize: 32,
    fontWeight: "700",
  },
  largeStatusDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  employeePosition: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  departmentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  departmentBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
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
