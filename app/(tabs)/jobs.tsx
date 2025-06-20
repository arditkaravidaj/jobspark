import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Briefcase, Search, Filter, MapPin, Clock, DollarSign, Building } from 'lucide-react-native';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Software Developer',
    company: 'TechCorp SA',
    location: 'Cape Town, Western Cape',
    type: 'full-time',
    salary: 'R600,000 - R800,000/year',
    matchScore: 92,
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'Johannesburg, Gauteng',
    type: 'full-time',
    salary: 'R400,000 - R550,000/year',
    matchScore: 85,
  },
  {
    id: '3',
    title: 'Junior Full Stack Developer',
    company: 'StartupCo',
    location: 'Durban, KwaZulu-Natal',
    type: 'full-time',
    salary: 'R300,000 - R400,000/year',
    matchScore: 78,
  },
];

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