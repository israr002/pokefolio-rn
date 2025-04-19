import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import { getPokemonIdFromUrl, getPokemonImageUrl } from 'utils/pokemon';

interface PokemonCardProps {
  pokemon: { name: string; url: string };
  onPress: (pokemon: { name: string; url: string }) => void;
  bgColor: string;
}

const PokemonCard = ({ pokemon, onPress, bgColor }: PokemonCardProps) => {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const pokemonPicture = getPokemonImageUrl(pokemonId);

  const handlePress = useCallback(() => {
    onPress(pokemon);
  }, [onPress, pokemon]);

  const formatPokemonId = useCallback((id: string | number): string => {
    return `#${id.toString().padStart(3, '0')}`;
  }, []);
console.log("bgColor", bgColor)
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={handlePress}
      activeOpacity={0.7}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.idContainer}>
          <Text style={styles.number}>{formatPokemonId(pokemonId)}</Text>
        </View>
      </View>

      <FastImage
        source={require('assets/images/pokeball.png')}
        style={styles.pokeball}
        resizeMode={FastImage.resizeMode.contain}
        tintColor="white"
      />

      <FastImage
        source={{ uri: pokemonPicture }}
        style={styles.pokemonImage}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: SPACING[1],
    marginHorizontal: SPACING[2],
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.base,
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: SPACING[3],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    zIndex: 3,
    position: 'relative',
    paddingTop : SPACING[2],
    flex: 1,
  },
  number: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.light,
    textAlign: 'center',
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.light,
    textTransform: 'capitalize',
    marginBottom: SPACING[1],
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pokemonImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  pokeball: {
    width: 110,
    height: 110,
    position: 'absolute',
    bottom: -10,
    right: -5,
    opacity: 0.07,
    zIndex: 1,
  },
  idContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: SPACING[2],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.transluscent,
  }
});

export default PokemonCard;

