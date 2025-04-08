// Authentication Screens
export const AUTH = {
  LOGIN: {
    TITLE: 'Welcome Back',
    SUBTITLE: 'Sign in to continue your Pokémon journey',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Enter your email',
    PASSWORD_LABEL: 'Password',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    SIGN_IN_BUTTON: 'Sign In',
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP_LINK: 'Sign Up',
  },
  SIGNUP: {
    TITLE: 'Create Account',
    SUBTITLE: 'Join us on your Pokémon journey',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Enter your email',
    PASSWORD_LABEL: 'Password',
    PASSWORD_PLACEHOLDER: 'Create a password',
    CONFIRM_PASSWORD_LABEL: 'Confirm Password',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm your password',
    SIGN_UP_BUTTON: 'Sign Up',
    HAVE_ACCOUNT: 'Already have an account?',
    SIGN_IN_LINK: 'Sign In',
  },
} as const;

// Error Messages
export const ERRORS = {
  AUTH: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please try again later',
    NETWORK_ERROR: 'Please check your internet connection',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
  },
} as const;

// Navigation
export const NAVIGATION = {
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  POKEDEX: 'Pokédex',
  FAVORITES: 'Favorites',
} as const; 
