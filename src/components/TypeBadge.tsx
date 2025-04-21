import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPE_COLORS, TYPOGRAPHY, BORDER_RADIUS} from 'theme/theme';

type PokemonType = keyof typeof TYPE_COLORS;

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({type}) => {
  return (
    <View
      style={[
        styles.typeBadge,
        {backgroundColor: TYPE_COLORS[type as PokemonType]},
      ]}>
      <Text style={styles.typeBadgeText}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typeBadge: {
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING[2],
    minWidth: 65,
    alignItems: 'center',
  },
  typeBadgeText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textTransform: 'capitalize',
  },
});

export default TypeBadge; 
