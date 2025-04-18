import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from 'theme/theme';
import { AuthProvider } from 'contexts/AuthContext';
import { MMKV } from 'react-native-mmkv';

// Create MMKV instance for React Query persistence
const mmkv = new MMKV({
  id: 'react-query-storage',
  encryptionKey: 'react-query-encryption-key'
});

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
});

// Create MMKV persister
const persister = {
  persistClient: async (client: any) => {
    mmkv.set('react-query-cache', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = mmkv.getString('react-query-cache');
    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: async () => {
    mmkv.delete('react-query-cache');
  },
};

// Persist the query client
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: 'pokemon-app-v1', // Cache buster - change this when you want to invalidate all cache
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
