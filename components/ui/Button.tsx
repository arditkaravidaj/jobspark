import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows, Timing } from '@/constants/Spacing';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'glass';
  size?: 'small' | 'medium' | 'large' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animated?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  animated = true,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    if (animated && !disabled && !loading) {
      scale.value = withSpring(0.95, Timing.spring);
      opacity.value = withTiming(0.8, { duration: Timing.fast });
    }
  };

  const handlePressOut = () => {
    if (animated) {
      scale.value = withSpring(1, Timing.spring);
      opacity.value = withTiming(1, { duration: Timing.fast });
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      runOnJS(onPress)();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    loading && styles.loading,
    style,
  ];

  const textColor = getTextColor(variant, disabled);
  const finalTextStyle = [
    getTypographyStyle(size),
    { color: textColor },
    textStyle,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={finalTextStyle}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </>
      )}
    </View>
  );

  if (animated) {
    return (
      <AnimatedTouchableOpacity
        style={[buttonStyle, animatedStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {renderContent()}
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

function getTextColor(variant: string, disabled: boolean) {
  if (disabled) return Colors.textTertiary;
  
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'gradient':
      return Colors.textOnPrimary;
    case 'outline':
    case 'ghost':
      return Colors.primary;
    case 'glass':
      return Colors.text;
    default:
      return Colors.textOnPrimary;
  }
}

function getTypographyStyle(size: string) {
  switch (size) {
    case 'small':
      return Typography.buttonSmall;
    case 'large':
      return Typography.buttonLarge;
    case 'xl':
      return Typography.buttonLarge;
    default:
      return Typography.button;
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.button,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.md,
  },
  
  secondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.md,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  
  gradient: {
    backgroundColor: Colors.primary, // Fallback
    ...Shadows.primary,
  },
  
  glass: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  
  // Sizes
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  
  medium: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  
  large: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  
  xl: {
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.xl,
    minHeight: 64,
  },
  
  // States
  disabled: {
    backgroundColor: Colors.neutral200,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  loading: {
    opacity: 0.8,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // Content
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconLeft: {
    marginRight: Spacing.sm,
  },
  
  iconRight: {
    marginLeft: Spacing.sm,
  },
});