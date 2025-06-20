import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Sparkles, Target, Users, Zap } from 'lucide-react-native';

const onboardingSteps = [
  {
    title: "Welcome to JobSpark",
    subtitle: "Land Your Dream Job",
    description: "AI-powered career readiness platform designed to guide you through every step of your job application journey.",
    icon: Sparkles,
  },
  {
    title: "Build Your Profile",
    subtitle: "Tell Us About Yourself",
    description: "Create a comprehensive profile that showcases your skills, experience, and career aspirations.",
    icon: Target,
  },
  {
    title: "AI-Powered Tools",
    subtitle: "Smart Career Assistance",
    description: "Get personalized CV generation, interview coaching, and application guidance powered by AI.",
    icon: Zap,
  },
  {
    title: "Connect with Employers",
    subtitle: "Stand Out from the Crowd",
    description: "Access curated job opportunities and connect directly with South African companies looking for talent.",
    icon: Users,
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const currentStepData = onboardingSteps[currentStep];
  const progress = (currentStep + 1) / onboardingSteps.length;
  const IconComponent = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Onboarding',
      'Are you sure you want to skip the introduction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: () => router.replace('/(tabs)') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ProgressBar progress={progress} style={styles.progressBar} />
        <Text style={styles.stepIndicator}>
          {currentStep + 1} of {onboardingSteps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            <IconComponent size={64} color={Colors.primary} />
          </View>
          
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </Card>

        <View style={styles.features}>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>
              AI-powered CV generation
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>
              Interactive interview coaching
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>
              Gamified career readiness
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>
              Direct employer connections
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Skip"
          onPress={handleSkip}
          variant="ghost"
          style={styles.skipButton}
        />
        <Button
          title={currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  progressBar: {
    marginBottom: Spacing.sm,
  },
  stepIndicator: {
    ...Typography.caption,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  card: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.h4,
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body1,
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  features: {
    marginBottom: Spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
  },
  featureText: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});