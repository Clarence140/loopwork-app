import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// App modules matching the web version
const modules = [
  {
    id: 1,
    name: "To-Do List",
    icon: "checkbox-outline",
    color: "#3B82F6",
    route: "/(tabs)",
  },
  {
    id: 2,
    name: "Address Book",
    icon: "people-outline",
    color: "#8B5CF6",
    route: "/(tabs)",
  },
  {
    id: 3,
    name: "Cabinet",
    icon: "folder-outline",
    color: "#6366F1",
    route: "/(tabs)",
  },
  {
    id: 4,
    name: "Circulation",
    icon: "paper-plane-outline",
    color: "#3B82F6",
    route: "/(tabs)",
  },
  {
    id: 5,
    name: "Dashboard",
    icon: "grid-outline",
    color: "#1E3A8A",
    route: "/(tabs)",
  },
  {
    id: 6,
    name: "Discussion",
    icon: "chatbubbles-outline",
    color: "#8B5CF6",
    route: "/(tabs)",
  },
  {
    id: 7,
    name: "Documents",
    icon: "document-text-outline",
    color: "#6366F1",
    route: "/(tabs)",
  },
  {
    id: 8,
    name: "Facility",
    icon: "business-outline",
    color: "#3B82F6",
    route: "/(tabs)",
  },
  {
    id: 9,
    name: "Information",
    icon: "information-circle-outline",
    color: "#1E40AF",
    route: "/(tabs)",
  },
  {
    id: 10,
    name: "Minutes",
    icon: "time-outline",
    color: "#8B5CF6",
    route: "/(tabs)",
  },
  {
    id: 11,
    name: "Notepad",
    icon: "create-outline",
    color: "#6366F1",
    route: "/(tabs)",
  },
  {
    id: 12,
    name: "Projects",
    icon: "briefcase-outline",
    color: "#3B82F6",
    route: "/(tabs)",
  },
  {
    id: 13,
    name: "Schedule",
    icon: "calendar-outline",
    color: "#1E3A8A",
    route: "/(tabs)",
  },
  {
    id: 14,
    name: "Timecard",
    icon: "stopwatch-outline",
    color: "#8B5CF6",
    route: "/(tabs)",
  },
  {
    id: 15,
    name: "Users",
    icon: "person-outline",
    color: "#6366F1",
    route: "/(tabs)",
  },
  {
    id: 16,
    name: "Visitors",
    icon: "walk-outline",
    color: "#3B82F6",
    route: "/(tabs)",
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [user] = useState({
    name: "John Doe",
    position: "Manager",
    department: "Operations",
  });

  const handleModulePress = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    router.replace("/login");
  };

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

      {/* Modules Grid */}
      <View className="flex-1 px-6">
        <Text className="text-lg font-bold text-gray-900 mb-3">
          Applications
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-6"
        >
          <View className="flex-row flex-wrap justify-between">
            {modules.map((module, index) => (
              <AnimatedTouchableOpacity
                key={module.id}
                entering={FadeInDown.duration(600)
                  .delay(index * 50)
                  .springify()}
                onPress={() => handleModulePress(module.route)}
                activeOpacity={0.7}
                style={{ width: cardWidth }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: module.color + "20" }}
                >
                  <Ionicons
                    name={module.icon as any}
                    size={24}
                    color={module.color}
                  />
                </View>
                <Text className="text-gray-900 font-semibold text-sm">
                  {module.name}
                </Text>
              </AnimatedTouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

