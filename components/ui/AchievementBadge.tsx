import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Achievement } from '@/lib/achievements';
import { Lock, Star } from 'lucide-react-native';

interface AchievementBadgeProps {
  achievement: Achievement;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedAt?: Date;
  onPress?: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export function AchievementBadge({
  achievement,
  earned,
  progress = 0,
  maxProgress = 1,
  earnedAt,
  onPress,
  style,
  size = 'medium',
}: AchievementBadgeProps) {
  const getRarityColor = () => {
    switch (achievement.rarity) {
      case 'common':
        return Colors.gray500;
      case 'uncommon':
        return Colors.success;
      case 'rare':
        return Colors.primary;
      case 'epic':
        return Colors.warning;
      case 'legendary':
        return Colors.error;
      default:
        return Colors.gray500;
    }
  };

  const getRarityGradient = () => {
    switch (achievement.rarity) {
      case 'common':
        return ['#6C757D', '#ADB5BD'];
      case 'uncommon':
        return ['#28A745', '#5CBB5C'];
      case 'rare':
        return ['#007BFF', '#66B2FF'];
      case 'epic':
        return ['#FFC107', '#FFD54F'];
      case 'legendary':
        return ['#DC3545', '#E57373'];
      default:
        return ['#6C757D', '#ADB5BD'];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { width: 60, height: 80 },
          icon: { fontSize: 20 },
          title: { ...Typography.caption, fontSize: 10 },
          points: { ...Typography.caption, fontSize: 9 },
        };
      case 'large':
        return {
          container: { width: 120, height: 160 },
          icon: { fontSize: 40 },
          title: { ...Typography.body2 },
          points: { ...Typography.body2 },
        };
      default:
        return {
          container: { width: 80, height: 120 },
          icon: { fontSize: 28 },
          title: { ...Typography.caption },
          points: { ...Typography.caption },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const rarityColor = getRarityColor();
  const progressPercentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;

  const formatEarnedDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        sizeStyles.container,
        {
          borderColor: rarityColor,
          backgroundColor: earned ? Colors.white : Colors.gray100,
          opacity: earned ? 1 : achievement.hidden ? 0.3 : 0.7,
        },
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      {/* Rarity Border Effect */}
      <View style={[
        styles.rarityBorder,
        { borderColor: rarityColor }
      ]} />

      {/* Achievement Icon */}
      <View style={[
        styles.iconContainer,
        { backgroundColor: earned ? `${rarityColor}15` : Colors.gray200 }
      ]}>
        {achievement.hidden && !earned ? (
          <Lock size={sizeStyles.icon.fontSize * 0.7} color={Colors.textLight} />
        ) : (
          <Text style={[styles.icon, sizeStyles.icon]}>
            {achievement.icon}
          </Text>
        )}
      </View>

      {/* Achievement Info */}
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            sizeStyles.title,
            { color: earned ? Colors.text : Colors.textLight }
          ]}
          numberOfLines={2}
        >
          {achievement.hidden && !earned ? '???' : achievement.name}
        </Text>

        {/* Points */}
        <Text style={[
          styles.points,
          sizeStyles.points,
          { color: rarityColor }
        ]}>
          {achievement.points} pts
        </Text>

        {/* Progress Bar for Unearned Achievements */}
        {!earned && !achievement.hidden && maxProgress > 1 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: rarityColor,
                }
              ]} />
            </View>
            <Text style={styles.progressText}>
              {progress}/{maxProgress}
            </Text>
          </View>
        )}

        {/* Earned Date */}
        {earned && earnedAt && size !== 'small' && (
          <Text style={styles.earnedDate}>
            {formatEarnedDate(earnedAt)}
          </Text>
        )}
      </View>

      {/* Rarity Stars */}
      <View style={styles.rarityStars}>
        {Array.from({ length: getRarityStarCount(achievement.rarity) }).map((_, index) => (
          <Star
            key={index}
            size={8}
            color={rarityColor}
            fill={earned ? rarityColor : 'transparent'}
          />
        ))}
      </View>

      {/* Earned Indicator */}
      {earned && (
        <View style={[styles.earnedIndicator, { backgroundColor: rarityColor }]}>
          <Text style={styles.earnedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function getRarityStarCount(rarity: Achievement['rarity']): number {
  switch (rarity) {
    case 'common': return 1;
    case 'uncommon': return 2;
    case 'rare': return 3;
    case 'epic': return 4;
    case 'legendary': return 5;
    default: return 1;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    padding: Spacing.sm,
    alignItems: 'center',
    position: 'relative',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rarityBorder: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 13,
    borderWidth: 1,
    opacity: 0.3,
  },
  iconContainer: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  icon: {
    textAlign: 'center',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
    lineHeight: 14,
  },
  points: {
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.textLight,
  },
  earnedDate: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.textLight,
    textAlign: 'center',
  },
  rarityStars: {
    flexDirection: 'row',
    gap: 2,
    marginTop: Spacing.xs,
  },
  earnedIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  earnedText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});