export const APP_CONSTANTS = {
  // Auth Screen Titles
  LOGIN_TITLE: 'Welcome Back',
  LOGIN_SUBTITLE: 'Sign in to continue your Pokémon journey',
  SIGNUP_TITLE: 'Create Account',
  SIGNUP_SUBTITLE: 'Join the Pokémon community',

  // Form Labels
  EMAIL_LABEL: 'Email',
  PASSWORD_LABEL: 'Password',
  CONFIRM_PASSWORD_LABEL: 'Confirm Password',

  // Form Placeholders
  EMAIL_PLACEHOLDER: 'Enter your email',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm your password',

  // Buttons
  SIGN_IN_BUTTON: 'Sign In',
  SIGN_UP_BUTTON: 'Sign Up',
  GOOGLE_SIGN_IN: 'Continue with Google',

  // Links
  NO_ACCOUNT_TEXT: "Don't have an account? ",
  HAVE_ACCOUNT_TEXT: 'Already have an account? ',
  SIGN_UP_LINK: 'Sign Up',
  SIGN_IN_LINK: 'Sign In',

  // Image Selector
  SELECT_PROFILE_PICTURE: 'Select Profile Picture',
  SELECT_PROFILE_PICTURE_MESSAGE: 'Choose how you want to add your profile picture',
  TAKE_PHOTO: 'Take Photo',
  CHOOSE_FROM_GALLERY: 'Choose from Gallery',

  // Error Messages
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  PASSWORDS_DONT_MATCH: "Passwords don't match",
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please try again later',
  NETWORK_ERROR: 'Please check your internet connection',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
  PERMISSION_REQUIRED: 'Permission Required',
  GALLERY_PERMISSION_MESSAGE: 'Please grant photo library access to select a profile picture',
  CAMERA_PERMISSION_MESSAGE: 'Please grant camera access to take a profile picture',
  GALLERY_UNAVAILABLE: 'Gallery access is not available on this device',
  CAMERA_UNAVAILABLE: 'Camera is not available on this device',
  OPEN_SETTINGS: 'Open Settings',
} as const;

