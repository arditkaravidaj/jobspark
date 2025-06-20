import { TextStyle } from 'react-native';
import { Colors } from './Colors';

export const Typography = {
  // Headings - Poppins Bold
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.text,
    letterSpacing: -0.5,
  } as TextStyle,
  
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 29,
    color: Colors.text,
    letterSpacing: -0.25,
  } as TextStyle,
  
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.text,
  } as TextStyle,
  
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.text,
  } as TextStyle,
  
  h5: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.text,
  } as TextStyle,
  
  // Body Text - Inter Regular
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  } as TextStyle,
  
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
  } as TextStyle,
  
  body3: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.text,
  } as TextStyle,
  
  // Interactive Text
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textOnPrimary,
  } as TextStyle,
  
  buttonSmall: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.textOnPrimary,
  } as TextStyle,
  
  link: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary,
  } as TextStyle,
  
  // Special Text
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Colors.textSecondary,
  } as TextStyle,
  
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.text,
  } as TextStyle,
} as const;