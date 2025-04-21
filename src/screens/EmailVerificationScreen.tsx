import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from 'theme/theme';
import { APP_CONSTANTS } from 'constants/appConstants';
import CustomButton from 'components/CustomButton';
import { checkEmailVerification, resendVerificationEmail } from 'services/authService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/AppNavigator';

type EmailVerificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EmailVerification'>;

const EmailVerificationScreen = () => {
  const navigation = useNavigation<EmailVerificationScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleCheckVerification = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const isVerified = await checkEmailVerification();
      
      if (isVerified) {
        navigation.replace('Home');
      } else {
        setError(APP_CONSTANTS.EMAIL_NOT_VERIFIED);
      }
    } catch (error) {
      setError(APP_CONSTANTS.UNKNOWN_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      setError(null);
      const result = await resendVerificationEmail();
      
      if (result.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 3000);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(APP_CONSTANTS.UNKNOWN_ERROR);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleCheckVerification, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{APP_CONSTANTS.VERIFY_EMAIL_TITLE}</Text>
        <Text style={styles.subtitle}>{APP_CONSTANTS.VERIFY_EMAIL_SUBTITLE}</Text>
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {resendSuccess && (
          <Text style={styles.successText}>{APP_CONSTANTS.VERIFICATION_EMAIL_SENT}</Text>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            title={APP_CONSTANTS.RESEND_VERIFICATION_BUTTON}
            onPress={handleResendVerification}
            variant="primary"
            isLoading={isResending}
          />
          <CustomButton
            title={APP_CONSTANTS.CHECK_VERIFICATION_BUTTON}
            onPress={handleCheckVerification}
            variant="secondary"
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
    padding: SPACING[4],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.light,
    textAlign: 'center',
    marginBottom: SPACING[2],
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.gray,
    textAlign: 'center',
    marginBottom: SPACING[8],
  },
  errorText: {
    color: COLORS.text.error,
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: 'center',
    marginBottom: SPACING[4],
  },
  successText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: 'center',
    marginBottom: SPACING[4],
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING[4],
  },
});

export default EmailVerificationScreen; 
