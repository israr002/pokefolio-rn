import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from 'components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING } from 'theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { ImageSelector } from 'components/ImageSelector';
import CustomButton from 'components/CustomButton';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { APP_CONSTANTS } from 'constants/appConstants';
import { signUp } from 'services/authService';
import Toast from 'components/Toast';
import { signupSchema, SignupFormData } from 'schemas/authSchema';

const SignupScreen = ({ navigation }: any) => {
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleImageSelected = (uri: string) => setProfilePhoto(uri);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const result = await signUp(data, profilePhoto);
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      } else {
        navigation.navigate('EmailVerification', {
          email: data.email,
          password: data.password,
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                />
              </View>
              <FormInput
                control={control}
                name="displayName"
                label={APP_CONSTANTS.DISPLAY_NAME_LABEL}
                placeholder={APP_CONSTANTS.DISPLAY_NAME_PLACEHOLDER}
                autoCapitalize="words"
                error={errors.displayName?.message}
              />
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
        </ScrollView>
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
    paddingHorizontal: SPACING[4],
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: SPACING[4],
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING[8],
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
    marginTop: SPACING[6],
  },
  footerText: {
    color: COLORS.text.gray,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  footerLink: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
});

export default SignupScreen;
