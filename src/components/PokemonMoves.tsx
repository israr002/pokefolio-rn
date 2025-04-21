import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from 'theme/theme';
import { PokemonDetails } from 'types/pokemon';

interface PokemonMovesProps {
  pokemon: PokemonDetails;
  typeColor: string;
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ pokemon, typeColor }) => {
  return (
    <>
      <Text style={[styles.dataTitle, { color: typeColor, marginTop: SPACING[4] }]}>
        Top 10 Moves
      </Text>
      <View style={styles.movesContainer}>
        {pokemon.moves
          .filter((move) =>
            move.version_group_details.some(
              (detail) => detail.level_learned_at === 0,
            ),
          )
          .slice(0, 10)
          .map((move, index) => (
            <View
              key={index}
              style={[
                styles.moveBadge,
                {
                  backgroundColor: typeColor,
                  borderColor: typeColor,
                },
              ]}>
              <Text style={[styles.moveBadgeText, { color: COLORS.white }]}>
                {move.move.name.replace(/-/g, ' ')}
              </Text>
            </View>
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dataTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginVertical: SPACING[6],
    textAlign: 'center',
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

export default PokemonMoves; 