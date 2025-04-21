import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPE_COLORS, TYPOGRAPHY, BORDER_RADIUS} from '../theme/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PokemonDetails } from 'types/pokemon';

type PokemonType = keyof typeof TYPE_COLORS;

interface PokemonStatsProps {
  pokemon: PokemonDetails;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({pokemon}) => {
  const primaryType = pokemon.types[0].type.name as PokemonType;

  return (
    <View style={styles.statsSection}>
      <Text
        style={[
          styles.dataTitle,
          {
            color: TYPE_COLORS[primaryType],
            marginTop: SPACING[4],
          },
        ]}>
        Base Stats
      </Text>
      {pokemon.stats.map(stat => {
        const statBarWidth = useSharedValue(0);
        
        useEffect(() => {
          statBarWidth.value = withTiming(stat.base_stat, {duration: 1000});
        }, []);

        const statBarStyle = useAnimatedStyle(() => ({
          width: `${statBarWidth.value}%`,
        }));

        return (
          <View key={stat.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.stat.name}</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
            <View style={styles.statBarContainer}>
              <Animated.View
                style={[
                  styles.statBar,
                  {
                    backgroundColor: TYPE_COLORS[primaryType],
                  },
                  statBarStyle,
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  statsSection: {
    paddingHorizontal: SPACING[4],
  },
  dataTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginVertical: SPACING[6],
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING[2],
  },
  statName: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  statValue: {
    width: 40,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textAlign: 'right',
    marginRight: SPACING[2],
  },
  statBarContainer: {
    flex: 2,
    height: 8,
    backgroundColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
});

export default PokemonStats; 