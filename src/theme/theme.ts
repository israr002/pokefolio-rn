// Base colors
const baseColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  red: {
    500: '#FF3B30',
    600: '#DC2626',
  },
  orange: {
    500: '#FF6B6B',
    600: '#EA580C',
  },
  green: {
    500: '#34C759',
    600: '#16A34A',
  },
} as const;

// Opacity values
export const OPACITY = {
  light: '20', // 20% opacity
  medium: '40', // 40% opacity
  high: '60', // 60% opacity
} as const;

export const TYPE_COLORS = {
  bug: '#A7B723',
  dark: '#75574C',
  dragon: '#7037FF',
  electric: '#F9CF30',
  fairy: '#E69EAC',
  fighting: '#C12239',
  fire: '#F57D31',
  flying: '#A891EC',
  ghost: '#70559B',
  normal: '#AAA67F',
  grass: '#74CB48',
  ground: '#DEC16B',
  ice: '#9AD6DF',
  poison: '#A43E9E',
  psychic: '#FB5584',
  rock: '#B69E31',
  steel: '#B7B9D0',
  water: '#6493EB',
};

// Theme colors
export const COLORS = {
  primary: '#DC0A2D',
  white: '#FFFFFF',
  transluscent: 'rgba(255, 255, 255, 0.3)',
  transparent: 'transparent',
  black: '#000000',
  gray: '#A3A3A3',
  error: '#FF3B30',

  // Brand colors
  //primary: baseColors.orange[500],
  secondary: baseColors.gray[100],
  accent: baseColors.orange[500],

  // Background colors
  background: {
    light: baseColors.white,
    dark: baseColors.gray[900],
  },

  // Text colors
  text: {
    light: baseColors.white,
    dark: baseColors.gray[900],
    gray: baseColors.gray[500],
    error: baseColors.red[500],
  },

  // Border colors
  border: {
    light: baseColors.gray[200],
    dark: baseColors.gray[700],
  },

  // Card colors
  card: {
    light: baseColors.white,
    dark: baseColors.gray[800],
  },

  // Status colors
  status: {
    success: baseColors.green[500],
    warning: baseColors.orange[600],
    error: baseColors.red[500],
    errorLight: baseColors.red[500] + OPACITY.light,
  },
} as const;

// Typography scale
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'SFProDisplay-Regular',
    medium: 'SFProDisplay-Medium',
    semibold: 'SFProDisplay-Semibold',
    bold: 'SFProDisplay-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing scale
export const SPACING = {
  px: 1,
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

// Shadow scale
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: baseColors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: baseColors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: baseColors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: baseColors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;
