import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Icon } from 'components/Icon';
import { APP_CONSTANTS } from 'constants/appConstants';
import Config from 'react-native-config';
import { signInWithEmailAndPassword, signInWithGoogle } from 'services/authService';
import { getAuthErrorMessage } from 'utils/authErrors';
import FormInput from 'components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import CustomButton from 'components/CustomButton';
import { authSchema, AuthFormData } from 'schemas/authSchema';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import pokeball from 'assets/images/pokeball.png';

type LoginFormData = z.infer<typeof authSchema>;

const LoginScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  GoogleSignin.configure({
    iosClientId: Platform.OS === "ios" ? Config.GOOGLE_IOS_CLIENT_ID : undefined,
    webClientId: Platform.OS === "android" ? Config.GOOGLE_WEB_CLIENT_ID : undefined,
  });

  React.useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        setLoginError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [loginError]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      const result = await signInWithEmailAndPassword(data.email, data.password);
      if (!result.success) {
        setLoginError(result.error);
      }
    } catch (error: any) {
      setLoginError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoginError(null);
      const result = await signInWithGoogle();
      if (!result.success) {
        setLoginError(result.error);
      }
      console.log(result.user)
    } catch (error: any) {
      setLoginError(getAuthErrorMessage(error));
    }
  };

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
        {loginError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{loginError}</Text>
          </View>
        )}
        <CustomButton
          title={APP_CONSTANTS.SIGN_IN_BUTTON}
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          isLoading={isLoading}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <CustomButton
          title={APP_CONSTANTS.GOOGLE_SIGN_IN}
          onPress={handleGoogleSignIn}
          variant="secondary"
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING[4],
  },
  dividerLine: {
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
