import { supabase } from './supabase';

// Profile data interfaces
export interface ProfileData {
  id?: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  location?: string;
  date_of_birth?: string;
  professional_summary?: string;
  profile_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface WorkExperience {
  id?: string;
  user_id: string;
  job_title: string;
  company: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  is_current_role: boolean;
  description?: string;
  created_at?: string;
}

export interface Education {
  id?: string;
  user_id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  is_currently_studying: boolean;
  grade?: string;
  created_at?: string;
}

export interface Skill {
  id?: string;
  user_id: string;
  category: 'technical' | 'soft' | 'languages';
  name: string;
  created_at?: string;
}

export interface CompleteProfile {
  profile: ProfileData;
  workExperiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

export class ProfileService {
  static async createProfile(profileData: Omit<ProfileData, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Create profile error:', error);
      throw new Error(error.message || 'Failed to create profile');
    }
  }

  static async updateProfile(userId: string, profileData: Partial<ProfileData>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  static async getProfile(userId: string): Promise<ProfileData | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      return null;
    }
  }

  static async saveWorkExperiences(userId: string, experiences: Omit<WorkExperience, 'id' | 'user_id' | 'created_at'>[]) {
    try {
      // First, delete existing work experiences
      await supabase
        .from('work_experiences')
        .delete()
        .eq('user_id', userId);

      // Then insert new ones
      if (experiences.length > 0) {
        const experiencesWithUserId = experiences.map(exp => ({
          ...exp,
          user_id: userId,
        }));

        const { data, error } = await supabase
          .from('work_experiences')
          .insert(experiencesWithUserId)
          .select();

        if (error) {
          throw error;
        }

        return data;
      }

      return [];
    } catch (error: any) {
      console.error('Save work experiences error:', error);
      throw new Error(error.message || 'Failed to save work experiences');
    }
  }

  static async getWorkExperiences(userId: string): Promise<WorkExperience[]> {
    try {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error: any) {
      console.error('Get work experiences error:', error);
      return [];
    }
  }

  static async saveEducation(userId: string, educationList: Omit<Education, 'id' | 'user_id' | 'created_at'>[]) {
    try {
      // First, delete existing education records
      await supabase
        .from('education')
        .delete()
        .eq('user_id', userId);

      // Then insert new ones
      if (educationList.length > 0) {
        const educationWithUserId = educationList.map(edu => ({
          ...edu,
          user_id: userId,
        }));

        const { data, error } = await supabase
          .from('education')
          .insert(educationWithUserId)
          .select();

        if (error) {
          throw error;
        }

        return data;
      }

      return [];
    } catch (error: any) {
      console.error('Save education error:', error);
      throw new Error(error.message || 'Failed to save education');
    }
  }

  static async getEducation(userId: string): Promise<Education[]> {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error: any) {
      console.error('Get education error:', error);
      return [];
    }
  }

  static async saveSkills(userId: string, skillsData: { technical: string[]; soft: string[]; languages: string[] }) {
    try {
      // First, delete existing skills
      await supabase
        .from('skills')
        .delete()
        .eq('user_id', userId);

      // Prepare skills array
      const allSkills: Omit<Skill, 'id' | 'created_at'>[] = [];

      // Add technical skills
      skillsData.technical.forEach(skill => {
        allSkills.push({
          user_id: userId,
          category: 'technical',
          name: skill,
        });
      });

      // Add soft skills
      skillsData.soft.forEach(skill => {
        allSkills.push({
          user_id: userId,
          category: 'soft',
          name: skill,
        });
      });

      // Add languages
      skillsData.languages.forEach(skill => {
        allSkills.push({
          user_id: userId,
          category: 'languages',
          name: skill,
        });
      });

      // Insert all skills
      if (allSkills.length > 0) {
        const { data, error } = await supabase
          .from('skills')
          .insert(allSkills)
          .select();

        if (error) {
          throw error;
        }

        return data;
      }

      return [];
    } catch (error: any) {
      console.error('Save skills error:', error);
      throw new Error(error.message || 'Failed to save skills');
    }
  }

  static async getSkills(userId: string): Promise<{ technical: string[]; soft: string[]; languages: string[] }> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      const skills = data || [];
      
      return {
        technical: skills.filter(s => s.category === 'technical').map(s => s.name),
        soft: skills.filter(s => s.category === 'soft').map(s => s.name),
        languages: skills.filter(s => s.category === 'languages').map(s => s.name),
      };
    } catch (error: any) {
      console.error('Get skills error:', error);
      return { technical: [], soft: [], languages: [] };
    }
  }

  static async saveCompleteProfile(userId: string, profileData: {
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
  }) {
    try {
      // Save or update profile
      const profile: Omit<ProfileData, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        first_name: profileData.personalDetails.firstName,
        last_name: profileData.personalDetails.lastName,
        phone: profileData.personalDetails.phone,
        location: profileData.personalDetails.location,
        date_of_birth: profileData.personalDetails.dateOfBirth,
        professional_summary: profileData.personalDetails.summary,
        profile_completed: true,
      };

      // Check if profile exists
      const existingProfile = await this.getProfile(userId);
      let savedProfile;

      if (existingProfile) {
        savedProfile = await this.updateProfile(userId, profile);
      } else {
        savedProfile = await this.createProfile(profile);
      }

      // Save work experiences
      const workExperiences = profileData.workExperience.map(exp => ({
        job_title: exp.jobTitle,
        company: exp.company,
        location: exp.location,
        start_date: exp.startDate,
        end_date: exp.endDate,
        is_current_role: exp.isCurrentRole,
        description: exp.description,
      }));

      await this.saveWorkExperiences(userId, workExperiences);

      // Save education
      const education = profileData.education.map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        field_of_study: edu.fieldOfStudy,
        start_date: edu.startDate,
        end_date: edu.endDate,
        is_currently_studying: edu.isCurrentlyStudying,
        grade: edu.grade,
      }));

      await this.saveEducation(userId, education);

      // Save skills
      await this.saveSkills(userId, profileData.skills);

      return savedProfile;
    } catch (error: any) {
      console.error('Save complete profile error:', error);
      throw new Error(error.message || 'Failed to save profile');
    }
  }

  static async getCompleteProfile(userId: string): Promise<CompleteProfile | null> {
    try {
      const [profile, workExperiences, education, skills] = await Promise.all([
        this.getProfile(userId),
        this.getWorkExperiences(userId),
        this.getEducation(userId),
        this.getSkills(userId),
      ]);

      if (!profile) {
        return null;
      }

      // Convert skills back to Skill[] format
      const skillsArray: Skill[] = [
        ...skills.technical.map(name => ({ user_id: userId, category: 'technical' as const, name })),
        ...skills.soft.map(name => ({ user_id: userId, category: 'soft' as const, name })),
        ...skills.languages.map(name => ({ user_id: userId, category: 'languages' as const, name })),
      ];

      return {
        profile,
        workExperiences,
        education,
        skills: skillsArray,
      };
    } catch (error: any) {
      console.error('Get complete profile error:', error);
      return null;
    }
  }

  static async checkProfileCompletion(userId: string): Promise<boolean> {
    try {
      const profile = await this.getProfile(userId);
      return profile?.profile_completed || false;
    } catch (error) {
      console.error('Check profile completion error:', error);
      return false;
    }
  }
}