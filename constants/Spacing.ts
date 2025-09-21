export const Spacing = {
  // Base spacing scale (4px base unit)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // Extended spacing for layouts
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
  '9xl': 128,
  
  // Component-specific spacing
  buttonPadding: 16,
  cardPadding: 24,
  sectionPadding: 32,
  containerPadding: 24,
  
  // Layout spacing
  headerHeight: 64,
  tabBarHeight: 80,
  bottomSafeArea: 34,
} as const;

export const BorderRadius = {
  // Modern radius scale
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  
  // Special radius values
  full: 9999,
  round: 50,
  
  // Component-specific
  button: 8,
  card: 12,
  modal: 16,
  input: 8,
  badge: 20,
  avatar: 50,
} as const;

export const Shadows = {
  // Subtle shadows
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  
  // Colored shadows for brand elements
  primary: {
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  
  secondary: {
    shadowColor: '#06B6D4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Inner shadows for inputs
  inset: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: -1,
  },
} as const;

// Animation timing constants
export const Timing = {
  // Duration (milliseconds)
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
  
  // Easing curves
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  // Spring animations
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  
  springBouncy: {
    damping: 10,
    stiffness: 100,
    mass: 1,
  },
} as const;