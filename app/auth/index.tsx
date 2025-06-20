import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Sparkles, Target, Users, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered CV Generation',
    description: 'Create professional CVs in minutes',
  },
  {
    icon: Target,
    title: 'Interview Coaching',
    description: 'Practice with AI-powered feedback',
  },
  {
    icon: Users,
    title: 'Direct Employer Connections',
    description: 'Connect with South African companies',
  },
  {
    icon: Zap,
    title: 'Career Readiness Score',
    description: 'Track your job application progress',
  },
];

export default function AuthWelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Sparkles size={48} color={Colors.primary} />
            </View>
            <Text style={styles.logoText}>JobSpark</Text>
          </View>
          
          <Text style={styles.headline}>Land Your Dream Job</Text>
          <Text style={styles.valueProposition}>
            AI-powered career readiness platform designed to guide you through every step of your job application journey in South Africa.
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Everything you need to succeed</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <feature.icon size={24} color={Colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button
          title="Get Started"
          onPress={() => router.push('/auth/signup')}
          style={styles.primaryButton}
        />
        <Button
          title="I already have an account"
          onPress={() => router.push('/auth/login')}
          variant="ghost"
          style={styles.secondaryButton}
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  headline: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  valueProposition: {
    ...Typography.body1,
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
    paddingHorizontal: Spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.25,
    marginVertical: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  featuresSection: {
    flex: 1,
  },
  featuresTitle: {
    ...Typography.h4,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: Colors.text,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    ...Typography.body2,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
    color: Colors.text,
  },
  featureDescription: {
    ...Typography.caption,
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  actionSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  primaryButton: {
    marginBottom: Spacing.md,
  },
  secondaryButton: {
    marginBottom: Spacing.sm,
  },
});