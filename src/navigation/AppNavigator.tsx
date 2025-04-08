import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import {useAuth} from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
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
        stat: {name: string};
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
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
