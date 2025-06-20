import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useAccessibility } from '@/lib/accessibility';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = Colors.primary,
  style 
}: LoadingSpinnerProps) {
  const { shouldReduceMotion } = useAccessibility();
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (!shouldReduceMotion) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    }
  }, [shouldReduceMotion]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const getSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 48;
      default: return 24;
    }
  };

  const spinnerSize = getSize();

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderColor: `${color}20`,
            borderTopColor: color,
          },
          animatedStyle,
        ]}
        accessible={true}
        accessibilityRole="progressbar"
        accessibilityLabel="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 50,
  },
});