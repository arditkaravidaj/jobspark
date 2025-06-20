import { useState, useEffect } from 'react';
import { ProfileService, CompleteProfile } from '@/lib/profile';
import { useAuth } from './useAuth';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const profileData = await ProfileService.getCompleteProfile(user.id);
      setProfile(profileData);
    } catch (error) {
      console.error('Load profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (profileData: {
    personalDetails: {
      firstName: string;
      lastName: string;
      phone: string;
      location: string;
      dateOfBirth: string;
      summary: string;
    };
    workExperience: Array<{
      jobTitle: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      isCurrentRole: boolean;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      isCurrentlyStudying: boolean;
      grade: string;
    }>;
    skills: {
      technical: string[];
      soft: string[];
      languages: string[];
    };
  }) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    try {
      setSaving(true);
      const savedProfile = await ProfileService.saveCompleteProfile(user.id, profileData);
      
      // Reload the complete profile data
      await loadProfile();
      
      return savedProfile;
    } catch (error: any) {
      console.error('Save profile error:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const checkProfileCompletion = async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      return await ProfileService.checkProfileCompletion(user.id);
    } catch (error) {
      console.error('Check profile completion error:', error);
      return false;
    }
  };

  return {
    profile,
    loading,
    saving,
    saveProfile,
    loadProfile,
    checkProfileCompletion,
    isProfileComplete: profile?.profile?.profile_completed || false,
  };
}