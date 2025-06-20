import { supabase } from './supabase';
import { Platform } from 'react-native';

export interface NotificationPreferences {
  id?: string;
  user_id: string;
  job_alerts: boolean;
  interview_reminders: boolean;
  profile_updates: boolean;
  marketing_emails: boolean;
  push_notifications: boolean;
  email_frequency: 'immediate' | 'daily' | 'weekly' | 'never';
  quiet_hours_start?: string;
  quiet_hours_end?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id?: string;
  user_id: string;
  title: string;
  message: string;
  type: 'job_match' | 'interview_reminder' | 'profile_tip' | 'achievement' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  action_url?: string;
  action_data?: Record<string, any>;
  scheduled_for?: Date;
  sent_at?: Date;
  created_at?: Date;
}

export interface PushToken {
  id?: string;
  user_id: string;
  token: string;
  platform: 'web' | 'ios' | 'android';
  device_info?: Record<string, any>;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export class NotificationService {
  static async getPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Get notification preferences error:', error);
      return null;
    }
  }

  static async updatePreferences(userId: string, preferences: Partial<NotificationPreferences>) {
    try {
      const existingPrefs = await this.getPreferences(userId);

      if (existingPrefs) {
        const { data, error } = await supabase
          .from('notification_preferences')
          .update(preferences)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('notification_preferences')
          .insert([{ user_id: userId, ...preferences }])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Update notification preferences error:', error);
      throw error;
    }
  }

  static async createNotification(notification: Omit<Notification, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([notification])
        .select()
        .single();

      if (error) throw error;

      // If it's a high priority notification, try to send immediately
      if (notification.priority === 'high' || notification.priority === 'urgent') {
        await this.sendNotification(data);
      }

      return data;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error;
    }
  }

  static async getUserNotifications(userId: string, limit: number = 50, unreadOnly: boolean = false) {
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (unreadOnly) {
        query = query.eq('read', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get user notifications error:', error);
      return [];
    }
  }

  static async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  }

  static async markAllAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
      throw error;
    }
  }

  static async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Delete notification error:', error);
      throw error;
    }
  }

  static async sendNotification(notification: Notification) {
    try {
      // Check user preferences
      const preferences = await this.getPreferences(notification.user_id);
      
      if (!preferences) return;

      // Check if user wants this type of notification
      const shouldSend = this.shouldSendNotification(notification, preferences);
      if (!shouldSend) return;

      // For web platform, we can use the Notification API
      if (Platform.OS === 'web' && preferences.push_notifications) {
        await this.sendWebNotification(notification);
      }

      // Update notification as sent
      await supabase
        .from('notifications')
        .update({ sent_at: new Date() })
        .eq('id', notification.id);

    } catch (error) {
      console.error('Send notification error:', error);
    }
  }

  private static shouldSendNotification(notification: Notification, preferences: NotificationPreferences): boolean {
    switch (notification.type) {
      case 'job_match':
        return preferences.job_alerts;
      case 'interview_reminder':
        return preferences.interview_reminders;
      case 'profile_tip':
        return preferences.profile_updates;
      case 'achievement':
        return preferences.push_notifications;
      case 'system':
        return true; // Always send system notifications
      default:
        return preferences.push_notifications;
    }
  }

  private static async sendWebNotification(notification: Notification) {
    if (Platform.OS !== 'web') return;

    try {
      // Check if notifications are supported
      if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return;
      }

      // Request permission if needed
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      // Send notification if permission granted
      if (Notification.permission === 'granted') {
        const webNotification = new Notification(notification.title, {
          body: notification.message,
          icon: '/icon.png',
          badge: '/icon.png',
          tag: notification.id,
          requireInteraction: notification.priority === 'urgent',
        });

        // Handle notification click
        webNotification.onclick = () => {
          window.focus();
          if (notification.action_url) {
            window.location.href = notification.action_url;
          }
          webNotification.close();
        };

        // Auto close after 5 seconds for non-urgent notifications
        if (notification.priority !== 'urgent') {
          setTimeout(() => webNotification.close(), 5000);
        }
      }
    } catch (error) {
      console.error('Send web notification error:', error);
    }
  }

  // Career-specific notification creators
  static async notifyJobMatch(userId: string, jobTitle: string, company: string, matchScore: number) {
    await this.createNotification({
      user_id: userId,
      title: 'New Job Match Found! 🎯',
      message: `${matchScore}% match: ${jobTitle} at ${company}`,
      type: 'job_match',
      priority: 'medium',
      read: false,
      action_url: '/jobs',
    });
  }

  static async notifyInterviewReminder(userId: string, interviewType: string, scheduledTime: Date) {
    await this.createNotification({
      user_id: userId,
      title: 'Interview Practice Reminder 📝',
      message: `Don't forget your ${interviewType} practice session`,
      type: 'interview_reminder',
      priority: 'high',
      read: false,
      scheduled_for: scheduledTime,
      action_url: '/interview',
    });
  }

  static async notifyProfileTip(userId: string, tip: string, section: string) {
    await this.createNotification({
      user_id: userId,
      title: 'Profile Improvement Tip 💡',
      message: tip,
      type: 'profile_tip',
      priority: 'low',
      read: false,
      action_data: { section },
      action_url: '/profile-setup',
    });
  }

  static async notifyAchievement(userId: string, achievement: string, points: number) {
    await this.createNotification({
      user_id: userId,
      title: 'Achievement Unlocked! 🏆',
      message: `${achievement} (+${points} points)`,
      type: 'achievement',
      priority: 'medium',
      read: false,
      action_data: { points },
    });
  }

  static async notifySystemUpdate(userId: string, title: string, message: string) {
    await this.createNotification({
      user_id: userId,
      title,
      message,
      type: 'system',
      priority: 'medium',
      read: false,
    });
  }

  // Batch notification processing
  static async processScheduledNotifications() {
    try {
      const now = new Date();
      
      const { data: scheduledNotifications } = await supabase
        .from('notifications')
        .select('*')
        .lte('scheduled_for', now.toISOString())
        .is('sent_at', null);

      if (scheduledNotifications) {
        for (const notification of scheduledNotifications) {
          await this.sendNotification(notification);
        }
      }
    } catch (error) {
      console.error('Process scheduled notifications error:', error);
    }
  }

  // Smart notification suggestions
  static async generateSmartNotifications(userId: string) {
    try {
      // Get user's career metrics
      const { AnalyticsService } = await import('./analytics');
      const metrics = await AnalyticsService.getCareerMetrics(userId);
      
      if (!metrics) return;

      const suggestions = [];

      // Profile completion suggestions
      if (metrics.profile_completion_score < 80) {
        suggestions.push({
          type: 'profile_tip',
          title: 'Complete Your Profile',
          message: 'A complete profile gets 3x more views from employers',
          priority: 'medium' as const,
        });
      }

      // Interview practice suggestions
      if (metrics.interview_sessions_completed < 3) {
        suggestions.push({
          type: 'interview_reminder',
          title: 'Practice Makes Perfect',
          message: 'Users who practice 3+ interviews are 60% more likely to get hired',
          priority: 'medium' as const,
        });
      }

      // CV generation suggestions
      if (metrics.cv_generation_count === 0) {
        suggestions.push({
          type: 'profile_tip',
          title: 'Generate Your First CV',
          message: 'Create a professional CV in minutes with our AI assistant',
          priority: 'high' as const,
        });
      }

      // Job application suggestions
      if (metrics.job_applications_sent === 0 && metrics.career_readiness_score > 60) {
        suggestions.push({
          type: 'job_match',
          title: 'You\'re Ready to Apply!',
          message: 'Your profile looks great. Start applying to jobs now!',
          priority: 'high' as const,
        });
      }

      // Create notifications for suggestions
      for (const suggestion of suggestions) {
        await this.createNotification({
          user_id: userId,
          title: suggestion.title,
          message: suggestion.message,
          type: suggestion.type as any,
          priority: suggestion.priority,
          read: false,
        });
      }

    } catch (error) {
      console.error('Generate smart notifications error:', error);
    }
  }
}