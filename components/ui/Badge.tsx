import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius } from '@/constants/Spacing';

interface BadgeProps {
  title: string;
  icon?: React.ReactNode;
  earned?: boolean;
  style?: ViewStyle;
}

export function Badge({ title, icon, earned = false, style }: BadgeProps) {
  return (
    <View style={[
      styles.badge,
      earned ? styles.earned : styles.notEarned,
      style
    ]}>
      {icon && (
        <View style={[styles.iconContainer, !earned && styles.iconDisabled]}>
          {icon}
        </View>
      )}
      <Text style={[
        styles.title,
        earned ? styles.titleEarned : styles.titleNotEarned
      ]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    minWidth: 80,
    minHeight: 80,
    borderWidth: 2,
  },
  earned: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  notEarned: {
    backgroundColor: Colors.gray100,
    borderColor: Colors.gray300,
  },
  iconContainer: {
    marginBottom: Spacing.xs,
  },
  iconDisabled: {
    opacity: 0.4,
  },
  title: {
    ...Typography.caption,
    textAlign: 'center',
  },
  titleEarned: {
    color: Colors.primary,
  },
  titleNotEarned: {
    color: Colors.textLight,
  },
});