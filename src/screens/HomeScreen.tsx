import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { usePokemonList } from 'hooks/usePokemon';
import PokemonCard from 'components/PokemonCard';
import Header from 'components/Header';
import { COLORS, SPACING, BORDER_RADIUS } from 'theme/theme';
import { PokemonListResponse } from 'types/pokemon';
import LinearGradient from 'react-native-linear-gradient';
import { handleSignOut } from 'services/authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PokemonBottomSheet from 'components/PokemonBottomSheet';
import Footer from 'components/Footer';
import { showLocalNotification } from 'services/notificationService';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Pokemon {
  name: string;
  url: string;
  bgColor?: string;
}

const HomeScreen: React.FC = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = usePokemonList();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const run = async () => {
      console.log("====>in local notification");
      await showLocalNotification('🚀 Demo', 'Notification fired automatically!');
    };
    setTimeout(() => {
      run();
    }, 1000);
  }, []);
  console.log("====>data", data);

  const pokemonList = useMemo(() => {
    return data?.pages?.flatMap((page: PokemonListResponse) => page.results) ?? [];
  }, [data]);

  const handlePokemonPress = useCallback((pokemon: Pokemon) => {
    bottomSheetRef.current?.present(pokemon);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const { success } = await handleSignOut();
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });

      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: Pokemon }) => {
    return (
      <PokemonCard
        pokemon={{ name: item.name, url: item.url }}
        onPress={handlePokemonPress}
      />
    );
  }, [handlePokemonPress]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage && !isLoading) return null;
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        color={COLORS.primary}
      />
    );
  }, [isFetchingNextPage, isLoading]);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
      <View style={styles.innerContainer}>
        <Header onLogout={handleLogout} />
        <View style={styles.content}>
          <FlashList
            data={pokemonList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            estimatedItemSize={100}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            numColumns={2}
            removeClippedSubviews
            drawDistance={5}
            ListFooterComponent={renderFooter}
          />
        </View>
        <Footer />
      </View>
      <PokemonBottomSheet ref={bottomSheetRef} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING[1.5],
    paddingTop: SPACING[1.5],
    backgroundColor: COLORS.white,
    borderTopEndRadius: BORDER_RADIUS.base,
    borderTopStartRadius: BORDER_RADIUS.base,
  },
  loadingIndicator: {
    marginVertical: SPACING[4],
  },
});

export default HomeScreen;
