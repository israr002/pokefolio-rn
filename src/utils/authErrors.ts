import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const getAuthErrorMessage = (error: FirebaseAuthTypes.NativeFirebaseAuthError): string => {
  // Log the full error for debugging
  console.log('Firebase Auth Error:', {
    code: error.code,
    message: error.message,
    nativeErrorCode: error.nativeErrorCode,
    nativeErrorMessage: error.nativeErrorMessage,
  });

  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/network-request-failed':
      return 'Please check your internet connection';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please try signing in or use a different email';
    default:
      return 'Unable to sign in. Please check your credentials and try again';
  }
};
