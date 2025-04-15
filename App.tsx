import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from 'theme/theme';
import { AuthProvider } from 'contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
        <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
      
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
});

export default App;
