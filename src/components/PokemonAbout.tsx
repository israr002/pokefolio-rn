import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from 'theme/theme';
import { PokemonDetails } from 'types/pokemon';

interface PokemonAboutProps {
  pokemon: PokemonDetails;
  typeColor: string;
}

const PokemonAbout: React.FC<PokemonAboutProps> = ({ pokemon, typeColor }) => {
  return (
    <View style={styles.aboutSection}>
      <Text style={[styles.dataTitle, { color: typeColor }]}>About</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PokemonAbout; 