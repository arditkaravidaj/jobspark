import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { MessageCircle, Play, Users, Code, Lightbulb, Target } from 'lucide-react-native';

const interviewTypes = [
  {
    id: 1,
    title: 'Behavioral Interview',
    description: 'Practice common behavioral questions using the STAR method',
    duration: 30,
    questionCount: 8,
    icon: Users,
    color: '#007BFF',
  },
  {
    id: 2,
    title: 'Technical Interview',
    description: 'Coding challenges and technical problem-solving',
    duration: 45,
    questionCount: 6,
    icon: Code,
    color: '#28A745',
  },
  {
    id: 3,
    title: 'Situational Interview',
    description: 'Hypothetical scenarios and problem-solving',
    duration: 25,
    questionCount: 7,
    icon: Lightbulb,
    color: '#FFC107',
  },
  {
    id: 4,
    title: 'Leadership Interview',
    description: 'Management and leadership scenario questions',
    duration: 35,
    questionCount: 6,
    icon: Target,
    color: '#DC3545',
  },
];

export default function InterviewPracticeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <MessageCircle size={32} color="#007BFF" />
              <View>
                <Text style={styles.headerTitle}>Interview Practice</Text>
                <Text style={styles.headerSubtitle}>AI-powered coaching</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Sessions This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>82%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>+15%</Text>
            <Text style={styles.statLabel}>Improvement</Text>
          </View>
        </View>

        {/* Interview Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Types</Text>
          
          {interviewTypes.map((type) => (
            <TouchableOpacity key={type.id} style={styles.typeCard}>
              <View style={styles.typeContent}>
                <View style={[styles.typeIcon, { backgroundColor: `${type.color}15` }]}>
                  <type.icon size={32} color={type.color} />
                </View>
                <View style={styles.typeInfo}>
                  <Text style={styles.typeName}>{type.title}</Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                  <View style={styles.typeMeta}>
                    <Text style={styles.metaText}>{type.duration} min</Text>
                    <Text style={styles.metaText}>{type.questionCount} questions</Text>
                  </View>
                </View>
                <Play size={24} color="#ADB5BD" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Lightbulb size={24} color="#FFC107" />
            <Text style={styles.tipsTitle}>Interview Tips</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Practice the STAR method for behavioral questions</Text>
            <Text style={styles.tipItem}>• Research the company and role beforehand</Text>
            <Text style={styles.tipItem}>• Prepare specific examples of your achievements</Text>
            <Text style={styles.tipItem}>• Practice your elevator pitch</Text>
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
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  typeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  typeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  typeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
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
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});