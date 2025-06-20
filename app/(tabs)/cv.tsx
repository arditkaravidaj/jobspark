import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { FileText, Download, Share, Eye, Sparkles } from 'lucide-react-native';

export default function CVBuilderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <FileText size={32} color="#007BFF" />
              <View>
                <Text style={styles.headerTitle}>CV Builder</Text>
                <Text style={styles.headerSubtitle}>Create your professional CV</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.aiButton}>
              <Sparkles size={20} color="#FFFFFF" />
              <Text style={styles.aiButtonText}>AI Tips</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Profile Completion</Text>
            <Text style={styles.progressPercentage}>75%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressDescription}>
            Complete your profile to generate a professional CV
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionContent}>
                <Eye size={32} color="#007BFF" />
                <Text style={styles.quickActionTitle}>Preview CV</Text>
                <Text style={styles.quickActionDescription}>See how your CV looks</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionContent}>
                <Download size={32} color="#28A745" />
                <Text style={styles.quickActionTitle}>Download PDF</Text>
                <Text style={styles.quickActionDescription}>Get your CV as PDF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generate Button */}
        <View style={styles.generateSection}>
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate CV with AI</Text>
          </TouchableOpacity>
          <Text style={styles.generateDescription}>
            Our AI will create a professional CV based on your profile
          </Text>
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
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  aiButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  progressDescription: {
    fontSize: 14,
    color: '#6C757D',
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
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
  },
  quickActionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
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
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  generateSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  generateDescription: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 32,
  },
});