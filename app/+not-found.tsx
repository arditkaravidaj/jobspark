import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Chrome as Home, ArrowLeft, Search } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.errorCode}>404</Text>
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.description}>
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Home size={20} color={Colors.white} />
              <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>You might be looking for:</Text>
            <Link href="/(tabs)" style={styles.suggestionLink}>
              <Text style={styles.suggestionText}>• Dashboard</Text>
            </Link>
            <Link href="/(tabs)/cv" style={styles.suggestionLink}>
              <Text style={styles.suggestionText}>• CV Builder</Text>
            </Link>
            <Link href="/(tabs)/jobs" style={styles.suggestionLink}>
              <Text style={styles.suggestionText}>• Job Search</Text>
            </Link>
            <Link href="/(tabs)/profile" style={styles.suggestionLink}>
              <Text style={styles.suggestionText}>• Profile Settings</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 200,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCode: {
    ...Typography.h1,
    fontSize: 72,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
    maxWidth: 400,
  },
  actions: {
    width: '100%',
    maxWidth: 300,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    gap: Spacing.sm,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    gap: Spacing.sm,
  },
  secondaryButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  suggestions: {
    alignItems: 'center',
  },
  suggestionsTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  suggestionLink: {
    marginBottom: Spacing.sm,
  },
  suggestionText: {
    ...Typography.body2,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});