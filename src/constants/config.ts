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


