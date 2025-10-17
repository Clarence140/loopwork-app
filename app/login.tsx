import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyCode: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/dashboard");
    }, 1500);
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6", "#8B5CF6", "#6366F1", "#1E40AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="flex-1 justify-center px-8"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo and Title */}
            <Animated.View
              entering={FadeInDown.duration(800).springify()}
              className="items-center mb-12"
            >
              <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center mb-4 shadow-2xl">
                <Text className="text-4xl font-bold text-primary">LW</Text>
              </View>
              <Text className="text-3xl font-bold text-white mb-2">
                LoopWork
              </Text>
              <Text className="text-white/90 text-sm font-medium">
                Work smarter, loop faster.
              </Text>
            </Animated.View>

            {/* Login Form */}
            <Animated.View
              entering={FadeInUp.duration(800).delay(200).springify()}
              className="bg-white/95 rounded-3xl p-6 shadow-2xl"
            >
              <View className="mb-6">
                <Text className="text-2xl font-semibold text-gray-900 mb-2">
                  Welcome Back
                </Text>
                <Text className="text-gray-600 text-sm">
                  Please sign in to your account
                </Text>
              </View>

              {/* Company Code Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Company Code
                </Text>
                <TextInput
                  value={formData.companyCode}
                  onChangeText={(text) =>
                    setFormData({ ...formData, companyCode: text })
                  }
                  placeholder="Enter company code"
                  placeholderTextColor="#9CA3AF"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                  autoCapitalize="characters"
                />
              </View>

              {/* Username Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Username
                </Text>
                <TextInput
                  value={formData.username}
                  onChangeText={(text) =>
                    setFormData({ ...formData, username: text })
                  }
                  placeholder="Enter username"
                  placeholderTextColor="#9CA3AF"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <TextInput
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  placeholder="Enter password"
                  placeholderTextColor="#9CA3AF"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
                className={`w-full py-4 rounded-xl shadow-lg ${
                  isLoading ? "bg-gray-400" : "bg-primary"
                }`}
              >
                {isLoading ? (
                  <View className="flex-row items-center justify-center">
                    <Text className="text-white font-semibold text-base">
                      Signing In...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white font-semibold text-center text-base">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.duration(800).delay(400).springify()}
              className="items-center mt-8"
            >
              <Text className="text-xs text-white/80 font-medium">
                © 2024 Inspire Group. All rights reserved.
              </Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

