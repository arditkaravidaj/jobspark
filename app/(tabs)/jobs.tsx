import React, { useState, useEffect } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building,
  Star,
  Heart,
  Share2,
  Eye,
  ChevronRight,
  Bookmark,
  TrendingUp,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Zap,
  Target,
  Plus,
  Settings,
  SlidersHorizontal
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows, Timing } from '@/constants/Spacing';

const { width, height } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Enhanced mock jobs data
const mockJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechFlow Solutions',
    location: 'Cape Town, Western Cape',
    type: 'Full-time',
    salary: 'R75,000 - R95,000',
    salaryPeriod: 'month',
    matchScore: 95,
    posted: '2 days ago',
    applicants: 23,
    logo: '🚀',
    featured: true,
    remote: false,
    urgent: false,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: 'Senior Level',
    companySize: '50-200 employees',
    industry: 'Technology',
    benefits: ['Health Insurance', 'Remote Work', 'Learning Budget'],
    description: 'Join our innovative team building next-generation web applications...',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'AWS knowledge'],
    saved: false,
    applied: false,
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Studio Pro',
    location: 'Johannesburg, Gauteng',
    type: 'Full-time',
    salary: 'R45,000 - R65,000',
    salaryPeriod: 'month',
    matchScore: 88,
    posted: '1 day ago',
    applicants: 15,
    logo: '🎨',
    featured: true,
    remote: true,
    urgent: false,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    experience: 'Mid Level',
    companySize: '10-50 employees',
    industry: 'Design',
    benefits: ['Flexible Hours', 'Creative Freedom', 'Equipment Allowance'],
    description: 'Design beautiful and intuitive user experiences for our clients...',
    requirements: ['3+ years UX/UI experience', 'Figma expertise', 'Portfolio required'],
    saved: true,
    applied: false,
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Analytics Insights',
    location: 'Remote',
    type: 'Full-time',
    salary: 'R65,000 - R85,000',
    salaryPeriod: 'month',
    matchScore: 82,
    posted: '3 days ago',
    applicants: 31,
    logo: '📊',
    featured: false,
    remote: true,
    urgent: true,
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    experience: 'Senior Level',
    companySize: '200+ employees',
    industry: 'Analytics',
    benefits: ['Stock Options', 'Learning Budget', 'Conference Attendance'],
    description: 'Lead data science initiatives and build predictive models...',
    requirements: ['PhD or Masters in Data Science', 'Python expertise', 'ML experience'],
    saved: false,
    applied: true,
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Durban, KwaZulu-Natal',
    type: 'Full-time',
    salary: 'R55,000 - R75,000',
    salaryPeriod: 'month',
    matchScore: 76,
    posted: '5 days ago',
    applicants: 18,
    logo: '💡',
    featured: false,
    remote: false,
    urgent: false,
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
    experience: 'Mid Level',
    companySize: '50-200 employees',
    industry: 'Product',
    benefits: ['Performance Bonus', 'Team Events', 'Growth Opportunities'],
    description: 'Drive product strategy and work with cross-functional teams...',
    requirements: ['3+ years product management', 'Agile experience', 'Leadership skills'],
    saved: false,
    applied: false,
  },
];

// Job filters
const jobFilters = [
  { id: 'all', label: 'All Jobs', count: mockJobs.length },
  { id: 'featured', label: 'Featured', count: mockJobs.filter(j => j.featured).length },
  { id: 'remote', label: 'Remote', count: mockJobs.filter(j => j.remote).length },
  { id: 'urgent', label: 'Urgent', count: mockJobs.filter(j => j.urgent).length },
  { id: 'saved', label: 'Saved', count: mockJobs.filter(j => j.saved).length },
];

const AnimatedJobCard = ({ job, index, onSave, onApply }: any) => {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    const delay = index * 100;
    scale.value = withDelay(delay, withSpring(1, Timing.spring));
    opacity.value = withDelay(delay, withTiming(1, { duration: Timing.normal }));
    translateY.value = withDelay(delay, withSpring(0, Timing.spring));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return Colors.success;
    if (score >= 80) return Colors.accent;
    if (score >= 70) return Colors.warning;
    return Colors.textTertiary;
  };

  const getSalaryColor = (salary: string) => {
    const amount = parseInt(salary.replace(/[^\d]/g, ''));
    if (amount >= 70000) return Colors.salaryHigh;
    if (amount >= 50000) return Colors.salaryMid;
    return Colors.salaryLow;
  };

  return (
    <Animated.View style={[styles.jobCard, animatedStyle]}>
      <TouchableOpacity activeOpacity={0.95}>
        {/* Job Header */}
        <View style={styles.jobHeader}>
          <View style={styles.jobHeaderLeft}>
            <View style={[
              styles.companyLogo,
              job.featured && styles.featuredLogo
            ]}>
              <Text style={styles.logoEmoji}>{job.logo}</Text>
              {job.featured && (
                <View style={styles.featuredBadge}>
                  <Star size={10} color={Colors.accent} fill={Colors.accent} />
                </View>
              )}
            </View>
            
            <View style={styles.jobBasicInfo}>
              <View style={styles.jobTitleRow}>
                <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
                {job.urgent && (
                  <View style={styles.urgentBadge}>
                    <Zap size={12} color={Colors.white} />
                    <Text style={styles.urgentText}>URGENT</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.companyName}>{job.company}</Text>
              
              <View style={styles.jobMeta}>
                <View style={styles.metaItem}>
                  <MapPin size={14} color={Colors.textTertiary} />
                  <Text style={styles.metaText}>{job.location}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={14} color={Colors.textTertiary} />
                  <Text style={styles.metaText}>{job.posted}</Text>
                </View>
                {job.remote && (
                  <View style={styles.remoteBadge}>
                    <Text style={styles.remoteText}>Remote</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, job.saved && styles.saveButtonActive]}
            onPress={() => onSave(job.id)}
          >
            <Heart 
              size={20} 
              color={job.saved ? Colors.error : Colors.textTertiary}
              fill={job.saved ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Job Details */}
        <View style={styles.jobDetails}>
          <View style={styles.salarySection}>
            <DollarSign size={16} color={getSalaryColor(job.salary)} />
            <Text style={[styles.salaryText, { color: getSalaryColor(job.salary) }]}>
              {job.salary}/{job.salaryPeriod}
            </Text>
          </View>
          
          <View style={styles.matchSection}>
            <View style={[
              styles.matchScore,
              { backgroundColor: `${getMatchScoreColor(job.matchScore)}20` }
            ]}>
              <Target size={14} color={getMatchScoreColor(job.matchScore)} />
              <Text style={[styles.matchText, { color: getMatchScoreColor(job.matchScore) }]}>
                {job.matchScore}% match
              </Text>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.skillsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.skillsList}>
              {job.skills.slice(0, 4).map((skill: string, index: number) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
              {job.skills.length > 4 && (
                <View style={styles.moreSkills}>
                  <Text style={styles.moreSkillsText}>+{job.skills.length - 4}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        {/* Job Footer */}
        <View style={styles.jobFooter}>
          <View style={styles.applicantsInfo}>
            <Users size={14} color={Colors.textTertiary} />
            <Text style={styles.applicantsText}>{job.applicants} applicants</Text>
          </View>
          
          <View style={styles.jobActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Eye size={16} color={Colors.primary} />
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.applyButton,
                job.applied && styles.appliedButton
              ]}
              onPress={() => onApply(job.id)}
              disabled={job.applied}
            >
              <Text style={[
                styles.applyButtonText,
                job.applied && styles.appliedButtonText
              ]}>
                {job.applied ? 'Applied' : 'Apply'}
              </Text>
              {!job.applied && <ArrowRight size={16} color={Colors.white} />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function JobsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Briefcase size={32} color="#007BFF" />
            <View>
              <Text style={styles.headerTitle}>Job Search</Text>
              <Text style={styles.headerSubtitle}>{mockJobs.length} opportunities</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#FFFFFF" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#ADB5BD" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies, skills..."
            placeholderTextColor="#ADB5BD"
          />
        </View>
      </View>

      {/* Job List */}
      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        {mockJobs.map((job) => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View style={styles.jobHeaderLeft}>
                <View style={styles.companyLogo}>
                  <Building size={24} color="#007BFF" />
                </View>
                <View style={styles.jobBasicInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.companyName}>{job.company}</Text>
                  <View style={styles.jobMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={14} color="#ADB5BD" />
                      <Text style={styles.metaText}>{job.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#ADB5BD" />
                      <Text style={styles.metaText}>{job.type}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.jobDetails}>
              <View style={styles.salarySection}>
                <DollarSign size={16} color="#28A745" />
                <Text style={styles.salaryText}>{job.salary}</Text>
              </View>
              
              <View style={styles.matchScore}>
                <Text style={styles.matchLabel}>Match:</Text>
                <Text style={styles.matchValue}>{job.matchScore}%</Text>
              </View>
            </View>

            <View style={styles.jobActions}>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  jobsList: {
    flex: 1,
    padding: 24,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  jobHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobBasicInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  salarySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  salaryText: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '600',
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  matchValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28A745',
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 32,
  },
});