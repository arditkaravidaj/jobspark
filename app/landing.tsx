import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
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
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { 
  Sparkles, 
  Target, 
  Users, 
  Zap, 
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Menu,
  X
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Color Palette - Sophisticated gradient-based theme
const colors = {
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#EC4899', // Pink
  secondaryLight: '#F472B6',
  accent: '#06B6D4', // Cyan
  accentLight: '#67E8F9',
  background: '#0F172A', // Slate 900
  surface: '#1E293B', // Slate 800
  surfaceLight: '#334155', // Slate 700
  text: '#F8FAFC', // Slate 50
  textSecondary: '#CBD5E1', // Slate 300
  textMuted: '#64748B', // Slate 500
  success: '#10B981',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    company: 'TechCorp SA',
    quote: 'JobSpark transformed my career search. The AI coaching helped me land my dream job in just 3 weeks!',
    rating: 5,
    avatar: '👩‍💻',
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    company: 'Digital Agency',
    quote: 'The CV builder created a professional resume that got me 5 interviews in one week. Incredible results!',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Priya Patel',
    role: 'Data Analyst',
    company: 'FinTech Solutions',
    quote: 'Interview practice sessions boosted my confidence and improved my success rate dramatically.',
    rating: 5,
    avatar: '👩‍🔬',
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered CV Generation',
    description: 'Create professional CVs in minutes with intelligent content optimization and ATS-friendly formatting.',
    color: colors.primary,
  },
  {
    icon: Target,
    title: 'Smart Interview Coaching',
    description: 'Practice with AI-powered feedback, real-time performance analytics, and personalized improvement tips.',
    color: colors.secondary,
  },
  {
    icon: Users,
    title: 'Direct Employer Connections',
    description: 'Connect with South African companies actively hiring and get matched with relevant opportunities.',
    color: colors.accent,
  },
  {
    icon: Zap,
    title: 'Career Readiness Score',
    description: 'Track your job application progress with AI-driven insights and actionable recommendations.',
    color: colors.success,
  },
];

const stats = [
  { value: '10,000+', label: 'Job Seekers Helped' },
  { value: '500+', label: 'Partner Companies' },
  { value: '85%', label: 'Success Rate' },
  { value: '4.9/5', label: 'User Rating' },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Animation values
  const floatingAnimation = useSharedValue(0);
  const gradientAnimation = useSharedValue(0);
  const particleAnimation = useSharedValue(0);
  const heroScale = useSharedValue(0.8);
  const heroOpacity = useSharedValue(0);

  useEffect(() => {
    // Floating animation
    floatingAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    );

    // Gradient animation
    gradientAnimation.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      true
    );

    // Particle animation
    particleAnimation.value = withRepeat(
      withTiming(1, { duration: 20000 }),
      -1,
      false
    );

    // Hero entrance animation
    heroScale.value = withDelay(500, withTiming(1, { duration: 1000 }));
    heroOpacity.value = withDelay(300, withTiming(1, { duration: 1200 }));
  }, []);

  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(floatingAnimation.value, [0, 1], [0, -20]),
        },
      ],
    };
  });

  const gradientStyle = useAnimatedStyle(() => {
    const rotate = interpolate(gradientAnimation.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const heroAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heroScale.value }],
      opacity: heroOpacity.value,
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
      {/* Animated Background */}
      <View style={styles.backgroundContainer}>
        <Animated.View style={[styles.gradientOrb, styles.gradientOrb1, gradientStyle]} />
        <Animated.View style={[styles.gradientOrb, styles.gradientOrb2, gradientStyle]} />
        <Animated.View style={[styles.gradientOrb, styles.gradientOrb3, gradientStyle]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Navigation */}
        <View style={styles.navigation}>
          <View style={styles.navContent}>
            <View style={styles.logo}>
              <Sparkles size={32} color={colors.primary} />
              <Text style={styles.logoText}>JobSpark</Text>
            </View>
            
            {/* Desktop Navigation */}
            <View style={styles.navLinks}>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>Pricing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signupButton} onPress={handleGetStarted}>
                <Text style={styles.signupButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>

            {/* Mobile Menu Button */}
            <TouchableOpacity 
              style={styles.mobileMenuButton}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={24} color={colors.text} />
              ) : (
                <Menu size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>

          {/* Mobile Menu */}
          {menuOpen && (
            <View style={styles.mobileMenu}>
              <TouchableOpacity style={styles.mobileNavLink}>
                <Text style={styles.mobileNavLinkText}>Features</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavLink}>
                <Text style={styles.mobileNavLinkText}>Pricing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavLink}>
                <Text style={styles.mobileNavLinkText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileNavLink} onPress={handleLogin}>
                <Text style={styles.mobileNavLinkText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileSignupButton} onPress={handleGetStarted}>
                <Text style={styles.signupButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
          <Animated.View style={[styles.heroContent, floatingStyle]}>
            <View style={styles.heroBadge}>
              <Sparkles size={16} color={colors.primary} />
              <Text style={styles.heroBadgeText}>AI-Powered Career Platform</Text>
            </View>
            
            <Text style={styles.heroTitle}>
              Land Your Dream Job with{'\n'}
              <Text style={styles.heroTitleGradient}>Intelligent Career Tools</Text>
            </Text>
            
            <Text style={styles.heroSubtitle}>
              Join thousands of South African professionals who've accelerated their careers with our AI-powered platform. Get personalized CV generation, interview coaching, and direct employer connections.
            </Text>
            
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.primaryCTA} onPress={handleGetStarted}>
                <Text style={styles.primaryCTAText}>Start Your Journey</Text>
                <ArrowRight size={20} color={colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryCTA}>
                <Play size={20} color={colors.primary} />
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
          </Animated.View>
        </Animated.View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View key={index} style={[styles.statItem, floatingStyle]}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
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
              <Animated.View key={index} style={[styles.featureCard, floatingStyle]}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                  <feature.icon size={32} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Animated.View>
            ))}
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
              <Animated.View key={index} style={[styles.testimonialCard, floatingStyle]}>
                <View style={styles.testimonialHeader}>
                  <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                  <View style={styles.testimonialRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} color={colors.warning} fill={colors.warning} />
                    ))}
                  </View>
                </View>
                <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
                <View style={styles.testimonialAuthor}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>
                    {testimonial.role} at {testimonial.company}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Animated.View style={[styles.ctaContent, floatingStyle]}>
            <Text style={styles.ctaTitle}>Ready to Transform Your Career?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of successful job seekers who've found their dream roles with JobSpark
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
              <Text style={styles.ctaButtonText}>Get Started Now</Text>
              <ArrowRight size={20} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.ctaNote}>Free to start • No credit card required</Text>
          </Animated.View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <Sparkles size={24} color={colors.primary} />
              <Text style={styles.footerLogoText}>JobSpark</Text>
            </View>
            <Text style={styles.footerDescription}>
              Empowering South African professionals to achieve their career goals through AI-powered tools and personalized guidance.
            </Text>
            <View style={styles.footerFeatures}>
              <View style={styles.footerFeature}>
                <Shield size={16} color={colors.success} />
                <Text style={styles.footerFeatureText}>Secure & Private</Text>
              </View>
              <View style={styles.footerFeature}>
                <Globe size={16} color={colors.success} />
                <Text style={styles.footerFeatureText}>South Africa Focused</Text>
              </View>
              <View style={styles.footerFeature}>
                <Clock size={16} color={colors.success} />
                <Text style={styles.footerFeatureText}>24/7 Support</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.3,
  },
  gradientOrb1: {
    width: 400,
    height: 400,
    backgroundColor: colors.primary,
    top: -200,
    right: -200,
  },
  gradientOrb2: {
    width: 300,
    height: 300,
    backgroundColor: colors.secondary,
    bottom: -150,
    left: -150,
  },
  gradientOrb3: {
    width: 250,
    height: 250,
    backgroundColor: colors.accent,
    top: '50%',
    left: '50%',
    marginTop: -125,
    marginLeft: -125,
  },
  scrollView: {
    flex: 1,
  },
  navigation: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
    backgroundColor: `${colors.background}95`,
    backdropFilter: 'blur(10px)',
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
    color: colors.text,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    display: width > 768 ? 'flex' : 'none',
  },
  navLink: {
    paddingVertical: 8,
  },
  navLinkText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  signupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  signupButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  mobileMenuButton: {
    display: width > 768 ? 'none' : 'flex',
    padding: 8,
  },
  mobileMenu: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
    gap: 16,
  },
  mobileNavLink: {
    paddingVertical: 8,
  },
  mobileNavLinkText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  mobileSignupButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 800,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  heroBadgeText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 24,
    lineHeight: 56,
  },
  heroTitleGradient: {
    color: colors.primary,
  },
  heroSubtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 30,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 60,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryCTAText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  secondaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    gap: 8,
  },
  secondaryCTAText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
  },
  trustIndicators: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
  companyLogos: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: '600',
  },
  statsSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
    minWidth: '20%',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featuresSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 28,
    paddingHorizontal: 16,
    maxWidth: 600,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  featureCard: {
    width: width > 768 ? '48%' : '100%',
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.text,
  },
  featureDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  testimonialsSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  testimonialsScroll: {
    marginTop: 60,
  },
  testimonialsContent: {
    paddingHorizontal: 24,
  },
  testimonialCard: {
    width: 320,
    backgroundColor: colors.background,
    padding: 32,
    borderRadius: 16,
    marginRight: 24,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  testimonialAvatar: {
    fontSize: 32,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 4,
  },
  testimonialQuote: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
    paddingTop: 20,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ctaSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ctaContent: {
    alignItems: 'center',
    maxWidth: 600,
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 28,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  ctaNote: {
    fontSize: 14,
    color: colors.textMuted,
  },
  footer: {
    backgroundColor: colors.surface,
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  footerDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
    maxWidth: 500,
  },
  footerFeatures: {
    flexDirection: 'row',
    gap: 32,
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
    color: colors.success,
    fontWeight: '600',
  },
});