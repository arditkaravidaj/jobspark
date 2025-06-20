import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface MetricCardProps {
  title: string;
  value: number;
  maxValue: number;
  unit?: string;
  description?: string;
  color?: string;
  showProgress?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function MetricCard({
  title,
  value,
  maxValue,
  unit = '',
  description,
  color = Colors.primary,
  showProgress = true,
  icon,
  style,
}: MetricCardProps) {
  const progress = maxValue > 0 ? value / maxValue : 0;
  const percentage = Math.round(progress * 100);

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
              {icon}
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
      </View>

      <View style={styles.valueSection}>
        <Text style={[styles.value, { color }]}>
          {value}{unit}
        </Text>
        <Text style={styles.maxValue}>
          / {maxValue}{unit}
        </Text>
      </View>

      {showProgress && (
        <ProgressBar
          progress={progress}
          progressColor={color}
          style={styles.progressBar}
        />
      )}

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  percentage: {
    ...Typography.body2,
    fontWeight: '600',
  },
  valueSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  value: {
    ...Typography.h3,
    fontWeight: 'bold',
  },
  maxValue: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  progressBar: {
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});