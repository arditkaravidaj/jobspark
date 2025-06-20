import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface ActivityItem {
  id: string | number;
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
  color?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <View style={styles.container}>
      {displayedActivities.map((activity, index) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={styles.timeline}>
            <View style={[
              styles.timelineDot,
              { backgroundColor: activity.color || Colors.primary }
            ]}>
              {activity.icon}
            </View>
            {index < displayedActivities.length - 1 && (
              <View style={styles.timelineLine} />
            )}
          </View>
          
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
            <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  timeline: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.borderLight,
    marginTop: Spacing.xs,
    minHeight: 20,
  },
  activityContent: {
    flex: 1,
    paddingTop: 4,
  },
  activityTitle: {
    ...Typography.body2,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDescription: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  activityTimestamp: {
    ...Typography.caption,
    color: Colors.textLight,
  },
});