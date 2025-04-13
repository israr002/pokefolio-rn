import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from 'components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { ImageSelector } from 'components/ImageSelector';
import CustomButton from 'components/CustomButton';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { getAuthErrorMessage } from 'utils/authErrors';
import { APP_CONSTANTS } from 'constants/appConstants';

const signupSchema = z
  .object({
    email: z.string().email(APP_CONSTANTS.EMAIL_INVALID),
    password: z.string().min(6, APP_CONSTANTS.PASSWORD_TOO_SHORT),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: APP_CONSTANTS.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupScreen = ({ navigation }: any) => {
  const [profilePhoto, setProfilePhoto] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  React.useEffect(() => {
    if (signupError) {
      const timer = setTimeout(() => {
        setSignupError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [signupError]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // const {signUp, firebaseError} = useAuth();

  const handleImageSelected = (uri: string) => setProfilePhoto(uri);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setSignupError(null);
      // await signUp(data.email, data.password, profilePhoto);
      // navigation.navigate('Home');
    } catch (error: any) {
      console.error('Signup error:', error);
      setSignupError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_CONSTANTS.SIGNUP_TITLE}</Text>
          <Text style={styles.subtitle}>{APP_CONSTANTS.SIGNUP_SUBTITLE}</Text>
        </View>

        <Animated.View style={styles.form} entering={SlideInDown.delay(700)}>
          <View style={styles.logoContainer}>
            <ImageSelector
              imageUri={profilePhoto}
              onImageSelected={handleImageSelected}
              size={120}
              iconSize={60}
              isLoading={isLoading}
            />
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
          <FormInput
            control={control}
            name="confirmPassword"
            label={APP_CONSTANTS.CONFIRM_PASSWORD_LABEL}
            placeholder={APP_CONSTANTS.CONFIRM_PASSWORD_PLACEHOLDER}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
          {signupError && (
            <Text style={styles.errorText}>{signupError}</Text>
          )}
          <CustomButton
            title={APP_CONSTANTS.SIGN_UP_BUTTON}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            isLoading={isLoading}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>{APP_CONSTANTS.HAVE_ACCOUNT_TEXT}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>{APP_CONSTANTS.SIGN_IN_LINK}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: SPACING[8],
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.white,
    marginBottom: SPACING[1],
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.white,
  },
  form: {
    gap: SPACING[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING[8],
  },
  footerText: {
    color: COLORS.text.gray,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  footerLink: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  errorText: {
    color: COLORS.text.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: SPACING[1],
    textAlign: 'center',
  },
});

export default SignupScreen;
