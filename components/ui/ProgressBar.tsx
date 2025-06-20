import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { BorderRadius } from '@/constants/Spacing';

interface ProgressBarProps {
  progress: number; // 0 to 1
  style?: ViewStyle;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function ProgressBar({
  progress,
  style,
  height = 8,
  backgroundColor = Colors.gray200,
  progressColor = Colors.primary,
}: ProgressBarProps) {
  return (
    <View style={[
      styles.container,
      { height, backgroundColor },
      style
    ]}>
      <View style={[
        styles.progress,
        {
          width: `${Math.max(0, Math.min(100, progress * 100))}%`,
          backgroundColor: progressColor,
        }
      ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
});