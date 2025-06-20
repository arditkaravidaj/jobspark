import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { FileText, Download, Share, Eye, Sparkles, CheckCircle, RefreshCw } from 'lucide-react-native';

export default function CVBuilderScreen() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const handleGenerateCV = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      'Analyzing your profile data...',
      'Optimizing content for ATS systems...',
      'Applying professional template...',
      'Enhancing readability and flow...',
      'Finalizing your CV...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setGenerationProgress((i + 1) / steps.length);
    }

    setIsGenerating(false);
    setShowSuccessModal(true);
  };

  const handleDownloadCV = () => {
    Alert.alert(
      'Download CV',
      'Your CV has been downloaded as a PDF file.',
      [{ text: 'OK' }]
    );
  };

  const handlePreviewCV = () => {
    Alert.alert(
      'CV Preview',
      'Opening CV preview...',
      [{ text: 'OK' }]
    );
  };

  const handleShareCV = () => {
    Alert.alert(
      'Share CV',
      'Choose how you would like to share your CV:',
      [
        { text: 'Email', onPress: () => Alert.alert('Email', 'Opening email client...') },
        { text: 'LinkedIn', onPress: () => Alert.alert('LinkedIn', 'Sharing to LinkedIn...') },
        { text: 'Copy Link', onPress: () => Alert.alert('Link Copied', 'CV link copied to clipboard') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

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
            <TouchableOpacity style={styles.quickActionCard} onPress={handlePreviewCV}>
              <View style={styles.quickActionContent}>
                <Eye size={32} color="#007BFF" />
                <Text style={styles.quickActionTitle}>Preview CV</Text>
                <Text style={styles.quickActionDescription}>See how your CV looks</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard} onPress={handleDownloadCV}>
              <View style={styles.quickActionContent}>
                <Download size={32} color="#28A745" />
                <Text style={styles.quickActionTitle}>Download PDF</Text>
                <Text style={styles.quickActionDescription}>Get your CV as PDF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generation Progress */}
        {isGenerating && (
          <View style={styles.generationCard}>
            <View style={styles.generationContent}>
              <RefreshCw size={32} color="#007BFF" style={styles.spinningIcon} />
              <Text style={styles.generationTitle}>Generating Your CV</Text>
              <Text style={styles.generationStep}>{generationStep}</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${generationProgress * 100}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(generationProgress * 100)}% Complete</Text>
              </View>
            </View>
          </View>
        )}

        {/* Generate Button */}
        <View style={styles.generateSection}>
          <TouchableOpacity 
            style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]} 
            onPress={handleGenerateCV}
            disabled={isGenerating}
          >
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'Generating...' : 'Generate CV with AI'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.generateDescription}>
            Our AI will create a professional CV based on your profile
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CheckCircle size={64} color="#28A745" />
            <Text style={styles.modalTitle}>CV Generated Successfully! 🎉</Text>
            <Text style={styles.modalDescription}>
              Your professional CV has been created and is ready for download.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => {
                  setShowSuccessModal(false);
                  handlePreviewCV();
                }}
              >
                <Text style={styles.modalButtonText}>Preview CV</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={() => {
                  setShowSuccessModal(false);
                  handleDownloadCV();
                }}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>Download PDF</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  generationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 12,
    padding: 32,
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
  generationContent: {
    alignItems: 'center',
  },
  spinningIcon: {
    marginBottom: 16,
  },
  generationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212529',
  },
  generationStep: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
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
  generateButtonDisabled: {
    backgroundColor: '#ADB5BD',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#212529',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtonTextSecondary: {
    color: '#007BFF',
  },
  modalCloseButton: {
    paddingVertical: 8,
  },
  modalCloseText: {
    fontSize: 14,
    color: '#6C757D',
  },
});