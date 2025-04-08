import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import auth from '@react-native-firebase/auth';

import FormInput from 'components/FormInput';
import {COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS} from 'theme/theme';
import {getAuthErrorMessage} from 'utils/authErrors';
import {authSchema, AuthFormData} from 'schemas/authSchema';

const ERROR_DISPLAY_DURATION = 5000; // 5 seconds

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Clear error message after duration
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, ERROR_DISPLAY_DURATION);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background.light,
    },
    content: {
      flex: 1,
      padding: SPACING[4],
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: SPACING[8],
      marginBottom: SPACING[4],
    },
    logo: {
      width: 180,
      height: 180,
      marginVertical: SPACING[4],
      opacity: 0.2,
      tintColor: COLORS.text.dark,
    },
    title: {
      fontSize: TYPOGRAPHY.fontSize['3xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.text.dark,
      marginBottom: SPACING[1],
      textAlign: 'center',
    },
    subtitle: {
      fontSize: TYPOGRAPHY.fontSize.base,
      color: COLORS.text.gray,
      textAlign: 'center',
      marginBottom: SPACING[4],
    },
    form: {
      gap: SPACING[4],
    },
    button: {
      backgroundColor: COLORS.primary,
      padding: SPACING[4],
      borderRadius: BORDER_RADIUS.base,
      alignItems: 'center',
      marginTop: SPACING[4],
      opacity: isLoading ? 0.7 : 1,
    },
    buttonText: {
      color: COLORS.text.light,
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 'auto',
      paddingBottom: SPACING[4],
    },
    footerText: {
      color: COLORS.text.gray,
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    footerLink: {
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    errorContainer: {
      backgroundColor: COLORS.status.error + '20',
      padding: SPACING[3],
      borderRadius: BORDER_RADIUS.base,
      marginTop: SPACING[2],
    },
    errorText: {
      color: COLORS.status.error,
      fontSize: TYPOGRAPHY.fontSize.sm,
      textAlign: 'center',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('assets/images/pokeball.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your Pokémon journey
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password?.message}
          />

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.text.light} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
