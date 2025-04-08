// Authentication
export const AUTH = {
  ERROR_DISPLAY_DURATION: 5000, // 5 seconds
  MIN_PASSWORD_LENGTH: 6,
} as const;

// Navigation
export const ROUTES = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
} as const;

// API
export const API = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME: '@theme',
} as const;

// Animation
export const ANIMATION = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
} as const;

// Layout
export const LAYOUT = {
  HEADER_HEIGHT: 60,
  TAB_BAR_HEIGHT: 80,
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
  },
} as const; 
