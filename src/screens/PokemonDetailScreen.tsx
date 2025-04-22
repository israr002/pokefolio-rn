import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  StatusBar,
} from 'react-native';
import {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPE_COLORS,
} from 'theme/theme';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/AppNavigator';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import { getPokemonImageUrl } from 'utils/pokemon';
import PokemonDetailHeader from 'components/PokemonDetailHeader';
import PokemonStats from 'components/PokemonStats';
import TypeBadge from 'components/TypeBadge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonDetails } from 'hooks/usePokemon';
import { PokemonType } from 'types/pokemon';
import PokemonAbout from 'components/PokemonAbout';
import PokemonMoves from 'components/PokemonMoves';

const screenWidth = Dimensions.get('window').width;

const PokemonDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const onBackPress = useCallback(() => {
    const stackLength = navigation.getState().routes.length;

    if (stackLength <= 1) {
      navigation.replace('Home');
      return true;
    }

    navigation.goBack();
    return true;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      // This prevents the user from quitting the app if they came from a notification.
      // If the user presses the back button when opened through a notification,
      // there will be no screen left and the app would otherwise quit. By intercepting the back
      // press, we can ensure the user is always navigated to the Home screen instead.
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [onBackPress])
  );

  const { pokemon, pokemonId } = route.params;
  const shouldFetch = !pokemon && !!pokemonId;
  const { data: pokemonDetails, isLoading } = usePokemonDetails(
    shouldFetch ? String(pokemonId) : ''
  );
  const activePokemon = pokemonDetails || pokemon;

  const primaryType = useMemo(
    () => (activePokemon?.types?.[0]?.type?.name as PokemonType) || 'normal',
    [activePokemon]
  );

  const cardTranslateY = useSharedValue(500);
  const imageTranslateX = useSharedValue(screenWidth);

  useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content');
  }, []);

  useEffect(() => {
    if (!isLoading && activePokemon) {
      cardTranslateY.value = 500;
      imageTranslateX.value = screenWidth;
      cardTranslateY.value = withTiming(0, { duration: 500 });
      imageTranslateX.value = withTiming(0, { duration: 700 });
    }
  }, [isLoading, activePokemon, cardTranslateY, imageTranslateX]);


  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: imageTranslateX.value }],
  }));

  if (isLoading || !activePokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PokemonDetailHeader
        pokemon={activePokemon}
        onBackPress={() => navigation.goBack()}
        insets={insets}
      />

      <Animated.View style={[styles.detailsContainer, cardStyle]}>
        <Animated.View style={[styles.imageContainer, imageStyle]}>
          <FastImage
            source={{
              uri: getPokemonImageUrl(activePokemon.id),
              priority: FastImage.priority.normal,
            }}
            style={styles.pokemonImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
        <View style={styles.typesContainer}>
          {activePokemon.types.map((type, index) => (
            <TypeBadge key={index} type={type.type.name} />
          ))}
        </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <PokemonAbout pokemon={activePokemon} typeColor={TYPE_COLORS[primaryType]} />
            <PokemonStats pokemon={activePokemon} />
            {activePokemon.moves && (
              <PokemonMoves pokemon={activePokemon} typeColor={TYPE_COLORS[primaryType]} />
            )}
          </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.65,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.base,
    borderTopRightRadius: BORDER_RADIUS.base,
    padding: SPACING[4],
  },
  imageContainer: {
    position: 'absolute',
    right: 5,
    top: -120,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  typesContainer: {
    flexDirection: 'row',
    marginVertical: SPACING[3],
    marginHorizontal: SPACING[2],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonDetailScreen;
