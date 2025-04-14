import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from 'components/CustomButton';
import { APP_CONSTANTS } from 'constants/appConstants';
import { resendVerificationEmail, signInWithEmailAndPassword } from 'services/authService';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'components/Toast';

const EmailVerificationScreen = () => {
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { email, password } = route.params as { email: string; password: string };

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      const result = await resendVerificationEmail();
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      } else {
        setToast({ message: APP_CONSTANTS.VERIFY_EMAIL_SUCCESS, type: 'success' });
      }
    } catch (error) {
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      setIsVerifying(true);
      const result = await signInWithEmailAndPassword(email, password);
      
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
        return;
      }

      if (!result.emailVerified) {
        setToast({ message: 'Please verify your email before continuing.', type: 'error' });
        return;
      }


    } catch (error) {
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_CONSTANTS.VERIFY_EMAIL_TITLE}</Text>
          <Text style={styles.subtitle}>
            {APP_CONSTANTS.VERIFY_EMAIL_MESSAGE.replace('{email}', email)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isResending ? 'Sending...' : APP_CONSTANTS.RESEND_EMAIL_BUTTON}
            onPress={handleResendEmail}
            variant="primary"
            isLoading={isResending}
            disabled={isResending}
          />
          <CustomButton
            title={isVerifying ? 'Verifying...' : 'I\'ve Verified My Email'}
            onPress={handleCheckVerification}
            variant="secondary"
            isLoading={isVerifying}
            disabled={isVerifying}
          />
        </View>
      </View>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING[5],
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING[8],
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    marginBottom: SPACING[2],
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: SPACING[4],
  },
});

export default EmailVerificationScreen; 