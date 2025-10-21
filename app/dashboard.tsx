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

  const handleModulePress = (route: string, moduleId: number) => {
    saveRecentlyUsed(moduleId);
    router.push(route);
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
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-12 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">LoopWork</Text>
            <Text className="text-white/80 text-sm">
              Work smarter, loop faster
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white/20 p-3 rounded-xl"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Info Card */}
        <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
              <Text className="text-primary text-lg font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg">
                {user.name}
              </Text>
              <Text className="text-white/80 text-sm">
                {user.position} • {user.department}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between">
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="checkbox-outline" size={24} color="#3B82F6" />
              <Text className="text-2xl font-bold text-gray-900">12</Text>
            </View>
            <Text className="text-gray-600 text-xs">Active Tasks</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Ionicons name="time-outline" size={24} color="#8B5CF6" />
              <Text className="text-2xl font-bold text-gray-900">8.5h</Text>
            </View>
            <Text className="text-gray-600 text-xs">Today's Time</Text>
          </View>
        </View>
      </View>

      {/* Recently Used Section */}
      {!searchQuery && recentModules.length > 0 && (
        <View className="mb-4">
          <View className="px-6 mb-3">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={18} color="#6B7280" />
              <Text className="text-base font-bold text-gray-900 ml-2">
                Recently Used
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-6"
          >
            {recentModules.map((module, index) => (
              <AnimatedTouchableOpacity
                key={module.id}
                entering={FadeInDown.duration(400).delay(index * 50)}
                onPress={() => handleModulePress(module.route, module.id)}
                activeOpacity={0.7}
                className="items-center mr-4"
                style={{ width: 70 }}
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
          </ScrollView>
        </View>
      )}

      {/* Search Bar */}
      <View className="px-6 mb-4">
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
