import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes as googleStatusCodes } from '@react-native-google-signin/google-signin';
import { Platform, Alert } from 'react-native';
import Config from 'react-native-config';
import { getAuthErrorMessage } from 'utils/authErrors';

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
  if (Platform.OS == 'ios') return true;  // Skip for iOS since it's not needed

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
}

export const showSignInWithGoogleFailed = (): void => {
  Alert.alert(
    'Google Sign-In Failed',
    'If you have an existing account, try signing in again or resetting your password.'
  );
}


export const signInWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return { success: true };
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
        error: 'Google Play Services are not available' 
      };
    }

    const user = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();
    
    if (!idToken) {
      return { 
        success: false, 
        error: 'No idToken received from Google' 
      };
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    
    return { success: true, user };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    return { 
      success: false, 
      error: getAuthErrorMessage(error) 
    };
  }
};

