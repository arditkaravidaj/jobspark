import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProfile } from '@/hooks/useProfile';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  MapPin,
  Phone,
  Calendar,
  Building,
  BookOpen,
  Star
} from 'lucide-react-native';

// Form data interfaces
interface PersonalDetails {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  summary: string;
}

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying: boolean;
  grade: string;
}

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface FormData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
}

const STEPS = [
  {
    id: 1,
    title: 'Personal Details',
    subtitle: 'Tell us about yourself',
    icon: User,
    description: 'Basic information to get started',
  },
  {
    id: 2,
    title: 'Work Experience',
    subtitle: 'Your professional journey',
    icon: Briefcase,
    description: 'Add your work history and achievements',
  },
  {
    id: 3,
    title: 'Education',
    subtitle: 'Your academic background',
    icon: GraduationCap,
    description: 'Include your qualifications and certifications',
  },
  {
    id: 4,
    title: 'Skills & Languages',
    subtitle: 'What makes you unique',
    icon: Award,
    description: 'Highlight your technical and soft skills',
  },
];

export default function ProfileSetupScreen() {
  const { saveProfile, saving } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
  });

  const currentStepData = STEPS.find(step => step.id === currentStep)!;
  const progress = currentStep / STEPS.length;
  const IconComponent = currentStepData.icon;

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.personalDetails.firstName && formData.personalDetails.lastName);
      case 2:
        return true; // Work experience is optional
      case 3:
        return true; // Education is optional
      case 4:
        return true; // Skills are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      Alert.alert('Required Fields', 'Please fill in all required fields before continuing.');
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) {
      Alert.alert('Required Fields', 'Please fill in all required fields before completing.');
      return;
    }

    try {
      // Transform form data to match the expected format
      const profileData = {
        personalDetails: {
          firstName: formData.personalDetails.firstName,
          lastName: formData.personalDetails.lastName,
          phone: formData.personalDetails.phone,
          location: formData.personalDetails.location,
          dateOfBirth: formData.personalDetails.dateOfBirth,
          summary: formData.personalDetails.summary,
        },
        workExperience: formData.workExperience.map(exp => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrentRole: exp.isCurrentRole,
          description: exp.description,
        })),
        education: formData.education.map(edu => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: edu.startDate,
          endDate: edu.endDate,
          isCurrentlyStudying: edu.isCurrentlyStudying,
          grade: edu.grade,
        })),
        skills: formData.skills,
      };

      await saveProfile(profileData);
      
      Alert.alert(
        'Profile Complete! 🎉',
        'Your professional profile has been created successfully. Welcome to JobSpark!',
        [
          {
            text: 'Continue to Dashboard',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save profile. Please try again.');
    }
  };

  const updatePersonalDetails = (field: keyof PersonalDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value,
      },
    }));
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
    };
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false,
      grade: '',
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], skill.trim()],
        },
      }));
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep 
          data={formData.personalDetails} 
          onUpdate={updatePersonalDetails} 
        />;
      case 2:
        return <WorkExperienceStep 
          data={formData.workExperience}
          onAdd={addWorkExperience}
          onUpdate={updateWorkExperience}
          onRemove={removeWorkExperience}
        />;
      case 3:
        return <EducationStep 
          data={formData.education}
          onAdd={addEducation}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />;
      case 4:
        return <SkillsStep 
          data={formData.skills}
          onAdd={addSkill}
          onRemove={removeSkill}
        />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.progressSection}>
            <ProgressBar progress={progress} style={styles.progressBar} />
            <Text style={styles.stepIndicator}>
              Step {currentStep} of {STEPS.length}
            </Text>
          </View>
        </View>

        {/* Step Header */}
        <View style={styles.stepHeader}>
          <View style={styles.stepIconContainer}>
            <IconComponent size={32} color={Colors.primary} />
          </View>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepSubtitle}>{currentStepData.subtitle}</Text>
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderStepContent()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={currentStep === STEPS.length ? "Complete Profile" : "Next"}
            onPress={handleNext}
            loading={saving}
            style={styles.nextButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Step Components
function PersonalDetailsStep({ 
  data, 
  onUpdate 
}: { 
  data: PersonalDetails; 
  onUpdate: (field: keyof PersonalDetails, value: string) => void;
}) {
  return (
    <View style={styles.stepContent}>
      <Card style={styles.formCard}>
        <View style={styles.formRow}>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={data.firstName}
            onChangeText={(value) => onUpdate('firstName', value)}
            required
            containerStyle={styles.halfInput}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={data.lastName}
            onChangeText={(value) => onUpdate('lastName', value)}
            required
            containerStyle={styles.halfInput}
          />
        </View>

        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          value={data.phone}
          onChangeText={(value) => onUpdate('phone', value)}
          keyboardType="phone-pad"
        />

        <Input
          label="Location"
          placeholder="City, Province"
          value={data.location}
          onChangeText={(value) => onUpdate('location', value)}
        />

        <Input
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          value={data.dateOfBirth}
          onChangeText={(value) => onUpdate('dateOfBirth', value)}
        />

        <Input
          label="Professional Summary"
          placeholder="Brief description of your career goals and experience..."
          value={data.summary}
          onChangeText={(value) => onUpdate('summary', value)}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
      </Card>
    </View>
  );
}

function WorkExperienceStep({ 
  data, 
  onAdd, 
  onUpdate, 
  onRemove 
}: { 
  data: WorkExperience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof WorkExperience, value: any) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <View style={styles.stepContent}>
      {data.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Briefcase size={48} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No work experience added yet</Text>
          <Text style={styles.emptyDescription}>
            Add your professional experience to showcase your career journey
          </Text>
        </Card>
      ) : (
        data.map((experience) => (
          <Card key={experience.id} style={styles.formCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Work Experience</Text>
              <TouchableOpacity 
                onPress={() => onRemove(experience.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <Input
              label="Job Title"
              placeholder="e.g. Software Developer"
              value={experience.jobTitle}
              onChangeText={(value) => onUpdate(experience.id, 'jobTitle', value)}
              required
            />

            <Input
              label="Company"
              placeholder="e.g. ABC Tech Solutions"
              value={experience.company}
              onChangeText={(value) => onUpdate(experience.id, 'company', value)}
              required
            />

            <Input
              label="Location"
              placeholder="City, Province"
              value={experience.location}
              onChangeText={(value) => onUpdate(experience.id, 'location', value)}
            />

            <View style={styles.formRow}>
              <Input
                label="Start Date"
                placeholder="MM/YYYY"
                value={experience.startDate}
                onChangeText={(value) => onUpdate(experience.id, 'startDate', value)}
                containerStyle={styles.halfInput}
              />
              <Input
                label="End Date"
                placeholder="MM/YYYY"
                value={experience.endDate}
                onChangeText={(value) => onUpdate(experience.id, 'endDate', value)}
                containerStyle={styles.halfInput}
                editable={!experience.isCurrentRole}
              />
            </View>

            <TouchableOpacity 
              style={styles.checkboxRow}
              onPress={() => onUpdate(experience.id, 'isCurrentRole', !experience.isCurrentRole)}
            >
              <View style={[
                styles.checkbox, 
                experience.isCurrentRole && styles.checkboxChecked
              ]}>
                {experience.isCurrentRole && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>I currently work here</Text>
            </TouchableOpacity>

            <Input
              label="Description"
              placeholder="Describe your responsibilities and achievements..."
              value={experience.description}
              onChangeText={(value) => onUpdate(experience.id, 'description', value)}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          </Card>
        ))
      )}

      <Button
        title="Add Work Experience"
        onPress={onAdd}
        variant="outline"
        style={styles.addButton}
      />
    </View>
  );
}

function EducationStep({ 
  data, 
  onAdd, 
  onUpdate, 
  onRemove 
}: { 
  data: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, value: any) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <View style={styles.stepContent}>
      {data.length === 0 ? (
        <Card style={styles.emptyCard}>
          <GraduationCap size={48} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No education added yet</Text>
          <Text style={styles.emptyDescription}>
            Add your educational background and qualifications
          </Text>
        </Card>
      ) : (
        data.map((education) => (
          <Card key={education.id} style={styles.formCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Education</Text>
              <TouchableOpacity 
                onPress={() => onRemove(education.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <Input
              label="Institution"
              placeholder="e.g. University of Cape Town"
              value={education.institution}
              onChangeText={(value) => onUpdate(education.id, 'institution', value)}
              required
            />

            <Input
              label="Degree"
              placeholder="e.g. Bachelor of Science"
              value={education.degree}
              onChangeText={(value) => onUpdate(education.id, 'degree', value)}
              required
            />

            <Input
              label="Field of Study"
              placeholder="e.g. Computer Science"
              value={education.fieldOfStudy}
              onChangeText={(value) => onUpdate(education.id, 'fieldOfStudy', value)}
            />

            <View style={styles.formRow}>
              <Input
                label="Start Date"
                placeholder="MM/YYYY"
                value={education.startDate}
                onChangeText={(value) => onUpdate(education.id, 'startDate', value)}
                containerStyle={styles.halfInput}
              />
              <Input
                label="End Date"
                placeholder="MM/YYYY"
                value={education.endDate}
                onChangeText={(value) => onUpdate(education.id, 'endDate', value)}
                containerStyle={styles.halfInput}
                editable={!education.isCurrentlyStudying}
              />
            </View>

            <TouchableOpacity 
              style={styles.checkboxRow}
              onPress={() => onUpdate(education.id, 'isCurrentlyStudying', !education.isCurrentlyStudying)}
            >
              <View style={[
                styles.checkbox, 
                education.isCurrentlyStudying && styles.checkboxChecked
              ]}>
                {education.isCurrentlyStudying && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>I'm currently studying here</Text>
            </TouchableOpacity>

            <Input
              label="Grade/GPA"
              placeholder="e.g. Distinction, 3.8 GPA"
              value={education.grade}
              onChangeText={(value) => onUpdate(education.id, 'grade', value)}
            />
          </Card>
        ))
      )}

      <Button
        title="Add Education"
        onPress={onAdd}
        variant="outline"
        style={styles.addButton}
      />
    </View>
  );
}

function SkillsStep({ 
  data, 
  onAdd, 
  onRemove 
}: { 
  data: Skills;
  onAdd: (category: keyof Skills, skill: string) => void;
  onRemove: (category: keyof Skills, index: number) => void;
}) {
  const [newSkills, setNewSkills] = useState({
    technical: '',
    soft: '',
    languages: '',
  });

  const handleAddSkill = (category: keyof Skills) => {
    const skill = newSkills[category];
    if (skill.trim()) {
      onAdd(category, skill);
      setNewSkills(prev => ({ ...prev, [category]: '' }));
    }
  };

  const SkillCategory = ({ 
    title, 
    category, 
    placeholder, 
    icon: Icon 
  }: { 
    title: string; 
    category: keyof Skills; 
    placeholder: string;
    icon: any;
  }) => (
    <Card style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Icon size={24} color={Colors.primary} />
        <Text style={styles.skillTitle}>{title}</Text>
      </View>

      <View style={styles.skillInputRow}>
        <Input
          placeholder={placeholder}
          value={newSkills[category]}
          onChangeText={(value) => setNewSkills(prev => ({ ...prev, [category]: value }))}
          containerStyle={styles.skillInput}
          onSubmitEditing={() => handleAddSkill(category)}
        />
        <Button
          title="Add"
          onPress={() => handleAddSkill(category)}
          size="small"
          style={styles.addSkillButton}
        />
      </View>

      <View style={styles.skillTags}>
        {data[category].map((skill, index) => (
          <TouchableOpacity
            key={index}
            style={styles.skillTag}
            onPress={() => onRemove(category, index)}
          >
            <Text style={styles.skillTagText}>{skill}</Text>
            <Text style={styles.skillTagRemove}>×</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  return (
    <View style={styles.stepContent}>
      <SkillCategory
        title="Technical Skills"
        category="technical"
        placeholder="e.g. JavaScript, Python, React"
        icon={Award}
      />

      <SkillCategory
        title="Soft Skills"
        category="soft"
        placeholder="e.g. Leadership, Communication"
        icon={Star}
      />

      <SkillCategory
        title="Languages"
        category="languages"
        placeholder="e.g. English, Afrikaans, Zulu"
        icon={BookOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    flex: 1,
  },
  progressBar: {
    marginBottom: Spacing.xs,
  },
  stepIndicator: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  stepHeader: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  stepIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  stepTitle: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  stepSubtitle: {
    ...Typography.h5,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepDescription: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  stepContent: {
    paddingBottom: Spacing.xl,
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  formRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.h5,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.h5,
  },
  removeButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  removeButtonText: {
    ...Typography.body2,
    color: Colors.error,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 4,
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  addButton: {
    marginTop: Spacing.md,
  },
  skillCard: {
    marginBottom: Spacing.lg,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  skillTitle: {
    ...Typography.h5,
  },
  skillInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  skillInput: {
    flex: 1,
    marginBottom: 0,
  },
  addSkillButton: {
    marginBottom: Spacing.md,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    gap: Spacing.xs,
  },
  skillTagText: {
    ...Typography.body2,
    color: Colors.text,
  },
  skillTagRemove: {
    ...Typography.body2,
    color: Colors.textLight,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  nextButton: {
    width: '100%',
  },
});