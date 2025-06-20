import { supabase } from './supabase';
import { NotificationService } from './notifications';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'profile' | 'cv' | 'interview' | 'jobs' | 'skills' | 'engagement';
  points: number;
  requirements: AchievementRequirement[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  hidden: boolean;
}

export interface AchievementRequirement {
  type: 'count' | 'score' | 'streak' | 'time' | 'completion';
  metric: string;
  value: number;
  operator: 'gte' | 'lte' | 'eq' | 'gt' | 'lt';
}

export interface UserAchievement {
  id?: string;
  user_id: string;
  achievement_id: string;
  earned_at: Date;
  progress?: number;
  metadata?: Record<string, any>;
}

export interface AchievementProgress {
  achievement: Achievement;
  earned: boolean;
  progress: number;
  maxProgress: number;
  earnedAt?: Date;
}

export class AchievementService {
  private static achievements: Achievement[] = [
    // Profile Achievements
    {
      id: 'profile-starter',
      name: 'Getting Started',
      description: 'Complete your basic profile information',
      icon: '👤',
      category: 'profile',
      points: 50,
      requirements: [
        { type: 'completion', metric: 'profile_basic_info', value: 1, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'profile-complete',
      name: 'Profile Pro',
      description: 'Complete 100% of your profile',
      icon: '⭐',
      category: 'profile',
      points: 200,
      requirements: [
        { type: 'score', metric: 'profile_completion', value: 100, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },
    {
      id: 'profile-perfectionist',
      name: 'Perfectionist',
      description: 'Maintain 100% profile completion for 30 days',
      icon: '💎',
      category: 'profile',
      points: 500,
      requirements: [
        { type: 'streak', metric: 'profile_completion_100', value: 30, operator: 'gte' }
      ],
      rarity: 'epic',
      hidden: false,
    },

    // CV Achievements
    {
      id: 'cv-first',
      name: 'CV Creator',
      description: 'Generate your first CV',
      icon: '📄',
      category: 'cv',
      points: 100,
      requirements: [
        { type: 'count', metric: 'cv_generated', value: 1, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'cv-master',
      name: 'CV Master',
      description: 'Generate 5 different CVs',
      icon: '📋',
      category: 'cv',
      points: 300,
      requirements: [
        { type: 'count', metric: 'cv_generated', value: 5, operator: 'gte' }
      ],
      rarity: 'rare',
      hidden: false,
    },
    {
      id: 'cv-perfectionist',
      name: 'CV Perfectionist',
      description: 'Generate a CV with 95%+ completion score',
      icon: '🏆',
      category: 'cv',
      points: 250,
      requirements: [
        { type: 'score', metric: 'cv_completion_score', value: 95, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },

    // Interview Achievements
    {
      id: 'interview-rookie',
      name: 'Interview Rookie',
      description: 'Complete your first interview practice',
      icon: '🎤',
      category: 'interview',
      points: 75,
      requirements: [
        { type: 'count', metric: 'interview_completed', value: 1, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'interview-ready',
      name: 'Interview Ready',
      description: 'Complete 10 interview practice sessions',
      icon: '🎯',
      category: 'interview',
      points: 400,
      requirements: [
        { type: 'count', metric: 'interview_completed', value: 10, operator: 'gte' }
      ],
      rarity: 'rare',
      hidden: false,
    },
    {
      id: 'interview-ace',
      name: 'Interview Ace',
      description: 'Score 90%+ on an interview practice',
      icon: '🌟',
      category: 'interview',
      points: 300,
      requirements: [
        { type: 'score', metric: 'interview_best_score', value: 90, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },
    {
      id: 'interview-legend',
      name: 'Interview Legend',
      description: 'Complete 50 interview sessions with 85%+ average score',
      icon: '👑',
      category: 'interview',
      points: 1000,
      requirements: [
        { type: 'count', metric: 'interview_completed', value: 50, operator: 'gte' },
        { type: 'score', metric: 'interview_average_score', value: 85, operator: 'gte' }
      ],
      rarity: 'legendary',
      hidden: false,
    },

    // Job Application Achievements
    {
      id: 'job-hunter',
      name: 'Job Hunter',
      description: 'Apply to your first job',
      icon: '🎯',
      category: 'jobs',
      points: 100,
      requirements: [
        { type: 'count', metric: 'job_applied', value: 1, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'job-seeker',
      name: 'Active Job Seeker',
      description: 'Apply to 10 jobs',
      icon: '🔍',
      category: 'jobs',
      points: 300,
      requirements: [
        { type: 'count', metric: 'job_applied', value: 10, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },
    {
      id: 'job-magnet',
      name: 'Job Magnet',
      description: 'Apply to 5 jobs with 90%+ match score',
      icon: '🧲',
      category: 'jobs',
      points: 400,
      requirements: [
        { type: 'count', metric: 'high_match_applications', value: 5, operator: 'gte' }
      ],
      rarity: 'rare',
      hidden: false,
    },

    // Skills Achievements
    {
      id: 'skill-builder',
      name: 'Skill Builder',
      description: 'Add 5 skills to your profile',
      icon: '🛠️',
      category: 'skills',
      points: 75,
      requirements: [
        { type: 'count', metric: 'skills_added', value: 5, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Add 20 skills across all categories',
      icon: '🎓',
      category: 'skills',
      points: 250,
      requirements: [
        { type: 'count', metric: 'skills_added', value: 20, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },
    {
      id: 'polyglot',
      name: 'Polyglot',
      description: 'Add 3 or more languages',
      icon: '🌍',
      category: 'skills',
      points: 200,
      requirements: [
        { type: 'count', metric: 'languages_added', value: 3, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: false,
    },

    // Engagement Achievements
    {
      id: 'daily-user',
      name: 'Daily User',
      description: 'Use JobSpark for 7 consecutive days',
      icon: '📅',
      category: 'engagement',
      points: 150,
      requirements: [
        { type: 'streak', metric: 'daily_login', value: 7, operator: 'gte' }
      ],
      rarity: 'common',
      hidden: false,
    },
    {
      id: 'power-user',
      name: 'Power User',
      description: 'Use JobSpark for 30 consecutive days',
      icon: '⚡',
      category: 'engagement',
      points: 500,
      requirements: [
        { type: 'streak', metric: 'daily_login', value: 30, operator: 'gte' }
      ],
      rarity: 'rare',
      hidden: false,
    },
    {
      id: 'career-champion',
      name: 'Career Champion',
      description: 'Reach 1000 total points',
      icon: '🏅',
      category: 'engagement',
      points: 0, // No additional points for this meta-achievement
      requirements: [
        { type: 'count', metric: 'total_points', value: 1000, operator: 'gte' }
      ],
      rarity: 'epic',
      hidden: false,
    },

    // Hidden/Special Achievements
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Complete a task before 6 AM',
      icon: '🌅',
      category: 'engagement',
      points: 100,
      requirements: [
        { type: 'completion', metric: 'early_morning_activity', value: 1, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: true,
    },
    {
      id: 'night-owl',
      name: 'Night Owl',
      description: 'Complete a task after 11 PM',
      icon: '🦉',
      category: 'engagement',
      points: 100,
      requirements: [
        { type: 'completion', metric: 'late_night_activity', value: 1, operator: 'gte' }
      ],
      rarity: 'uncommon',
      hidden: true,
    },
    {
      id: 'weekend-warrior',
      name: 'Weekend Warrior',
      description: 'Complete 10 activities on weekends',
      icon: '⚔️',
      category: 'engagement',
      points: 200,
      requirements: [
        { type: 'count', metric: 'weekend_activities', value: 10, operator: 'gte' }
      ],
      rarity: 'rare',
      hidden: true,
    },
  ];

  static async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get user achievements error:', error);
      return [];
    }
  }

  static async checkAndAwardAchievements(userId: string): Promise<Achievement[]> {
    try {
      const userAchievements = await this.getUserAchievements(userId);
      const earnedAchievementIds = userAchievements.map(ua => ua.achievement_id);
      
      // Get user metrics for checking requirements
      const { AnalyticsService } = await import('./analytics');
      const metrics = await AnalyticsService.getCareerMetrics(userId);
      const analytics = await AnalyticsService.getUserAnalytics(userId);
      
      if (!metrics || !analytics) return [];

      const newlyEarned: Achievement[] = [];

      // Check each achievement
      for (const achievement of this.achievements) {
        if (earnedAchievementIds.includes(achievement.id)) continue;

        const meetsRequirements = await this.checkRequirements(
          achievement.requirements,
          userId,
          metrics,
          analytics
        );

        if (meetsRequirements) {
          // Award the achievement
          await this.awardAchievement(userId, achievement);
          newlyEarned.push(achievement);

          // Send notification
          await NotificationService.notifyAchievement(
            userId,
            achievement.name,
            achievement.points
          );
        }
      }

      return newlyEarned;
    } catch (error) {
      console.error('Check and award achievements error:', error);
      return [];
    }
  }

  private static async checkRequirements(
    requirements: AchievementRequirement[],
    userId: string,
    metrics: any,
    analytics: any
  ): Promise<boolean> {
    for (const req of requirements) {
      const currentValue = await this.getMetricValue(req.metric, userId, metrics, analytics);
      
      if (!this.compareValues(currentValue, req.value, req.operator)) {
        return false;
      }
    }
    return true;
  }

  private static async getMetricValue(
    metric: string,
    userId: string,
    metrics: any,
    analytics: any
  ): Promise<number> {
    switch (metric) {
      case 'profile_completion':
        return metrics.profile_completion_score;
      case 'cv_generated':
        return metrics.cv_generation_count;
      case 'interview_completed':
        return metrics.interview_sessions_completed;
      case 'job_applied':
        return metrics.job_applications_sent;
      case 'skills_added':
        return metrics.skills_added_count;
      case 'total_points':
        return await this.getTotalPoints(userId);
      case 'cv_completion_score':
        return await this.getBestCVScore(userId);
      case 'interview_best_score':
        return await this.getBestInterviewScore(userId);
      case 'interview_average_score':
        return await this.getAverageInterviewScore(userId);
      case 'high_match_applications':
        return await this.getHighMatchApplications(userId);
      case 'languages_added':
        return await this.getLanguagesCount(userId);
      case 'daily_login':
        return await this.getCurrentLoginStreak(userId);
      case 'weekend_activities':
        return await this.getWeekendActivities(userId);
      default:
        return 0;
    }
  }

  private static compareValues(current: number, target: number, operator: string): boolean {
    switch (operator) {
      case 'gte': return current >= target;
      case 'lte': return current <= target;
      case 'eq': return current === target;
      case 'gt': return current > target;
      case 'lt': return current < target;
      default: return false;
    }
  }

  private static async awardAchievement(userId: string, achievement: Achievement) {
    try {
      const userAchievement: Omit<UserAchievement, 'id'> = {
        user_id: userId,
        achievement_id: achievement.id,
        earned_at: new Date(),
        progress: 100,
      };

      const { error } = await supabase
        .from('user_achievements')
        .insert([userAchievement]);

      if (error) throw error;

      // Update user's total points
      await this.updateUserPoints(userId, achievement.points);
    } catch (error) {
      console.error('Award achievement error:', error);
      throw error;
    }
  }

  private static async updateUserPoints(userId: string, points: number) {
    try {
      // This would update a user_stats table or similar
      // For now, we'll track it in analytics events
      const { AnalyticsService } = await import('./analytics');
      await AnalyticsService.trackEvent(userId, 'points_earned', { points });
    } catch (error) {
      console.error('Update user points error:', error);
    }
  }

  static async getAchievementProgress(userId: string): Promise<AchievementProgress[]> {
    try {
      const userAchievements = await this.getUserAchievements(userId);
      const earnedMap = new Map(userAchievements.map(ua => [ua.achievement_id, ua]));

      // Get user metrics for progress calculation
      const { AnalyticsService } = await import('./analytics');
      const metrics = await AnalyticsService.getCareerMetrics(userId);
      const analytics = await AnalyticsService.getUserAnalytics(userId);

      if (!metrics || !analytics) return [];

      const progress: AchievementProgress[] = [];

      for (const achievement of this.achievements) {
        const userAchievement = earnedMap.get(achievement.id);
        const earned = !!userAchievement;

        let currentProgress = 0;
        let maxProgress = 1;

        if (!earned && achievement.requirements.length > 0) {
          // Calculate progress for the first requirement (simplified)
          const req = achievement.requirements[0];
          const currentValue = await this.getMetricValue(req.metric, userId, metrics, analytics);
          maxProgress = req.value;
          currentProgress = Math.min(currentValue, maxProgress);
        } else if (earned) {
          currentProgress = maxProgress = 1;
        }

        progress.push({
          achievement,
          earned,
          progress: currentProgress,
          maxProgress,
          earnedAt: userAchievement?.earned_at,
        });
      }

      return progress;
    } catch (error) {
      console.error('Get achievement progress error:', error);
      return [];
    }
  }

  // Helper methods for specific metrics
  private static async getTotalPoints(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('user_id', userId)
        .eq('event_type', 'points_earned');

      return data?.reduce((sum, event) => sum + (event.event_data?.points || 0), 0) || 0;
    } catch (error) {
      return 0;
    }
  }

  private static async getBestCVScore(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('user_id', userId)
        .eq('event_type', 'cv_generated')
        .order('created_at', { ascending: false });

      const scores = data?.map(event => event.event_data?.completion_score || 0) || [];
      return Math.max(...scores, 0);
    } catch (error) {
      return 0;
    }
  }

  private static async getBestInterviewScore(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('user_id', userId)
        .eq('event_type', 'interview_completed');

      const scores = data?.map(event => event.event_data?.score || 0) || [];
      return Math.max(...scores, 0);
    } catch (error) {
      return 0;
    }
  }

  private static async getAverageInterviewScore(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('user_id', userId)
        .eq('event_type', 'interview_completed');

      const scores = data?.map(event => event.event_data?.score || 0) || [];
      return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    } catch (error) {
      return 0;
    }
  }

  private static async getHighMatchApplications(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('user_id', userId)
        .eq('event_type', 'job_applied');

      return data?.filter(event => (event.event_data?.match_score || 0) >= 90).length || 0;
    } catch (error) {
      return 0;
    }
  }

  private static async getLanguagesCount(userId: string): Promise<number> {
    try {
      const { count } = await supabase
        .from('skills')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('category', 'languages');

      return count || 0;
    } catch (error) {
      return 0;
    }
  }

  private static async getCurrentLoginStreak(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('user_sessions')
        .select('session_start')
        .eq('user_id', userId)
        .order('session_start', { ascending: false })
        .limit(30);

      if (!data || data.length === 0) return 0;

      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < data.length; i++) {
        const sessionDate = new Date(data[i].session_start);
        sessionDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);

        if (sessionDate.getTime() === expectedDate.getTime()) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      return 0;
    }
  }

  private static async getWeekendActivities(userId: string): Promise<number> {
    try {
      const { data } = await supabase
        .from('analytics_events')
        .select('timestamp')
        .eq('user_id', userId);

      if (!data) return 0;

      return data.filter(event => {
        const date = new Date(event.timestamp);
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
      }).length;
    } catch (error) {
      return 0;
    }
  }

  static getAchievementsByCategory(category: Achievement['category']): Achievement[] {
    return this.achievements.filter(achievement => achievement.category === category);
  }

  static getAchievementById(id: string): Achievement | undefined {
    return this.achievements.find(achievement => achievement.id === id);
  }

  static getAllAchievements(): Achievement[] {
    return this.achievements;
  }

  static getVisibleAchievements(): Achievement[] {
    return this.achievements.filter(achievement => !achievement.hidden);
  }
}