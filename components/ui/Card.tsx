import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius, Shadows, Timing } from '@/constants/Spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: keyof typeof Spacing;
  animated?: boolean;
  pressable?: boolean;
  onPress?: () => void;
}

export function Card({ 
  children, 
  style, 
  variant = 'default',
  padding = 'lg',
  animated = false,
  pressable = false,
  onPress
}: CardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    if (animated && pressable) {
      scale.value = withSpring(0.98, Timing.spring);
      opacity.value = withTiming(0.9, { duration: Timing.fast });
    }
  };

  const handlePressOut = () => {
    if (animated && pressable) {
      scale.value = withSpring(1, Timing.spring);
      opacity.value = withTiming(1, { duration: Timing.fast });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const cardStyle = [
    styles.base,
    styles[variant],
    { padding: Spacing[padding] },
    style
  ];

  if (animated) {
    return (
      <Animated.View 
        style={[cardStyle, animatedStyle]}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
  },
  
  default: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  
  elevated: {
    backgroundColor: Colors.surface,
    ...Shadows.lg,
  },
  
  outlined: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  
  glass: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  
  gradient: {
    backgroundColor: Colors.surface,
    ...Shadows.primary,
  },
});