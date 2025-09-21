import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows, Timing } from '@/constants/Spacing';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  required?: boolean;
  variant?: 'default' | 'filled' | 'outlined' | 'glass';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  animated?: boolean;
}

export function Input({
  label,
  error,
  success,
  hint,
  containerStyle,
  required = false,
  variant = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  onRightIconPress,
  animated = true,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  const focusAnimation = useSharedValue(0);
  const borderAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  const handleFocus = () => {
    setIsFocused(true);
    if (animated) {
      focusAnimation.value = withTiming(1, { duration: Timing.normal });
      borderAnimation.value = withTiming(1, { duration: Timing.normal });
      scaleAnimation.value = withSpring(1.02, Timing.spring);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (animated) {
      focusAnimation.value = withTiming(0, { duration: Timing.normal });
      borderAnimation.value = withTiming(0, { duration: Timing.normal });
      scaleAnimation.value = withSpring(1, Timing.spring);
    }
  };

  const handleChangeText = (text: string) => {
    setHasValue(text.length > 0);
    props.onChangeText?.(text);
  };

  const animatedInputStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderAnimation.value,
      [0, 1],
      [error ? Colors.error : Colors.border, Colors.borderFocus]
    );

    return {
      borderColor,
      transform: [{ scale: scaleAnimation.value }],
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    if (variant === 'filled' && (isFocused || hasValue)) {
      return {
        transform: [
          { translateY: withTiming(-8, { duration: Timing.normal }) },
          { scale: withTiming(0.85, { duration: Timing.normal }) },
        ],
        color: interpolateColor(
          focusAnimation.value,
          [0, 1],
          [Colors.textSecondary, Colors.primary]
        ),
      };
    }
    return {};
  });

  const getInputStyle = () => {
    const baseStyle = [
      styles.input,
      styles[variant],
      styles[size],
      leftIcon && styles.inputWithLeftIcon,
      rightIcon && styles.inputWithRightIcon,
      error && styles.inputError,
      success && styles.inputSuccess,
      style,
    ];

    return baseStyle;
  };

  const renderLabel = () => {
    if (!label) return null;

    if (variant === 'filled') {
      return (
        <Animated.Text style={[styles.floatingLabel, animatedLabelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Animated.Text>
      );
    }

    return (
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    );
  };

  const renderMessage = () => {
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    if (success) {
      return <Text style={styles.successText}>{success}</Text>;
    }
    if (hint) {
      return <Text style={styles.hintText}>{hint}</Text>;
    }
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {variant !== 'filled' && renderLabel()}
      
      <View style={styles.inputContainer}>
        {variant === 'filled' && renderLabel()}
        
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <AnimatedTextInput
          style={[getInputStyle(), animated && animatedInputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          placeholderTextColor={Colors.textTertiary}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity 
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {renderMessage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  
  inputContainer: {
    position: 'relative',
  },
  
  label: {
    ...Typography.label,
    marginBottom: Spacing.sm,
    color: Colors.text,
  },
  
  floatingLabel: {
    ...Typography.label,
    position: 'absolute',
    left: Spacing.md,
    top: Spacing.md,
    zIndex: 1,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xs,
  },
  
  required: {
    color: Colors.error,
  },
  
  input: {
    ...Typography.body1,
    color: Colors.text,
    borderRadius: BorderRadius.input,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
  },
  
  // Variants
  default: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  
  filled: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: 'transparent',
  },
  
  outlined: {
    backgroundColor: 'transparent',
    borderColor: Colors.border,
    borderWidth: 2,
  },
  
  glass: {
    backgroundColor: Colors.glass,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  
  // Sizes
  small: {
    paddingVertical: Spacing.sm,
    minHeight: 40,
    fontSize: 14,
  },
  
  medium: {
    paddingVertical: Spacing.md,
    minHeight: 48,
    fontSize: 16,
  },
  
  large: {
    paddingVertical: Spacing.lg,
    minHeight: 56,
    fontSize: 18,
  },
  
  // States
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  
  inputSuccess: {
    borderColor: Colors.success,
    backgroundColor: Colors.successLight,
  },
  
  // Icons
  inputWithLeftIcon: {
    paddingLeft: Spacing['5xl'],
  },
  
  inputWithRightIcon: {
    paddingRight: Spacing['5xl'],
  },
  
  leftIconContainer: {
    position: 'absolute',
    left: Spacing.md,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  
  rightIconContainer: {
    position: 'absolute',
    right: Spacing.md,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
    padding: Spacing.xs,
  },
  
  // Messages
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.sm,
  },
  
  successText: {
    ...Typography.caption,
    color: Colors.success,
    marginTop: Spacing.sm,
  },
  
  hintText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});