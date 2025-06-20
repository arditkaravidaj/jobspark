import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Sparkles, Target, Users, Zap, FileText, MessageCircle, Briefcase, TrendingUp, Award, ArrowRight, Play, CircleCheck as CheckCircle, Star, Globe, Shield, Clock } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered CV Generation',
    description: 'Create professional CVs in minutes with intelligent content optimization',
  },
  {
    icon: Target,
    title: 'Interview Coaching',
    description: 'Practice with AI-powered feedback and real-time performance analytics',
  },
  {
    icon: Users,
    title: 'Direct Employer Connections',
    description: 'Connect with South African companies actively hiring',
  },
  {
    icon: Zap,
    title: 'Career Readiness Score',
    description: 'Track your job application progress with AI-driven insights',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    company: 'TechCorp SA',
    quote: 'JobSpark helped me land my dream job in just 3 weeks. The AI coaching was incredible!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    company: 'Digital Agency',
    quote: 'The CV builder created a professional resume that got me 5 interviews in one week.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Data Analyst',
    company: 'FinTech Solutions',
    quote: 'Interview practice sessions boosted my confidence and improved my success rate.',
    rating: 5,
  },
];

const stats = [
  { value: '10,000+', label: 'Job Seekers Helped' },
  { value: '500+', label: 'Partner Companies' },
  { value: '85%', label: 'Success Rate' },
  { value: '4.9/5', label: 'User Rating' },
];

export default function MarketingHomepage() {
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

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.navigation}>
          <View style={styles.navContent}>
            <View style={styles.logo}>
              <Sparkles size={32} color="#007BFF" />
              <Text style={styles.logoText}>JobSpark</Text>
            </View>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signupButton} onPress={handleGetStarted}>
                <Text style={styles.signupButtonText}>Get Started</Text>
              </TouchableOpacity>
              <Animated.View style={[styles.navSpinningLogo, animatedStyle]}>
                <Image
                  source={require('../assets/images/black_circle_360x360.png')}
                  style={styles.navLogoImage}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Land Your Dream Job with{'\n'}
              <Text style={styles.heroTitleAccent}>AI-Powered Career Tools</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Join thousands of South African job seekers who've accelerated their careers with our intelligent platform. Get personalized CV generation, interview coaching, and direct employer connections.
            </Text>
            
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.primaryCTA} onPress={handleGetStarted}>
                <Text style={styles.primaryCTAText}>Start Your Journey</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryCTA}>
                <Play size={20} color="#007BFF" />
                <Text style={styles.secondaryCTAText}>Watch Demo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.trustIndicators}>
              <Text style={styles.trustText}>Trusted by professionals at</Text>
              <View style={styles.companyLogos}>
                <Text style={styles.companyName}>TechCorp</Text>
                <Text style={styles.companyName}>FinanceHub</Text>
                <Text style={styles.companyName}>StartupCo</Text>
                <Text style={styles.companyName}>MediaGroup</Text>
              </View>
            </View>
          </View>

          {/* Large Spinning Logo */}
          <View style={styles.heroLargeLogo}>
            <Animated.View style={[styles.heroLargeSpinningLogo, largeAnimatedStyle]}>
              <Image
                source={require('../assets/images/black_circle_360x360.png')}
                style={styles.heroLargeLogoImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          <View style={styles.heroImageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroImageOverlay} />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Everything You Need to Succeed</Text>
            <Text style={styles.sectionSubtitle}>
              Our comprehensive platform provides all the tools you need to land your next role
            </Text>
          </View>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <feature.icon size={32} color="#007BFF" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How JobSpark Works</Text>
          <Text style={styles.sectionSubtitle}>
            Get job-ready in three simple steps
          </Text>

          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Build Your Profile</Text>
              <Text style={styles.stepDescription}>
                Complete your professional profile with our guided setup process
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Practice & Prepare</Text>
              <Text style={styles.stepDescription}>
                Use AI-powered tools to create CVs and practice interviews
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Apply & Succeed</Text>
              <Text style={styles.stepDescription}>
                Apply to curated job opportunities and track your progress
              </Text>
            </View>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          <Text style={styles.sectionSubtitle}>
            See how JobSpark has transformed careers across South Africa
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialsScroll}
            contentContainerStyle={styles.testimonialsContent}
          >
            {testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} color="#FFC107" fill="#FFC107" />
                  ))}
                </View>
                <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
                <View style={styles.testimonialAuthor}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>
                    {testimonial.role} at {testimonial.company}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Ready to Transform Your Career?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of successful job seekers who've found their dream roles with JobSpark
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
              <Text style={styles.ctaButtonText}>Access the App Now</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.ctaNote}>Free to start • No credit card required</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <Sparkles size={24} color="#007BFF" />
              <Text style={styles.footerLogoText}>JobSpark</Text>
            </View>
            <Text style={styles.footerDescription}>
              Empowering South African professionals to achieve their career goals through AI-powered tools and personalized guidance.
            </Text>
            <View style={styles.footerFeatures}>
              <View style={styles.footerFeature}>
                <Shield size={16} color="#28A745" />
                <Text style={styles.footerFeatureText}>Secure & Private</Text>
              </View>
              <View style={styles.footerFeature}>
                <Globe size={16} color="#28A745" />
                <Text style={styles.footerFeatureText}>South Africa Focused</Text>
              </View>
              <View style={styles.footerFeature}>
                <Clock size={16} color="#28A745" />
                <Text style={styles.footerFeatureText}>24/7 Support</Text>
              </View>
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
    backgroundColor: '#FFFFFF',
  },
  navigation: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  signupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  signupButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navSpinningLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLogoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212529',
    marginBottom: 16,
    lineHeight: 44,
  },
  heroTitleAccent: {
    color: '#007BFF',
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#007BFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryCTAText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
    gap: 8,
  },
  secondaryCTAText: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: '600',
  },
  trustIndicators: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  companyLogos: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    color: '#ADB5BD',
    fontWeight: '600',
  },
  heroLargeLogo: {
    position: 'absolute',
    top: 20,
    right: -40,
    zIndex: 0,
  },
  heroLargeSpinningLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.12,
  },
  heroLargeLogoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  heroImageContainer: {
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  statsSection: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
    minWidth: '20%',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  featuresSection: {
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212529',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 28,
    paddingHorizontal: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#212529',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 20,
  },
  howItWorksSection: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  stepsContainer: {
    marginTop: 48,
    gap: 32,
    width: '100%',
    maxWidth: 600,
  },
  step: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212529',
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 24,
  },
  testimonialsSection: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  testimonialsScroll: {
    marginTop: 48,
  },
  testimonialsContent: {
    paddingHorizontal: 24,
  },
  testimonialCard: {
    width: 300,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    marginRight: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  testimonialQuote: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 16,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#6C757D',
  },
  ctaSection: {
    backgroundColor: '#007BFF',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  ctaButtonText: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: '600',
  },
  ctaNote: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  footer: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  footerDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  footerFeatures: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerFeatureText: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 32,
  },
});