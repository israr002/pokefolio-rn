import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image ,NativeModules} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import { formatPokemonId, getPokemonIdFromUrl, getPokemonImageUrl } from 'utils/pokemon';
import { PokemonStorage } from 'utils/storage';

const { ImageColors } = NativeModules;

interface PokemonCardProps {
  pokemon: { name: string; url: string };
  onPress: (pokemon: { name: string; url: string; bgColor: string }) => void;
}

const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
  const [bgColor, setBgColor] = useState<string>(COLORS.white);
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const pokemonPicture = getPokemonImageUrl(pokemonId);

  useEffect(() => {
    const loadColor = async () => {
      const cachedColor = PokemonStorage.getPokemonColor(pokemon.name);
      if (cachedColor) {
        setBgColor(cachedColor);
        return;
      }

      try {
        const color = await ImageColors.getColors(pokemonPicture, COLORS.white);
        if (color) {
          PokemonStorage.setPokemonColor(pokemon.name, color);
          setBgColor(color);
        } else {
          PokemonStorage.setPokemonColor(pokemon.name, COLORS.white);
          setBgColor(COLORS.white);
        }
      } catch (error) {
        console.error('Error getting colors:', error);
        PokemonStorage.setPokemonColor(pokemon.name, COLORS.white);
        setBgColor(COLORS.white);
      }
    };

    loadColor();
  }, [pokemon.name, pokemonPicture]);

  const handlePress = useCallback(() => {
    onPress({ ...pokemon, bgColor });
  }, [onPress, pokemon, bgColor]);

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

      <Image
        source={require('assets/images/pokeball.png')}
        style={styles.pokeball}
        tintColor="white"
      />

      <FastImage
        source={{
          uri: pokemonPicture,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable
        }}
        style={styles.pokemonImage}
        resizeMode={FastImage.resizeMode.contain}

      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING[2],
    margin: SPACING[1.5],
    height: 100,
    borderRadius: BORDER_RADIUS.base,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    zIndex: 3,
    position: 'relative',
    paddingTop: SPACING[2],
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
    opacity: 0.09,
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

export default React.memo(PokemonCard);
