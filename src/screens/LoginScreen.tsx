import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from 'components/Icon';
import { APP_CONSTANTS } from 'constants/appConstants';
import { signInWithEmail, signInWithGoogle, resendVerificationEmail } from 'services/authService';
import { getAuthErrorMessage } from 'utils/authErrors';
import FormInput from 'components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import CustomButton from 'components/CustomButton';
import { authSchema, AuthFormData } from 'schemas/authSchema';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import pokeball from 'assets/images/pokeball.png';
import { EmailVerificationModal } from 'components/EmailVerificationModal';
import Toast from 'components/Toast';

type LoginFormData = z.infer<typeof authSchema>;

const LoginScreen = ({ navigation }: any) => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showVerificationModal, setShowVerificationModal] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState<string>('');
  const [isResending, setIsResending] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  React.useEffect(() => {
    if (toast && toast.message) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsEmailLoading(true);
      const result = await signInWithEmail(data.email, data.password);
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      } else if (!result.emailVerified) {
        setCurrentEmail(data.email);
        setShowVerificationModal(true);
      }else{
        navigation.navigate('Home');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signInWithGoogle();
      if (result.success) {
        navigation.navigate('Home');
      } else {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      }
    } catch (error: any) {
      setToast({ message: getAuthErrorMessage(error), type: 'error' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      const result = await resendVerificationEmail();
      if (result.success) {
        setIsEmailSent(true);
      } 
    } catch (error: any) {
      console.error(APP_CONSTANTS.AUTH_ERROR_LOG, error);
    } finally {
      setIsResending(false);
    }
  };

  React.useEffect(() => {
    if (!showVerificationModal) {
      setIsEmailSent(false);
    }
  }, [showVerificationModal]);

  const goToSignup = React.useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
      <View style={styles.content}>
        <Animated.View
          entering={FadeInUp.delay(700)}
          style={styles.logoContainer}>
          <Image
            source={pokeball}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_CONSTANTS.LOGIN_TITLE}</Text>
          <Text style={styles.subtitle}>
            {APP_CONSTANTS.LOGIN_SUBTITLE}
          </Text>
        </View>

        
          <FormInput
            control={control}
            name="email"
            label={APP_CONSTANTS.EMAIL_LABEL}
            placeholder={APP_CONSTANTS.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />
          <FormInput
            control={control}
            name="password"
            label={APP_CONSTANTS.PASSWORD_LABEL}
            placeholder={APP_CONSTANTS.PASSWORD_PLACEHOLDER}
            secureTextEntry
            error={errors.password?.message}
          />
          <CustomButton
            title={APP_CONSTANTS.SIGN_IN_BUTTON}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            isLoading={isEmailLoading}
            disabled={isEmailLoading}
          />
    
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>{APP_CONSTANTS.DIVIDER_TEXT}</Text>
          <View style={styles.divider} />
        </View>

        <CustomButton
          title={APP_CONSTANTS.GOOGLE_SIGN_IN}
          onPress={handleGoogleSignIn}
          variant="secondary"
          disabled={isGoogleLoading}
          icon={
            <Icon
              name="google-signin"
              width={20}
              height={20}
              style={styles.googleIcon}
            />
          }
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{APP_CONSTANTS.NO_ACCOUNT_TEXT}</Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.footerLink}>{APP_CONSTANTS.SIGN_UP_LINK}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EmailVerificationModal
        isVisible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onResendEmail={handleResendVerification}
        email={currentEmail}
        isResending={isResending}
        isEmailSent={isEmailSent}
      />
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING[4],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: SPACING[4],
  },
  logo: {
    width: 120,
    height: 120,
    opacity: 0.1,
    tintColor: COLORS.white,
  },
  titleContainer: {
    marginVertical: SPACING[8],
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: SPACING[1],
  },
  form: {
    gap: SPACING[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING[6],
  },
  footerText: {
    color: COLORS.black,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  footerLink: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING[4],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  dividerText: {
    marginHorizontal: SPACING[2],
    color: COLORS.gray[500],
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  errorContainer: {
    backgroundColor: COLORS.status.errorLight,
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.base,
    marginTop: SPACING[2],
  },
  errorText: {
    color: COLORS.text.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: SPACING[2],
  },
});

export default LoginScreen;
