import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Pokemon} from 'types/pokemon';
import {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPE_COLORS,
  TYPOGRAPHY,
} from '../theme/theme';
import MaskedText from '../components/MaskedText';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import {getPokemonImageUrl} from 'utils/pokemon';
import PokemonDetailHeader from '../components/PokemonDetailHeader';
import PokemonStats from '../components/PokemonStats';
import TypeBadge from '../components/TypeBadge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PokemonType = keyof typeof TYPE_COLORS;

interface PokemonDetailScreenProps {
  route: {params: {pokemon: Pokemon}};
  navigation: any;
}

interface Move {
  move: {
    name: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
  }>;
}

const PokemonDetailScreen: React.FC<PokemonDetailScreenProps> = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const {pokemon} = route.params;
  
  const screenWidth = Dimensions.get('window').width;
  const primaryType = pokemon.types[0].type.name as PokemonType;

  const cardTranslateY = useSharedValue(500);
  const imageTranslateX = useSharedValue(screenWidth);

  useEffect(() => {
    cardTranslateY.value = withTiming(0, {duration: 500});
    imageTranslateX.value = withTiming(0, {duration: 700});
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{translateY: cardTranslateY.value}],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{translateX: imageTranslateX.value}],
  }));

  return (
    <View style={styles.container}>
      <PokemonDetailHeader
        pokemon={pokemon}
        onBackPress={() => navigation.goBack()}
        insets={insets}
      />

      <Animated.View style={[styles.detailsContainer, cardStyle]}>
        <Animated.View style={[styles.imageContainer, imageStyle]}>
          <FastImage
            source={{
              uri: getPokemonImageUrl(pokemon.id),
              priority: FastImage.priority.normal,
            }}
            style={styles.pokemonImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
        <View style={styles.typesContainer}>
          {pokemon.types.map((type, index) => (
            <TypeBadge key={index} type={type.type.name} />
          ))}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.aboutSection}>
            <Text style={[styles.dataTitle, {color: TYPE_COLORS[primaryType]}]}>
              About
            </Text>

            <View style={styles.aboutRow}>
              <View style={styles.aboutColoum}>
                <Text style={styles.dataValue}>
                  {(pokemon.weight / 10).toFixed(1)}kg
                </Text>
                <Text style={styles.dataLabel}>Weight</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.aboutColoum}>
                <Text style={styles.dataValue}>
                  {(pokemon.height / 10).toFixed(1)}m
                </Text>
                <Text style={styles.dataLabel}>Height</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.aboutColoum}>
                <Text style={styles.dataValue} numberOfLines={2}>
                  {pokemon.abilities.map(i => i.ability.name).join(', ')}
                </Text>
                <Text style={styles.dataLabel}>Abilities</Text>
              </View>
            </View>
          
            <PokemonStats pokemon={pokemon} />

            <Text style={[styles.dataTitle, {color: TYPE_COLORS[primaryType], marginTop: SPACING[4]}]}>
              Top 10 Moves
            </Text>
            <View style={styles.movesContainer}>
              {pokemon.moves
                .filter((move: Move) =>
                  move.version_group_details.some(
                    (detail) => detail.level_learned_at === 0,
                  ),
                )
                .slice(0, 10)
                .map((move: Move, index: number) => (
                  <View 
                    key={index} 
                    style={[
                      styles.moveBadge,
                      { 
                        backgroundColor: TYPE_COLORS[primaryType],
                        borderColor: TYPE_COLORS[primaryType]
                      }
                    ]}
                  >
                    <Text style={[styles.moveBadgeText, { color: COLORS.white }]}>
                      {move.move.name.replace(/-/g, ' ')}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  aboutSection: {
    paddingHorizontal: SPACING[4],
  },
  dataTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginVertical: SPACING[6],
    textAlign: 'center',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutColoum: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 60,
  },
  dataLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  dataValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: SPACING[4],
    textAlign: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: COLORS.gray,
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING[2],
    marginTop: SPACING[2],
    paddingHorizontal: SPACING[2],
  },
  moveBadge: {
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moveBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default PokemonDetailScreen;
