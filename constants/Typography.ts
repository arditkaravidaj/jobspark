import { TextStyle } from 'react-native';
import { Colors } from './Colors';

export const Typography = {
  // Display Headings - Hero & Landing
  display1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    lineHeight: 64,
    color: Colors.text,
    letterSpacing: -1.5,
    fontWeight: '800',
  } as TextStyle,
  
  display2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    lineHeight: 56,
    color: Colors.text,
    letterSpacing: -1.25,
    fontWeight: '800',
  } as TextStyle,
  
  display3: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    lineHeight: 48,
    color: Colors.text,
    letterSpacing: -1,
    fontWeight: '700',
  } as TextStyle,
  
  // Headings - Refined Hierarchy
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.text,
    letterSpacing: -0.75,
    fontWeight: '700',
  } as TextStyle,
  
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    lineHeight: 36,
    color: Colors.text,
    letterSpacing: -0.5,
    fontWeight: '600',
  } as TextStyle,
  
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.text,
    letterSpacing: -0.25,
    fontWeight: '600',
  } as TextStyle,
  
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
    letterSpacing: 0,
    fontWeight: '600',
  } as TextStyle,
  
  h5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: Colors.text,
    letterSpacing: 0,
    fontWeight: '500',
  } as TextStyle,
  
  h6: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    letterSpacing: 0.1,
    fontWeight: '500',
  } as TextStyle,
  
  // Body Text - Enhanced Readability
  bodyLarge: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    lineHeight: 28,
    color: Colors.text,
    letterSpacing: 0,
  } as TextStyle,
  
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: Colors.text,
    letterSpacing: 0,
  } as TextStyle,
  
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
    letterSpacing: 0.1,
  } as TextStyle,
  
  bodySmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  } as TextStyle,
  
  // Interactive Elements
  buttonLarge: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.textOnPrimary,
    letterSpacing: 0.1,
    fontWeight: '600',
  } as TextStyle,
  
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.textOnPrimary,
    letterSpacing: 0.1,
    fontWeight: '600',
  } as TextStyle,
  
  buttonSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.textOnPrimary,
    letterSpacing: 0.2,
    fontWeight: '500',
  } as TextStyle,
  
  link: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.primary,
    letterSpacing: 0,
    fontWeight: '500',
  } as TextStyle,
  
  linkSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary,
    letterSpacing: 0.1,
    fontWeight: '500',
  } as TextStyle,
  
  // Labels & Captions
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.text,
    letterSpacing: 0.2,
    fontWeight: '500',
  } as TextStyle,
  
  labelSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
    fontWeight: '500',
    textTransform: 'uppercase',
  } as TextStyle,
  
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  } as TextStyle,
  
  overline: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    color: Colors.textTertiary,
    letterSpacing: 1,
    fontWeight: '500',
    textTransform: 'uppercase',
  } as TextStyle,
  
  // Special Typography
  hero: {
    fontFamily: 'Poppins-Bold',
    fontSize: 64,
    lineHeight: 72,
    color: Colors.text,
    letterSpacing: -2,
    fontWeight: '800',
  } as TextStyle,
  
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 30,
    color: Colors.textSecondary,
    letterSpacing: 0,
  } as TextStyle,
  
  // Monospace for Code/Data
  mono: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    letterSpacing: 0,
  } as TextStyle,
  
  // Numeric Display
  numeric: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.primary,
    letterSpacing: -0.5,
    fontWeight: '600',
  } as TextStyle,
} as const;