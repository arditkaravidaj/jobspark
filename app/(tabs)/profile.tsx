import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { User, CreditCard as Edit3, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Briefcase, GraduationCap, Award } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={48} color="#007BFF" />
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              
              <View style={styles.profileMetaItem}>
                <Text style={styles.profileMetaText}>Cape Town, South Africa</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Completion */}
        <View style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercentage}>75%</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          
          <Text style={styles.completionDescription}>
            Complete your profile to get better job matches
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>CVs Generated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>
        </View>

        {/* Profile Sections */}
        <View style={styles.profileSections}>
          {/* Work Experience */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Briefcase size={24} color="#007BFF" />
                <Text style={styles.sectionTitle}>Work Experience</Text>
              </View>
              <TouchableOpacity>
                <Edit3 size={20} color="#ADB5BD" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionText}>No work experience added yet</Text>
              <TouchableOpacity>
                <Text style={styles.addSectionLink}>Add Experience</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Education */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <GraduationCap size={24} color="#007BFF" />
                <Text style={styles.sectionTitle}>Education</Text>
              </View>
              <TouchableOpacity>
                <Edit3 size={20} color="#ADB5BD" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionText}>No education added yet</Text>
              <TouchableOpacity>
                <Text style={styles.addSectionLink}>Add Education</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Skills */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Award size={24} color="#007BFF" />
                <Text style={styles.sectionTitle}>Skills</Text>
              </View>
              <TouchableOpacity>
                <Edit3 size={20} color="#ADB5BD" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionText}>No skills added yet</Text>
              <TouchableOpacity>
                <Text style={styles.addSectionLink}>Add Skills</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.settingsMenu}>
          <Text style={styles.settingsTitle}>Settings & Support</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Settings size={24} color="#6C757D" />
              <Text style={styles.settingsItemText}>Account Settings</Text>
            </View>
            <ChevronRight size={20} color="#ADB5BD" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Bell size={24} color="#6C757D" />
              <Text style={styles.settingsItemText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color="#ADB5BD" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Shield size={24} color="#6C757D" />
              <Text style={styles.settingsItemText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color="#ADB5BD" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <HelpCircle size={24} color="#6C757D" />
              <Text style={styles.settingsItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#ADB5BD" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <LogOut size={24} color="#DC3545" />
              <Text style={[styles.settingsItemText, { color: '#DC3545' }]}>Sign Out</Text>
            </View>
            <ChevronRight size={20} color="#ADB5BD" />
          </TouchableOpacity>
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
  profileHeader: {
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
  profileHeaderContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  profileMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  profileMetaText: {
    fontSize: 14,
    color: '#6C757D',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
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
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  completionPercentage: {
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
  completionDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
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
  profileSections: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptySection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptySectionText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  addSectionLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
  settingsMenu: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingsItemText: {
    fontSize: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});