import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {COLORS, SPACING, TYPE_COLORS, TYPOGRAPHY} from 'theme/theme';
import MaskedText from './MaskedText';
import {Icon} from './Icon';
import LinearGradient from 'react-native-linear-gradient';
import { formatPokemonId } from 'utils/pokemon';
import { PokemonDetails } from 'types/pokemon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPokemonImageUrl } from 'utils/pokemon';
import FastImage from '@d11/react-native-fast-image';

type PokemonType = keyof typeof TYPE_COLORS;

interface PokemonDetailHeaderProps {
  pokemon: PokemonDetails;
  onBackPress: () => void;
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const PokemonDetailHeader: React.FC<PokemonDetailHeaderProps> = ({
  pokemon,
  onBackPress,
  insets,
}) => {
  const primaryType = pokemon.types[0].type.name as PokemonType;
  const secondaryType = pokemon.types[1]?.type.name as PokemonType;

  return (
    <View style={[styles.topBackground, {paddingTop: insets.top}]}>
      <LinearGradient
        colors={[
          TYPE_COLORS[primaryType],
          secondaryType ? TYPE_COLORS[secondaryType] : TYPE_COLORS[primaryType],
        ]}
        style={styles.gradientFill}
      />
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="back" color={COLORS.white} />
      </TouchableOpacity>
      <MaskedText text={pokemon.name} style={styles.gradientText} />
      <View style={styles.topSection}>
        <Text style={styles.pokemonId}>
          {formatPokemonId(pokemon.id)}
        </Text>
        <Text style={styles.headerText}>{pokemon.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    flex: 0.35,
    paddingHorizontal: SPACING[1],
    justifyContent: 'flex-start',
  },
  gradientFill: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientText: {
    alignSelf: 'center',
  },
  topSection: {
    paddingVertical: SPACING[6],
    paddingHorizontal: SPACING[8],
  },
  headerText: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
  },
});

export default PokemonDetailHeader; 
