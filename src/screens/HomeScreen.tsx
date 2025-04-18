import React, { useCallback, useMemo, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { usePokemonList } from 'hooks/usePokemon';
import PokemonCard from 'components/PokemonCard';
import Header from 'components/Header';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';
import { PokemonListResponse } from 'types/pokemon';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from 'contexts/AuthContext';
import { handleSignOut } from 'services/authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getPokemonIdFromUrl, getPokemonImageUrl } from 'utils/pokemon';
import { PokemonStorage } from 'utils/storage';

const { ImageColors } = NativeModules;

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
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const rawList = useMemo(() => {
    return data?.pages?.flatMap((page: PokemonListResponse) => page.results) ?? [];
  }, [data]);

  useEffect(() => {
    const loadPokemonWithColors = async () => {
      const updatedList = await Promise.all(
        rawList.map(async (pokemon) => {
          const cachedColor = PokemonStorage.getPokemonColor(pokemon.name);
          if (cachedColor) {
            return { ...pokemon, bgColor: cachedColor };
          }

          const id = getPokemonIdFromUrl(pokemon.url);
          const image = getPokemonImageUrl(id);

          try {
            const color = await ImageColors.getColors(image, COLORS.white);
            if (color) {
              PokemonStorage.setPokemonColor(pokemon.name, color);
              return { ...pokemon, bgColor: color };
            }
            // If no color is returned, use a default color
            PokemonStorage.setPokemonColor(pokemon.name, COLORS.white);
            return { ...pokemon, bgColor: COLORS.white };
          } catch (error) {
            console.error('Error getting colors:', error);
            // Use a default color on error
            PokemonStorage.setPokemonColor(pokemon.name, COLORS.white);
            return { ...pokemon, bgColor: COLORS.white };
          }
        })
      );
      setPokemonList(updatedList);
    };

    loadPokemonWithColors();
  }, [rawList]);

  const handlePokemonPress = useCallback((pokemon: Pokemon) => {
    console.log('Pokemon pressed:', pokemon);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const { success } = await handleSignOut();
      if (success) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: Pokemon }) => {
    if (!item.bgColor) return null;
    
    return (
      <PokemonCard 
        pokemon={item} 
        onPress={handlePokemonPress} 
        bgColor={item.bgColor}
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
            estimatedItemSize={200}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            numColumns={2}
            removeClippedSubviews
            drawDistance={5}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
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
    padding: SPACING[1],
    backgroundColor: COLORS.white,
    borderTopEndRadius: BORDER_RADIUS.base,
    borderTopStartRadius: BORDER_RADIUS.base,
  },
  loadingIndicator: {
    marginVertical: SPACING[4],
  },
});

export default HomeScreen;
