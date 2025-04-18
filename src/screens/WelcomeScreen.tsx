import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import { APP_CONSTANTS } from '../constants/appConstants';
import CustomButton from 'components/CustomButton';
import { useAuth } from 'contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/AppNavigator';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { user, loading } = useAuth();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!loading) {
      timeout = setTimeout(() => {
        if (!user) {
          navigation.replace('Login');
        } else if (!user.emailVerified) {
          navigation.replace('EmailVerification', { email: user.email });
        } else {
          navigation.replace('Home');
        }
      }, 500);
    }
  
    return () => clearTimeout(timeout);
  }, [user, loading, navigation]);



  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{APP_CONSTANTS.WELCOME_TITLE}</Text>
        <Text style={styles.subtitle}>{APP_CONSTANTS.WELCOME_SUBTITLE}</Text>
        
        <View style={styles.buttonContainer}>
          <CustomButton
            title={APP_CONSTANTS.SIGN_IN_BUTTON}
            onPress={() => navigation.navigate('Login')}
            variant="primary"
          />
          <CustomButton
            title={APP_CONSTANTS.SIGN_UP_BUTTON}
            onPress={() => navigation.navigate('Signup')}
            variant="secondary"
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
    fontSize: TYPOGRAPHY.fontSize['4xl'],
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
  buttonContainer: {
    width: '100%',
    gap: SPACING[4],
  },
});

export default WelcomeScreen; 