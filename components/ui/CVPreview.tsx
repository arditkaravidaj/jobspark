import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface CVData {
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

interface CVPreviewProps {
  data: CVData;
  template: 'modern' | 'classic' | 'creative' | 'minimal';
  primaryColor?: string;
  style?: ViewStyle;
}

export function CVPreview({ 
  data, 
  template = 'modern', 
  primaryColor = Colors.primary,
  style 
}: CVPreviewProps) {
  const renderHeader = () => (
    <View style={[styles.header, { borderBottomColor: primaryColor }]}>
      <Text style={[styles.name, { color: primaryColor }]}>
        {data.personalInfo.firstName} {data.personalInfo.lastName}
      </Text>
      <Text style={styles.title}>Professional Title</Text>
      
      <View style={styles.contactInfo}>
        <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
        <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
        <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: primaryColor }]}>
        Professional Summary
      </Text>
      <Text style={styles.summaryText}>
        {data.personalInfo.summary || 'Professional summary will be displayed here based on your profile information and career objectives.'}
      </Text>
    </View>
  );

  const renderWorkExperience = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: primaryColor }]}>
        Work Experience
      </Text>
      {data.workExperience.length > 0 ? (
        data.workExperience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
              <Text style={styles.dateRange}>
                {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
              </Text>
            </View>
            <Text style={styles.company}>{exp.company} • {exp.location}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.placeholderText}>
          Work experience will be displayed here based on your profile.
        </Text>
      )}
    </View>
  );

  const renderEducation = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: primaryColor }]}>
        Education
      </Text>
      {data.education.length > 0 ? (
        data.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.educationHeader}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.dateRange}>
                {edu.startDate} - {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
              </Text>
            </View>
            <Text style={styles.institution}>{edu.institution}</Text>
            {edu.fieldOfStudy && (
              <Text style={styles.fieldOfStudy}>{edu.fieldOfStudy}</Text>
            )}
            {edu.grade && (
              <Text style={styles.grade}>Grade: {edu.grade}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.placeholderText}>
          Education information will be displayed here based on your profile.
        </Text>
      )}
    </View>
  );

  const renderSkills = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: primaryColor }]}>
        Skills & Competencies
      </Text>
      
      {data.skills.technical.length > 0 && (
        <View style={styles.skillCategory}>
          <Text style={styles.skillCategoryTitle}>Technical Skills</Text>
          <View style={styles.skillTags}>
            {data.skills.technical.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { borderColor: primaryColor }]}>
                <Text style={[styles.skillText, { color: primaryColor }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {data.skills.soft.length > 0 && (
        <View style={styles.skillCategory}>
          <Text style={styles.skillCategoryTitle}>Soft Skills</Text>
          <View style={styles.skillTags}>
            {data.skills.soft.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { borderColor: primaryColor }]}>
                <Text style={[styles.skillText, { color: primaryColor }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {data.skills.languages.length > 0 && (
        <View style={styles.skillCategory}>
          <Text style={styles.skillCategoryTitle}>Languages</Text>
          <View style={styles.skillTags}>
            {data.skills.languages.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { borderColor: primaryColor }]}>
                <Text style={[styles.skillText, { color: primaryColor }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {data.skills.technical.length === 0 && data.skills.soft.length === 0 && data.skills.languages.length === 0 && (
        <Text style={styles.placeholderText}>
          Skills and competencies will be displayed here based on your profile.
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, style]} showsVerticalScrollIndicator={false}>
      <View style={styles.cvContent}>
        {renderHeader()}
        {renderSummary()}
        {renderWorkExperience()}
        {renderEducation()}
        {renderSkills()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cvContent: {
    padding: Spacing.xl,
  },
  header: {
    borderBottomWidth: 2,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  name: {
    ...Typography.h1,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.h4,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  contactItem: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    ...Typography.body1,
    lineHeight: 24,
    color: Colors.text,
  },
  experienceItem: {
    marginBottom: Spacing.lg,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  jobTitle: {
    ...Typography.h5,
    fontWeight: 'bold',
    flex: 1,
  },
  dateRange: {
    ...Typography.body2,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  company: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body2,
    lineHeight: 20,
    color: Colors.text,
  },
  educationItem: {
    marginBottom: Spacing.lg,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  degree: {
    ...Typography.h5,
    fontWeight: 'bold',
    flex: 1,
  },
  institution: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  fieldOfStudy: {
    ...Typography.body2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  grade: {
    ...Typography.body2,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  skillCategory: {
    marginBottom: Spacing.md,
  },
  skillCategoryTitle: {
    ...Typography.body1,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    color: Colors.text,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillTag: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  skillText: {
    ...Typography.body2,
    fontWeight: '500',
  },
  placeholderText: {
    ...Typography.body2,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
});