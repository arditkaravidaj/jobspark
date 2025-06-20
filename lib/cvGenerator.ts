import { CompleteProfile } from './profile';

export interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
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
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
  style: 'modern' | 'classic' | 'creative' | 'minimal';
  isPremium: boolean;
}

export interface AISuggestion {
  id: string;
  type: 'summary' | 'experience' | 'skills' | 'education';
  title: string;
  description: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export class CVGeneratorService {
  static transformProfileToCV(profile: CompleteProfile): CVData {
    return {
      personalInfo: {
        firstName: profile.profile.first_name || '',
        lastName: profile.profile.last_name || '',
        email: '', // This would come from auth user
        phone: profile.profile.phone || '',
        location: profile.profile.location || '',
        summary: profile.profile.professional_summary || '',
      },
      workExperience: profile.workExperiences.map(exp => ({
        jobTitle: exp.job_title,
        company: exp.company,
        location: exp.location || '',
        startDate: exp.start_date || '',
        endDate: exp.end_date || '',
        isCurrentRole: exp.is_current_role,
        description: exp.description || '',
      })),
      education: profile.education.map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.field_of_study || '',
        startDate: edu.start_date || '',
        endDate: edu.end_date || '',
        isCurrentlyStudying: edu.is_currently_studying,
        grade: edu.grade || '',
      })),
      skills: {
        technical: profile.skills.filter(s => s.category === 'technical').map(s => s.name),
        soft: profile.skills.filter(s => s.category === 'soft').map(s => s.name),
        languages: profile.skills.filter(s => s.category === 'languages').map(s => s.name),
      },
    };
  }

  static generateAISuggestions(cvData: CVData): AISuggestion[] {
    const suggestions: AISuggestion[] = [];

    // Summary suggestions
    if (!cvData.personalInfo.summary || cvData.personalInfo.summary.length < 100) {
      suggestions.push({
        id: 'summary-enhance',
        type: 'summary',
        title: 'Enhance Professional Summary',
        description: 'Your summary could be more compelling with specific achievements',
        suggestion: 'Add quantifiable results and key skills that match your target role',
        priority: 'high',
      });
    }

    // Experience suggestions
    if (cvData.workExperience.length === 0) {
      suggestions.push({
        id: 'experience-add',
        type: 'experience',
        title: 'Add Work Experience',
        description: 'Include your professional experience to strengthen your CV',
        suggestion: 'Add at least one work experience entry with specific achievements',
        priority: 'high',
      });
    } else {
      const hasQuantifiableResults = cvData.workExperience.some(exp => 
        exp.description.includes('%') || exp.description.includes('$') || /\d+/.test(exp.description)
      );
      
      if (!hasQuantifiableResults) {
        suggestions.push({
          id: 'experience-quantify',
          type: 'experience',
          title: 'Quantify Your Achievements',
          description: 'Add numbers and metrics to make your impact clear',
          suggestion: 'Include specific results like "increased sales by 25%" or "managed team of 10"',
          priority: 'medium',
        });
      }
    }

    // Skills suggestions
    const totalSkills = cvData.skills.technical.length + cvData.skills.soft.length + cvData.skills.languages.length;
    if (totalSkills < 5) {
      suggestions.push({
        id: 'skills-expand',
        type: 'skills',
        title: 'Expand Your Skills Section',
        description: 'Add more relevant skills to showcase your capabilities',
        suggestion: 'Include both technical and soft skills relevant to your target role',
        priority: 'medium',
      });
    }

    // Education suggestions
    if (cvData.education.length === 0) {
      suggestions.push({
        id: 'education-add',
        type: 'education',
        title: 'Add Education Information',
        description: 'Include your educational background',
        suggestion: 'Add your highest qualification or relevant certifications',
        priority: 'low',
      });
    }

    return suggestions;
  }

  static async generateCV(
    cvData: CVData, 
    template: CVTemplate,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    // Simulate AI CV generation process
    const steps = [
      'Analyzing your profile data...',
      'Optimizing content for ATS systems...',
      'Applying template design...',
      'Enhancing readability and flow...',
      'Finalizing your professional CV...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      onProgress?.((i + 1) / steps.length);
    }

    // In a real implementation, this would call an AI service
    // and return the generated CV content or file URL
    return 'cv-generated-successfully';
  }

  static validateCVData(cvData: CVData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Personal info validation
    if (!cvData.personalInfo.firstName) {
      errors.push('First name is required');
    }
    if (!cvData.personalInfo.lastName) {
      errors.push('Last name is required');
    }
    if (!cvData.personalInfo.email) {
      errors.push('Email address is required');
    }

    // Content validation
    if (cvData.workExperience.length === 0 && cvData.education.length === 0) {
      errors.push('At least one work experience or education entry is required');
    }

    const totalSkills = cvData.skills.technical.length + cvData.skills.soft.length + cvData.skills.languages.length;
    if (totalSkills === 0) {
      errors.push('At least one skill is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static getCompletionScore(cvData: CVData): number {
    let score = 0;
    let maxScore = 100;

    // Personal info (30 points)
    if (cvData.personalInfo.firstName) score += 5;
    if (cvData.personalInfo.lastName) score += 5;
    if (cvData.personalInfo.email) score += 5;
    if (cvData.personalInfo.phone) score += 5;
    if (cvData.personalInfo.location) score += 5;
    if (cvData.personalInfo.summary && cvData.personalInfo.summary.length > 50) score += 5;

    // Work experience (35 points)
    if (cvData.workExperience.length > 0) {
      score += 20;
      const hasDetailedDescriptions = cvData.workExperience.some(exp => 
        exp.description && exp.description.length > 100
      );
      if (hasDetailedDescriptions) score += 15;
    }

    // Education (20 points)
    if (cvData.education.length > 0) {
      score += 20;
    }

    // Skills (15 points)
    const totalSkills = cvData.skills.technical.length + cvData.skills.soft.length + cvData.skills.languages.length;
    if (totalSkills >= 5) {
      score += 15;
    } else if (totalSkills > 0) {
      score += Math.floor((totalSkills / 5) * 15);
    }

    return Math.min(score, maxScore);
  }
}