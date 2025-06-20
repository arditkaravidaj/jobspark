import { supabase } from './supabase';

export interface AnalyticsEvent {
  id?: string;
  user_id: string;
  event_type: string;
  event_data: Record<string, any>;
  timestamp: Date;
  session_id?: string;
  platform: 'web' | 'ios' | 'android';
  app_version: string;
}

export interface UserSession {
  id?: string;
  user_id: string;
  session_start: Date;
  session_end?: Date;
  duration_seconds?: number;
  page_views: number;
  actions_taken: number;
  platform: string;
  user_agent?: string;
}

export interface CareerMetrics {
  profile_completion_score: number;
  cv_generation_count: number;
  interview_sessions_completed: number;
  job_applications_sent: number;
  skills_added_count: number;
  last_activity_date: Date;
  career_readiness_score: number;
  improvement_rate: number;
}

export class AnalyticsService {
  private static currentSession: UserSession | null = null;
  private static sessionId: string | null = null;

  static async startSession(userId: string, platform: string, userAgent?: string) {
    try {
      const session: Omit<UserSession, 'id'> = {
        user_id: userId,
        session_start: new Date(),
        page_views: 0,
        actions_taken: 0,
        platform,
        user_agent: userAgent,
      };

      const { data, error } = await supabase
        .from('user_sessions')
        .insert([session])
        .select()
        .single();

      if (error) throw error;

      this.currentSession = data;
      this.sessionId = data.id;
      
      return data;
    } catch (error) {
      console.error('Start session error:', error);
      return null;
    }
  }

  static async endSession() {
    if (!this.currentSession || !this.sessionId) return;

    try {
      const sessionEnd = new Date();
      const duration = Math.floor(
        (sessionEnd.getTime() - this.currentSession.session_start.getTime()) / 1000
      );

      const { error } = await supabase
        .from('user_sessions')
        .update({
          session_end: sessionEnd,
          duration_seconds: duration,
        })
        .eq('id', this.sessionId);

      if (error) throw error;

      this.currentSession = null;
      this.sessionId = null;
    } catch (error) {
      console.error('End session error:', error);
    }
  }

  static async trackEvent(
    userId: string,
    eventType: string,
    eventData: Record<string, any> = {},
    platform: 'web' | 'ios' | 'android' = 'web',
    appVersion: string = '1.0.0'
  ) {
    try {
      const event: Omit<AnalyticsEvent, 'id'> = {
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
        timestamp: new Date(),
        session_id: this.sessionId,
        platform,
        app_version: appVersion,
      };

      const { error } = await supabase
        .from('analytics_events')
        .insert([event]);

      if (error) throw error;

      // Update session action count
      if (this.currentSession && this.sessionId) {
        await supabase
          .from('user_sessions')
          .update({
            actions_taken: this.currentSession.actions_taken + 1,
          })
          .eq('id', this.sessionId);

        this.currentSession.actions_taken += 1;
      }
    } catch (error) {
      console.error('Track event error:', error);
    }
  }

  static async trackPageView(userId: string, pageName: string, additionalData: Record<string, any> = {}) {
    await this.trackEvent(userId, 'page_view', {
      page_name: pageName,
      ...additionalData,
    });

    // Update session page view count
    if (this.currentSession && this.sessionId) {
      await supabase
        .from('user_sessions')
        .update({
          page_views: this.currentSession.page_views + 1,
        })
        .eq('id', this.sessionId);

      this.currentSession.page_views += 1;
    }
  }

  static async getCareerMetrics(userId: string): Promise<CareerMetrics | null> {
    try {
      // Get profile completion
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_completed, created_at')
        .eq('user_id', userId)
        .single();

      // Get CV generation count
      const { count: cvCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('event_type', 'cv_generated');

      // Get interview sessions count
      const { count: interviewCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('event_type', 'interview_completed');

      // Get job applications count
      const { count: applicationCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('event_type', 'job_applied');

      // Get skills count
      const { count: skillsCount } = await supabase
        .from('skills')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get last activity
      const { data: lastActivity } = await supabase
        .from('analytics_events')
        .select('timestamp')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      // Calculate career readiness score
      let careerScore = 0;
      if (profile?.profile_completed) careerScore += 30;
      if ((cvCount || 0) > 0) careerScore += 25;
      if ((interviewCount || 0) >= 3) careerScore += 20;
      if ((applicationCount || 0) > 0) careerScore += 15;
      if ((skillsCount || 0) >= 5) careerScore += 10;

      // Calculate improvement rate (mock calculation)
      const improvementRate = Math.min(careerScore / 10, 100);

      return {
        profile_completion_score: profile?.profile_completed ? 100 : 60,
        cv_generation_count: cvCount || 0,
        interview_sessions_completed: interviewCount || 0,
        job_applications_sent: applicationCount || 0,
        skills_added_count: skillsCount || 0,
        last_activity_date: lastActivity?.timestamp ? new Date(lastActivity.timestamp) : new Date(),
        career_readiness_score: careerScore,
        improvement_rate: improvementRate,
      };
    } catch (error) {
      console.error('Get career metrics error:', error);
      return null;
    }
  }

  static async getUserAnalytics(userId: string, days: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Get events in date range
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', userId)
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: true });

      // Get sessions in date range
      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .gte('session_start', startDate.toISOString())
        .order('session_start', { ascending: true });

      // Process analytics data
      const eventsByType = events?.reduce((acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const totalSessions = sessions?.length || 0;
      const totalDuration = sessions?.reduce((sum, session) => 
        sum + (session.duration_seconds || 0), 0) || 0;
      const averageSessionDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;

      return {
        events: events || [],
        sessions: sessions || [],
        eventsByType,
        totalSessions,
        totalDuration,
        averageSessionDuration,
        totalEvents: events?.length || 0,
      };
    } catch (error) {
      console.error('Get user analytics error:', error);
      return null;
    }
  }

  // Career-specific tracking methods
  static async trackCVGenerated(userId: string, templateId: string, completionScore: number) {
    await this.trackEvent(userId, 'cv_generated', {
      template_id: templateId,
      completion_score: completionScore,
    });
  }

  static async trackInterviewCompleted(userId: string, interviewType: string, score: number, duration: number) {
    await this.trackEvent(userId, 'interview_completed', {
      interview_type: interviewType,
      score,
      duration_minutes: Math.round(duration / 60),
    });
  }

  static async trackJobApplied(userId: string, jobId: string, matchScore: number) {
    await this.trackEvent(userId, 'job_applied', {
      job_id: jobId,
      match_score: matchScore,
    });
  }

  static async trackProfileUpdated(userId: string, section: string, completionIncrease: number) {
    await this.trackEvent(userId, 'profile_updated', {
      section,
      completion_increase: completionIncrease,
    });
  }

  static async trackSkillAdded(userId: string, skillName: string, category: string) {
    await this.trackEvent(userId, 'skill_added', {
      skill_name: skillName,
      category,
    });
  }
}