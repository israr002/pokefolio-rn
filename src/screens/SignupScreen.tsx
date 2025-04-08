import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import auth from '@react-native-firebase/auth';
import FormInput from 'components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/theme';


const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupScreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [firebaseError, setFirebaseError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const {email,password} = data;
    try {
      setFirebaseError(null);

      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('email', { message: 'Email is already in use' });
      } else if (error.code === 'auth/weak-password') {
        setError('password', { message: 'Password is too weak' });
      } else {
        setFirebaseError('An error occurred. Please try again.');
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode
        ? COLORS.background.dark
        : COLORS.background.light,
    },
    gradientContainer: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: SPACING[4],
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: SPACING[8],
      marginBottom: SPACING[8],
    },
    logo: {
      width: 180,
      height: 180,
      marginVertical: SPACING[4],
      opacity: 0.2,
      tintColor: COLORS.text.light,
    },
    title: {
      fontSize: TYPOGRAPHY.fontSize['3xl'],
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: isDarkMode ? COLORS.text.light : COLORS.text.dark,
      marginBottom: SPACING[1],
    },
    subtitle: {
      fontSize: TYPOGRAPHY.fontSize.base,
      color: COLORS.text.gray,
      textAlign: 'center',
      marginBottom: SPACING[8],
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
    },
    buttonText: {
      color: COLORS.text.light,
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
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
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    errorText: {
      color: COLORS.text.error,
      fontSize: TYPOGRAPHY.fontSize.sm,
      marginTop: SPACING[1],
    },
  });

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/pokeball.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Pokémon community</Text>
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

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword?.message}
          />

          {firebaseError && (
            <Text style={styles.errorText}>{firebaseError}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default SignupScreen;
