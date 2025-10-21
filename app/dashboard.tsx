import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");
// 4 apps per row calculation:
// Horizontal padding: 24px (left) + 24px (right) = 48px
// Gap between 4 cards: 3 gaps × 12px = 36px (gap-3 in Tailwind)
// Card width: (width - 48 - 36) / 4
const cardWidth = (width - 84) / 4;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// App categories for better organization
const categories = [
  {
    name: "Work Management",
    icon: "briefcase-outline",
    apps: ["Schedule", "TodoList", "Project Management", "Timecard"],
  },
  {
    name: "Communication",
    icon: "chatbubbles-outline",
    apps: ["Discussion", "Minutes", "Circulation Report"],
  },
  {
    name: "People",
    icon: "people-outline",
    apps: ["User Directory", "Address Book", "Visitor Management"],
  },
  {
    name: "Documents & Files",
    icon: "folder-outline",
    apps: ["Document Management", "Cabinet", "Notepad", "Information"],
  },
  {
    name: "Operations",
    icon: "settings-outline",
    apps: ["Facility Reservation", "Inventory Management", "Questionnaire"],
  },
];

// App modules matching the web version (17 applications)
// Each app now has a UNIQUE color for easy identification
const modules = [
  {
    id: 1,
    name: "Schedule",
    icon: "calendar-outline",
    color: "#3B82F6", // Blue
    route: "/schedule",
  },
  {
    id: 2,
    name: "Timecard",
    icon: "stopwatch-outline",
    color: "#8B5CF6", // Purple
    route: "/timecard",
  },
  {
    id: 3,
    name: "TodoList",
    icon: "checkbox-outline",
    color: "#10B981", // Green
    route: "/todolist",
  },
  {
    id: 4,
    name: "User Directory",
    icon: "person-outline",
    color: "#F59E0B", // Amber
    route: "/userdirectory",
  },
  {
    id: 5,
    name: "Discussion",
    icon: "chatbubbles-outline",
    color: "#EF4444", // Red
    route: "/discussion",
  },
  {
    id: 6,
    name: "Minutes",
    icon: "time-outline",
    color: "#06B6D4", // Cyan
    route: "/minutes",
  },
  {
    id: 7,
    name: "Document Management",
    icon: "document-text-outline",
    color: "#6366F1", // Indigo
    route: "/documentmanagement",
  },
  {
    id: 8,
    name: "Address Book",
    icon: "people-outline",
    color: "#EC4899", // Pink
    route: "/addressbook",
  },
  {
    id: 9,
    name: "Facility Reservation",
    icon: "business-outline",
    color: "#14B8A6", // Teal
    route: "/facilityreservation",
  },
  {
    id: 10,
    name: "Visitor Management",
    icon: "walk-outline",
    color: "#F97316", // Orange
    route: "/visitormanagement",
  },
  {
    id: 11,
    name: "Information",
    icon: "information-circle-outline",
    color: "#0EA5E9", // Sky Blue
    route: "/information",
  },
  {
    id: 12,
    name: "Cabinet",
    icon: "folder-outline",
    color: "#84CC16", // Lime
    route: "/cabinet",
  },
  {
    id: 13,
    name: "Circulation Report",
    icon: "paper-plane-outline",
    color: "#A855F7", // Purple Vivid
    route: "/circulationreport",
  },
  {
    id: 14,
    name: "Questionnaire",
    icon: "help-circle-outline",
    color: "#22D3EE", // Cyan Bright
    route: "/questionnaire",
  },
  {
    id: 15,
    name: "Notepad",
    icon: "create-outline",
    color: "#FBBF24", // Yellow
    route: "/notepad",
  },
  {
    id: 16,
    name: "Project Management",
    icon: "briefcase-outline",
    color: "#059669", // Emerald (darker)
    route: "/projectmanagement",
  },
  {
    id: 17,
    name: "Inventory Management",
    icon: "cube-outline",
    color: "#7C3AED", // Violet
    route: "/inventorymanagement",
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [user] = useState({
    name: "John Doe",
    position: "Manager",
    department: "Operations",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState<number[]>([]);
  const [isRecentExpanded, setIsRecentExpanded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Load recently used apps from storage
  useEffect(() => {
    loadRecentlyUsed();
  }, []);

  const loadRecentlyUsed = async () => {
    try {
      const stored = await AsyncStorage.getItem("recentlyUsedApps");
      if (stored) {
        setRecentlyUsed(JSON.parse(stored));
      }
    } catch (error) {
      console.log("Error loading recently used:", error);
    }
  };

  const saveRecentlyUsed = async (appId: number) => {
    try {
      // Add to beginning, remove duplicates, keep max 6
      const updated = [
        appId,
        ...recentlyUsed.filter((id) => id !== appId),
      ].slice(0, 6);
      setRecentlyUsed(updated);
      await AsyncStorage.setItem("recentlyUsedApps", JSON.stringify(updated));
    } catch (error) {
      console.log("Error saving recently used:", error);
    }
  };

  const removeFromRecent = async (appId: number) => {
    try {
      const updated = recentlyUsed.filter((id) => id !== appId);
      setRecentlyUsed(updated);
      await AsyncStorage.setItem("recentlyUsedApps", JSON.stringify(updated));
    } catch (error) {
      console.log("Error removing from recently used:", error);
    }
  };

  const handleModulePress = (route: string, moduleId: number) => {
    saveRecentlyUsed(moduleId);
    router.push(route as any);
  };

  const handleLogout = () => {
    router.replace("/login");
  };

  // Filter modules based on search query
  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group modules by category
  const getCategoryModules = (categoryApps: string[]) => {
    return filteredModules.filter((module) =>
      categoryApps.includes(module.name)
    );
  };

  // Get recently used modules
  const recentModules = recentlyUsed
    .map((id) => modules.find((m) => m.id === id))
    .filter((m) => m !== undefined)
    .slice(0, 6);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Ultra Compact Header with Avatar Menu */}
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-12 pb-3 px-6"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-xl font-bold">LoopWork</Text>
            <Text className="text-white/70 text-xs mt-0.5">
              Work smarter, loop faster
            </Text>
          </View>

          {/* Avatar with Dropdown */}
          <TouchableOpacity
            onPress={() => setShowUserMenu(!showUserMenu)}
            className="flex-row items-center bg-white/20 px-3 py-2 rounded-full"
            activeOpacity={0.7}
          >
            <View className="w-7 h-7 bg-white rounded-full items-center justify-center">
              <Text className="text-blue-600 text-xs font-bold">
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
        <View className="absolute top-20 right-6 bg-white rounded-2xl shadow-lg z-50 w-56">
          {/* User Info */}
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row items-center mb-2">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Text className="text-blue-600 text-lg font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-base">
                  {user.name}
                </Text>
                <Text className="text-gray-500 text-xs">{user.position}</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-xs">{user.department}</Text>
          </View>

          {/* Menu Items */}
          <View className="py-2">
            <TouchableOpacity
              className="flex-row items-center px-4 py-3 active:bg-gray-50"
              activeOpacity={0.7}
              onPress={() => {
                setShowUserMenu(false);
                // Navigate to profile/settings
              }}
            >
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 text-sm font-medium ml-3">
                My Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center px-4 py-3 active:bg-gray-50"
              activeOpacity={0.7}
              onPress={() => {
                setShowUserMenu(false);
                // Navigate to settings
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 text-sm font-medium ml-3">
                Settings
              </Text>
            </TouchableOpacity>

            <View className="h-px bg-gray-100 mx-4 my-1" />

            <TouchableOpacity
              className="flex-row items-center px-4 py-3 active:bg-gray-50"
              activeOpacity={0.7}
              onPress={() => {
                setShowUserMenu(false);
                handleLogout();
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 text-sm font-medium ml-3">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Backdrop to close menu */}
      {showUserMenu && (
        <TouchableOpacity
          className="absolute inset-0 z-40"
          activeOpacity={1}
          onPress={() => setShowUserMenu(false)}
        />
      )}

      {/* Search Bar - Moved to top for quick access */}
      <View className="px-6 mt-4 mb-4">
        <View className="flex-row items-center bg-white rounded-2xl px-4 shadow-sm">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search applications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 py-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Recently Used Section - Collapsible */}
      {!searchQuery && recentModules.length > 0 && (
        <View className="mb-4">
          {/* Collapsible Header */}
          <TouchableOpacity
            onPress={() => setIsRecentExpanded(!isRecentExpanded)}
            className="px-6 mb-2"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="text-sm font-semibold text-gray-700 ml-1">
                  Recently Used
                </Text>
                <View className="ml-2 bg-blue-100 px-2 py-0.5 rounded-full">
                  <Text className="text-blue-600 text-xs font-medium">
                    {recentModules.length}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={isRecentExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6B7280"
              />
            </View>
          </TouchableOpacity>

          {/* Collapsible Content */}
          {isRecentExpanded && (
            <View className="mt-2">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-6 py-2"
              >
                {recentModules.map((module, index) => (
                  <View
                    key={module.id}
                    className="mr-4 relative"
                    style={{ width: 70 }}
                  >
                    {/* Remove Button - Light Gray */}
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removeFromRecent(module.id);
                      }}
                      className="absolute top-0 right-0 z-10 bg-gray-400 rounded-full w-5 h-5 items-center justify-center shadow-sm"
                      activeOpacity={0.7}
                    >
                      <Ionicons name="close" size={12} color="white" />
                    </TouchableOpacity>

                    <AnimatedTouchableOpacity
                      entering={FadeInDown.duration(400).delay(index * 50)}
                      onPress={() => handleModulePress(module.route, module.id)}
                      activeOpacity={0.7}
                      className="items-center pt-1"
                    >
                      <View
                        className="w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
                        style={{ backgroundColor: module.color }}
                      >
                        <Ionicons
                          name={module.icon as any}
                          size={28}
                          color="#FFFFFF"
                        />
                      </View>
                      <Text
                        className="text-gray-700 font-medium text-xs text-center leading-tight"
                        numberOfLines={2}
                        style={{ height: 28 }}
                      >
                        {module.name}
                      </Text>
                    </AnimatedTouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}

      {/* Modules Grid with Categories */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      >
        {/* If searching, show all results without categories */}
        {searchQuery ? (
          <View className="px-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Search Results ({filteredModules.length})
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {filteredModules.map((module, index) => (
                <AnimatedTouchableOpacity
                  key={module.id}
                  entering={FadeInDown.duration(600)
                    .delay(index * 50)
                    .springify()}
                  onPress={() => handleModulePress(module.route, module.id)}
                  activeOpacity={0.7}
                  style={{ width: cardWidth }}
                  className="items-center mb-3"
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
                    style={{ backgroundColor: module.color }}
                  >
                    <Ionicons
                      name={module.icon as any}
                      size={28}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text
                    className="text-gray-700 font-medium text-xs text-center leading-tight"
                    numberOfLines={2}
                    style={{ height: 28 }}
                  >
                    {module.name}
                  </Text>
                </AnimatedTouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Show categorized view when not searching
          <>
            {categories.map((category, catIndex) => {
              const categoryModules = getCategoryModules(category.apps);
              if (categoryModules.length === 0) return null;

              return (
                <View key={category.name} className="mb-6">
                  {/* Category Header */}
                  <View className="px-6 mb-3">
                    <View className="flex-row items-center">
                      <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-2">
                        <Ionicons
                          name={category.icon as any}
                          size={16}
                          color="#3B82F6"
                        />
                      </View>
                      <Text className="text-base font-bold text-gray-900">
                        {category.name}
                      </Text>
                      <View className="flex-1 h-px bg-gray-200 ml-3" />
                    </View>
                  </View>

                  {/* Category Apps */}
                  <View className="px-6">
                    <View className="flex-row flex-wrap gap-3">
                      {categoryModules.map((module, index) => (
                        <AnimatedTouchableOpacity
                          key={module.id}
                          entering={FadeInDown.duration(600)
                            .delay(catIndex * 100 + index * 50)
                            .springify()}
                          onPress={() =>
                            handleModulePress(module.route, module.id)
                          }
                          activeOpacity={0.7}
                          style={{ width: cardWidth }}
                          className="items-center mb-3"
                        >
                          <View
                            className="w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
                            style={{ backgroundColor: module.color }}
                          >
                            <Ionicons
                              name={module.icon as any}
                              size={28}
                              color="#FFFFFF"
                            />
                          </View>
                          <Text
                            className="text-gray-700 font-medium text-xs text-center leading-tight"
                            numberOfLines={2}
                            style={{ height: 28 }}
                          >
                            {module.name}
                          </Text>
                        </AnimatedTouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}
