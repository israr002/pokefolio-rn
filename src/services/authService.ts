import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { GoogleSignin, statusCodes as googleStatusCodes } from '@react-native-google-signin/google-signin';
import { Platform, Alert } from 'react-native';
import Config from 'react-native-config';
import { getAuthErrorMessage } from 'utils/authErrors';
import { SignupFormData } from 'schemas/authSchema';
import { APP_CONSTANTS } from 'constants/appConstants';

// Initialize Firebase Auth
const auth = getAuth();

// Configure Google Sign In
// Note: On iOS, we initially got the error "audience is not a valid client id"
// This was caused by a mix-up where the wrong client ID was used (likely the web client ID on iOS).
// This setup ensures the correct client ID is used per platform.
GoogleSignin.configure({
  iosClientId: Platform.OS === 'ios' ? Config.GOOGLE_IOS_CLIENT_ID : undefined,
  webClientId: Platform.OS === 'android' ? Config.GOOGLE_WEB_CLIENT_ID : undefined,
});

// Check Google Play Services (Android only)
 const confirmGooglePlayServices = async () => {
  if (Platform.OS == 'ios') {return true;}  // Skip for iOS since it's not needed

  try {
    await GoogleSignin.hasPlayServices();
    return true;
  } catch (hasPlayServicesError) {
    if ((hasPlayServicesError as { code: string }).code === googleStatusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert(
        'Google Play Services Not Installed',
        'You must install Google Play Services to sign in with Google.'
      );
      return false;
    }
    throw hasPlayServicesError;
  }
};

export const showSignInWithGoogleFailed = (): void => {
  Alert.alert(
    'Google Sign-In Failed',
    'If you have an existing account, try signing in again or resetting your password.'
  );
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; emailVerified?: boolean; user?: any }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const isEmailVerified = userCredential.user.emailVerified;
    return {
      success: true,
      emailVerified: isEmailVerified,
      user: userCredential.user,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

export const signInWithGoogle = async (): Promise<{
  success: boolean;
  error?: string;
  user?: any
}> => {
  try {
    const hasPlayServices = await confirmGooglePlayServices();
    if (!hasPlayServices) {
      return {
        success: false,
        error: 'Google Play Services are not available',
      };
    }

    const user = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();

    if (!idToken) {
      return {
        success: false,
        error: 'No idToken received from Google',
      };
    }

    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);

    return { success: true, user };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    return {
      success: false,
      error: getAuthErrorMessage(error),
    };
  }
};

export const signUp = async (
    data: SignupFormData,
    profilePhotoUri: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      if (!user) {
        return { success: false, error: 'User creation failed' };
      }

      let uploadedPhotoURL = profilePhotoUri;

      // If a profile photo is provided, upload it to Firebase Storage
      if (profilePhotoUri) {
        const reference = storage().ref(`profile_photos/${user.uid}`);
        await reference.putFile(profilePhotoUri);
        uploadedPhotoURL = await reference.getDownloadURL();
      }

      // Update the Firebase user's profile with name and photo URL
      await user.updateProfile({
        displayName: data.displayName,
        ...(uploadedPhotoURL && { photoURL: uploadedPhotoURL }),
      });

      // Reload the user to ensure profile changes are applied
      await user.reload();

      // Send email verification
      await user.sendEmailVerification();

      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  };

export const checkEmailVerification = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error(APP_CONSTANTS.UNKNOWN_ERROR);
    }

    await user.reload();
    return user.emailVerified;
  } catch (error) {
    console.error(APP_CONSTANTS.AUTH_ERROR_LOG, error);
    return false;
  }
};


export const resendVerificationEmail = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { success: false, error: 'No user is currently signed in' };
      }

      await user.sendEmailVerification();
      await signOut(auth);
      return { success: true };

    } catch (error: any) {
      console.error('Resend verification email error:', error);
      return { success: false, error: error};
    }
  };

export const handleSignOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {

    const googleUser = await GoogleSignin.getCurrentUser();
    if (googleUser) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    await auth.signOut();
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

