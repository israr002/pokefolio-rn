import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import messaging from '@react-native-firebase/messaging';
import { useAuth } from 'contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import pokeball from 'assets/images/pokeball.png';
import { APP_CONSTANTS } from 'constants/appConstants';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { user, loading } = useAuth();
  const [greeting, setGreeting] = useState('');

  const getGreeting = useCallback(() => {
    const nycTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const [hours, minutes] = nycTime.split(':').map(Number);
    const time = hours * 100 + minutes;

    if (time >= 500 && time < 1000) {return APP_CONSTANTS.GREETING_MORNING;}
    if (time >= 1000 && time < 1200) {return APP_CONSTANTS.GREETING_LATE_MORNING;}
    if (time >= 1200 && time < 1700) {return APP_CONSTANTS.GREETING_AFTERNOON;}
    if (time >= 1700 && time < 2100) {return APP_CONSTANTS.GREETING_EVENING;}
    return APP_CONSTANTS.GREETING_NIGHT;
  }, []);

  useEffect(() => {
    setGreeting(getGreeting());
  }, [getGreeting]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    const checkInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();

      if (initialNotification?.data) {
        const { screen, pokemonId } = initialNotification.data;

        if (screen === 'PokemonDetail' && pokemonId && user?.emailVerified) {
          navigation.replace('PokemonDetail', { pokemonId: Number(pokemonId) });
          return;
        }
      }

      timeoutId = setTimeout(() => {
        if (!user) {
          navigation.replace('Login');
        } else if (!user.emailVerified) {
          navigation.replace('EmailVerification', { email: user.email || '' });
        } else {
          navigation.replace('Home');
        }
      }, 2000);
    };

    if (!loading) {
      checkInitialNotification();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, loading, navigation]);

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
          <Text style={styles.title}>{greeting}</Text>
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '30%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING[8],
  },
  logo: {
    width: 120,
    height: 120,
    opacity: 0.1,
    tintColor: COLORS.white,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
