import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { Card } from './Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { CircleCheck as CheckCircle, Sparkles } from 'lucide-react-native';

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  style: 'modern' | 'classic' | 'creative' | 'minimal';
  isPremium: boolean;
  preview?: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  style?: ViewStyle;
}

export function TemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate,
  style,
}: TemplateSelectorProps) {
  return (
    <ScrollView style={[styles.container, style]} showsVerticalScrollIndicator={false}>
      {templates.map((template) => (
        <TouchableOpacity
          key={template.id}
          onPress={() => onSelectTemplate(template)}
        >
          <Card style={[
            styles.templateCard,
            selectedTemplate.id === template.id && styles.selectedCard
          ]}>
            <View style={styles.templateContent}>
              <View style={styles.templatePreview}>
                <View style={[styles.colorBar, { backgroundColor: template.color }]} />
                <View style={styles.previewContent}>
                  <View style={[styles.previewLine, styles.titleLine]} />
                  <View style={[styles.previewLine, styles.subtitleLine]} />
                  <View style={styles.previewSection}>
                    <View style={[styles.previewLine, styles.sectionLine]} />
                    <View style={[styles.previewLine, styles.contentLine]} />
                    <View style={[styles.previewLine, styles.contentLine]} />
                  </View>
                </View>
                {template.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Sparkles size={12} color={Colors.warning} />
                    <Text style={styles.premiumText}>PRO</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                <View style={styles.templateMeta}>
                  <Text style={styles.templateStyle}>{template.style.toUpperCase()}</Text>
                  {template.isPremium && (
                    <Text style={styles.premiumLabel}>Premium</Text>
                  )}
                </View>
              </View>
              
              {selectedTemplate.id === template.id && (
                <CheckCircle size={24} color={Colors.success} />
              )}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  templateCard: {
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.borderLight,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  templateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  templatePreview: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
    position: 'relative',
  },
  colorBar: {
    height: 20,
    width: '100%',
  },
  previewContent: {
    padding: Spacing.xs,
    flex: 1,
  },
  previewLine: {
    backgroundColor: Colors.gray300,
    borderRadius: 2,
    marginBottom: 4,
  },
  titleLine: {
    height: 8,
    width: '80%',
    backgroundColor: Colors.gray600,
  },
  subtitleLine: {
    height: 6,
    width: '60%',
  },
  previewSection: {
    marginTop: Spacing.xs,
  },
  sectionLine: {
    height: 4,
    width: '40%',
    backgroundColor: Colors.gray500,
  },
  contentLine: {
    height: 3,
    width: '90%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  premiumText: {
    ...Typography.caption,
    fontSize: 8,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    ...Typography.h5,
    marginBottom: 4,
  },
  templateDescription: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  templateMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  templateStyle: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
    backgroundColor: Colors.gray200,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumLabel: {
    ...Typography.caption,
    color: Colors.warning,
    fontWeight: '600',
    backgroundColor: Colors.warningLight,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
});