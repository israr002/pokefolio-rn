// API Configuration
export const API = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 3600, // 1 hour in seconds
} as const;

// Authentication Configuration
export const AUTH = {
  ERROR_DISPLAY_DURATION: 5000, // 5 seconds
  MIN_PASSWORD_LENGTH: 6,
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME: '@theme',
  LANGUAGE: '@language',
  NOTIFICATIONS: '@notifications',
} as const;

// Animation Configuration
export const ANIMATION = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
  EASING: {
    DEFAULT: 'ease',
    BOUNCE: 'bounce',
    LINEAR: 'linear',
  },
} as const;

// Layout Configuration
export const LAYOUT = {
  HEADER_HEIGHT: 60,
  TAB_BAR_HEIGHT: 80,
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_CRASH_REPORTING: true,
} as const; 
