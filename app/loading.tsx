import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen() {
  const router = useRouter();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    scale.value = withSequence(
      withTiming(1.1, { duration: 600, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
    );

    opacity.value = withTiming(1, { duration: 800 });

    // Rotate animation for loading indicator
    rotate.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );

    // Navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const loadingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6", "#8B5CF6", "#6366F1", "#1E40AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center justify-center"
      >
        {/* Logo Container */}
        <Animated.View style={logoAnimatedStyle} className="items-center">
          {/* Logo */}
          <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 shadow-2xl">
            <Text className="text-5xl font-bold text-primary">LW</Text>
          </View>

          {/* App Name */}
          <Text className="text-4xl font-bold text-white mb-2">LoopWork</Text>
          <Text className="text-white/90 text-base font-medium mb-8">
            Work smarter, loop faster.
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          style={loadingAnimatedStyle}
          className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mt-8"
        />

        {/* Version Text */}
        <View className="absolute bottom-12">
          <Text className="text-white/60 text-xs font-medium">
            Version 1.0.0
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

