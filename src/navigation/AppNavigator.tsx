import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/LoginScreen';
import SignupScreen from 'screens/SignupScreen';
import EmailVerificationScreen from 'screens/EmailVerificationScreen';
import HomeScreen from 'screens/HomeScreen';
import WelcomeScreen from 'screens/WelcomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  EmailVerification: { email: string};
  Home: undefined;
  PokemonDetail: {
    pokemon: {
      name: string;
      id: string;
      types: Array<{
        type: {
          name: string;
        };
      }>;
      height: number;
      weight: number;
      abilities: string[];
      stats: Array<{
        base_stat: number;
        stat: { name: string };
      }>;
      species: {
        flavor_text: string;
      };
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {


  return (

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
 
  );
};

export default AppNavigator;
