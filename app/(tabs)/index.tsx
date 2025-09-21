import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  withSpring,
  withDelay,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { 
  Search,
  Filter,
  MapPin,
  Briefcase,
  TrendingUp,
  Award,
  Bell,
  ArrowRight,
  Building,
  Clock,
  DollarSign,
  Star,
  Heart,
  Share2,
  Eye,
  Plus,
  Zap,
  Target,
  Users,
  Sparkles,
  ChevronRight,
  Calendar,
  BookOpen,
  MessageSquare,
  Settings,
  User,
  FileText,
  MessageCircle
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows, Timing } from '@/constants/Spacing';

const { width, height } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Mock data for featured jobs
const featuredJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow Solutions',
    location: 'Cape Town, WC',
    salary: 'R65,000 - R85,000',
    type: 'Full-time',
    posted: '2 days ago',
    logo: '🚀',
    featured: true,
    matchScore: 95,
    skills: ['React', 'TypeScript', 'Node.js'],
    applicants: 23,
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    location: 'Johannesburg, GP',
    salary: 'R45,000 - R60,000',
    type: 'Full-time',
    posted: '1 day ago',
    logo: '🎨',
    featured: true,
    matchScore: 88,
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    applicants: 15,
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Remote',
    salary: 'R70,000 - R95,000',
    type: 'Full-time',
    posted: '3 days ago',
    logo: '📊',
    featured: false,
    matchScore: 82,
    skills: ['Python', 'Machine Learning', 'SQL'],
    applicants: 31,
  },
];

// Mock data for quick stats
const quickStats = [
  { label: 'Active Jobs', value: '2,847', change: '+12%', trend: 'up' },
  { label: 'New This Week', value: '156', change: '+8%', trend: 'up' },
  { label: 'Your Applications', value: '7', change: '2 pending', trend: 'neutral' },
  { label: 'Profile Views', value: '43', change: '+15%', trend: 'up' },
];

// Mock data for recommended actions
const recommendedActions = [
  {
    id: '1',
    title: 'Complete Your Profile',
    description: 'Add your skills and experience to get better job matches',
    progress: 75,
    action: 'Complete Now',
    icon: User,
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'Practice Interview Skills',
    description: 'Improve your interview performance with AI coaching',
    progress: 0,
    action: 'Start Practice',
    icon: MessageSquare,
    color: Colors.secondary,
  },
  {
    id: '3',
    title: 'Update Your CV',
    description: 'Generate a professional CV with our AI assistant',
    progress: 100,
    action: 'View CV',
    icon: FileText,
    color: Colors.accent,
  },
];

const AnimatedCard = ({ children, delay = 0, style = {} }: any) => {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const animate = () => {
      scale.value = withDelay(delay, withSpring(1, Timing.spring));
      opacity.value = withDelay(delay, withTiming(1, { duration: Timing.normal }));
      translateY.value = withDelay(delay, withSpring(0, Timing.spring));
    };
    animate();
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const quickActions = [
  {
    id: 1,
    title: 'Generate CV',
    description: 'Create professional CV with AI',
    icon: FileText,
    route: '/(tabs)/cv',
    color: '#007BFF',
  },
  {
    id: 2,
    title: 'Practice Interview',
    description: 'AI-powered interview coaching',
    icon: MessageCircle,
    route: '/(tabs)/interview',
    color: '#28A745',
  },
  {
    id: 3,
    title: 'Find Jobs',
    description: 'Browse curated opportunities',
    icon: Briefcase,
    route: '/(tabs)/jobs',
    color: '#FFC107',
  },
  {
    id: 4,
    title: 'Update Profile',
    description: 'Keep your profile current',
    icon: Users,
    route: '/(tabs)/profile',
    color: '#DC3545',
  },
];

export default function DashboardScreen() {
  const rotation = useSharedValue(0);
  const largeRotation = useSharedValue(0);

  React.useEffect(() => {
    // Small header logo rotation
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000 }), // 10 seconds for one full rotation
      -1, // infinite repeat
      false
    );

    // Large hero logo rotation
    largeRotation.value = withRepeat(
      withTiming(360, { duration: 15000 }), // 15 seconds for one full rotation (slower)
      -1, // infinite repeat
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const largeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${largeRotation.value}deg` }],
    };
  });

  const handleQuickAction = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.name}>Welcome to JobSpark!</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#212529" />
              </TouchableOpacity>
              <Animated.View style={[styles.spinningLogo, animatedStyle]}>
                <Image
                  source={require('../../assets/images/black_circle_360x360.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Hero Section with Large Logo */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Sparkles size={48} color="#007BFF" />
              </View>
              <Text style={styles.logoText}>JobSpark</Text>
            </View>
            
            <Text style={styles.headline}>Land Your Dream Job</Text>
            <Text style={styles.valueProposition}>
              AI-powered career readiness platform designed to guide you through every step of your job application journey.
            </Text>
          </View>

          {/* Large Spinning Logo */}
          <View style={styles.largeLogo}>
            <Animated.View style={[styles.largeSpinningLogo, largeAnimatedStyle]}>
              <Image
                source={require('../../assets/images/black_circle_360x360.png')}
                style={styles.largeLogoImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
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
        </View>

        {/* Career Readiness Score */}
        <View style={styles.readinessCard}>
          <View style={styles.readinessHeader}>
            <View style={styles.readinessHeaderLeft}>
              <Sparkles size={24} color="#007BFF" />
              <Text style={styles.readinessTitle}>Career Readiness Score</Text>
            </View>
          </View>
          
          <View style={styles.readinessContent}>
            <View style={styles.scoreSection}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreValue}>75</Text>
                <Text style={styles.scoreLabel}>Good</Text>
              </View>
              
              <View style={styles.scoreStats}>
                <View style={styles.statItem}>
                  <TrendingUp size={20} color="#28A745" />
                  <Text style={styles.statLabel}>Improving</Text>
                </View>
                <View style={styles.statItem}>
                  <Target size={20} color="#007BFF" />
                  <Text style={styles.statLabel}>On Track</Text>
                </View>
                <View style={styles.statItem}>
                  <Award size={20} color="#FFC107" />
                  <Text style={styles.statValue}>250</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action.route)}
              >
                <View style={[styles.quickActionContent, { borderLeftColor: action.color }]}>
                  <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                    <action.icon size={28} color={action.color} />
                  </View>
                  <View style={styles.quickActionText}>
                    <Text style={styles.quickActionTitle}>{action.title}</Text>
                    <Text style={styles.quickActionDescription}>{action.description}</Text>
                  </View>
                  <ArrowRight size={20} color="#ADB5BD" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Everything you need to succeed</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Sparkles size={24} color="#007BFF" />
              </View>
              <Text style={styles.featureTitle}>AI-Powered CV Generation</Text>
              <Text style={styles.featureDescription}>Create professional CVs in minutes</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Target size={24} color="#007BFF" />
              </View>
              <Text style={styles.featureTitle}>Interview Coaching</Text>
              <Text style={styles.featureDescription}>Practice with AI-powered feedback</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Users size={24} color="#007BFF" />
              </View>
              <Text style={styles.featureTitle}>Direct Employer Connections</Text>
              <Text style={styles.featureDescription}>Connect with South African companies</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Zap size={24} color="#007BFF" />
              </View>
              <Text style={styles.featureTitle}>Career Readiness Score</Text>
              <Text style={styles.featureDescription}>Track your job application progress</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#6C757D',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinningLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  heroSection: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 24,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#212529',
  },
  valueProposition: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  largeLogo: {
    position: 'absolute',
    top: 20,
    right: -40,
    zIndex: 0,
  },
  largeSpinningLogo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.15,
  },
  largeLogoImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  imageContainer: {
    height: 200,
    marginVertical: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  readinessCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  readinessHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readinessTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  readinessContent: {
    flexDirection: 'row',
    gap: 24,
  },
  scoreSection: {
    alignItems: 'center',
    flex: 1,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#28A745',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#28A745',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  scoreStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  quickActionsGrid: {
    paddingHorizontal: 24,
    gap: 8,
  },
  quickActionCard: {
    marginBottom: 8,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  featuresSection: {
    paddingHorizontal: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#212529',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: '#212529',
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});