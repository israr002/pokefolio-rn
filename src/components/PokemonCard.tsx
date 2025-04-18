import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, NativeModules } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import { getPokemonIdFromUrl, getPokemonImageUrl } from 'utils/pokemon';

interface PokemonCardProps {
  pokemon: { name: string; url: string };
  onPress: (pokemon: { name: string; url: string }) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPress,
}) => {
  const [bgColor, setBgColor] = useState(COLORS.white);

  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const pokemonPicture = getPokemonImageUrl(pokemonId);
  const { ImageColors } = NativeModules;

  useEffect(() => {

    ImageColors.getColors(pokemonPicture, "#ffffff")
      .then((color: any) => {
        setBgColor(color);
      })
      .catch((err: Error) => {
        console.error('Error getting colors:', err);
      });
  }, []);

  const handlePress = () => {
    onPress(pokemon);
  };

  const formatPokemonId = (id: string | number): string => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.number}>{formatPokemonId(pokemonId)}</Text>
      </View>

      <Image
        source={require('assets/images/pokeball.png')}
        style={styles.pokeball}
        resizeMode="contain"
        tintColor="white"
      />

      <Image
        source={{ uri: pokemonPicture }}
        style={styles.pokemonImage}
        resizeMode="contain"
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
    // alignItems: 'center',
    height: 100,

    paddingHorizontal: SPACING[3],

    backgroundColor: COLORS.white,
    // opacity:0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    // backgroundColor: COLORS.white,
    zIndex: 3,
    position: 'relative',
  },
  number: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: 'rgba(23, 23, 27, 0.6)',
    marginBottom: 4,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: "#D6D6D6",
    textTransform: 'capitalize',
    marginBottom: 4,
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
});

export default PokemonCard;
