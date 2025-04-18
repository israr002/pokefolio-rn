import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {usePokemonList} from 'hooks/usePokemon';
import PokemonCard from 'components/PokemonCard';
import Header from 'components/Header';
import {COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY} from '../theme/theme';
import { PokemonListResponse } from 'types/pokemon';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from 'contexts/AuthContext';
import { handleSignOut } from 'services/authService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Pokemon {
  name: string;
  url: string;
}

const HomeScreen = () => {
  const {data, isLoading, fetchNextPage, isFetchingNextPage} = usePokemonList();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const pokemonList = React.useMemo(() => {
    return data?.pages?.flatMap((page: PokemonListResponse) => page.results) ?? [];
  }, [data]);

  const handlePokemonPress = (pokemon: Pokemon) => {
    // We'll implement this later
    console.log('Pokemon pressed:', pokemon);
  };

  const handleLogout = async () => {
    try {
      const { success } = await handleSignOut();
      if (success) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.transluscent, COLORS.transparent]}
      style={styles.gradientContainer}>
      <View style={styles.innerContainer}>
        <Header onLogout={handleLogout} />
        <View style={styles.content}>
          <FlashList
            data={pokemonList}
            renderItem={({item}: {item: Pokemon}) => (
              <PokemonCard pokemon={item} onPress={handlePokemonPress} />
            )}
            keyExtractor={(item) => item.name}
            estimatedItemSize={200}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.5}
            numColumns={2}
            ListFooterComponent={
              isFetchingNextPage || isLoading ? (
                <ActivityIndicator
                  style={styles.loadingMore}
                  color={COLORS.primary}
                />
              ) : null
            } 
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderColor: "transparent",
  },
  content: {
    flex: 1,
    padding: SPACING[1],
    backgroundColor: COLORS.white,
    borderTopEndRadius: BORDER_RADIUS.base,
    borderTopStartRadius: BORDER_RADIUS.base,
  },
  loadingMore: {
    marginVertical: SPACING[4],
  },
});

export default HomeScreen;
