/**
 * ========================================
 * APP HEADER COMPONENT
 * ========================================
 *
 * Reusable header for all application screens
 * Consistent design across the app
 */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock user - will be replaced with actual auth later
  const user = {
    name: "John Doe",
    position: "Manager",
    department: "Operations",
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    router.replace("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.headerRow}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {/* Avatar with Dropdown */}
          <TouchableOpacity
            onPress={() => setShowUserMenu(!showUserMenu)}
            style={styles.avatarButton}
            activeOpacity={0.7}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <Ionicons
              name={showUserMenu ? "chevron-up" : "chevron-down"}
              size={16}
              color="white"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <View style={styles.dropdown}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.userInfoRow}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarLargeText}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userPosition}>{user.position}</Text>
              </View>
            </View>
            <Text style={styles.userDepartment}>{user.department}</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                setShowUserMenu(false);
                // Navigate to profile
              }}
            >
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                setShowUserMenu(false);
                // Navigate to settings
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.menuItemTextDanger}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Backdrop to close menu */}
      {showUserMenu && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
  },
  avatarButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  avatar: {
    width: 28,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3B82F6",
  },
  dropdown: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 50,
    width: 224,
  },
  userInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarLarge: {
    width: 48,
    height: 48,
    backgroundColor: "#DBEAFE",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarLargeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  userPosition: {
    fontSize: 12,
    color: "#6B7280",
  },
  userDepartment: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  menuItems: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  menuItemTextDanger: {
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
    marginVertical: 4,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
  },
});
