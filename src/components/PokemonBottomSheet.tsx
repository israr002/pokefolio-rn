import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  TYPE_COLORS,
} from '../theme/theme';
import CustomButton from './CustomButton';
import { usePokemonDetails } from '../hooks/usePokemon';
import { getPokemonImageUrl } from 'utils/pokemon';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors';

interface PokemonType {
  type: {
    name: keyof typeof TYPE_COLORS;
  };
}

interface PokemonBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  pokemon: { name: string; url: string };
}

const PokemonBottomSheet: React.FC<PokemonBottomSheetProps> = ({
  bottomSheetRef,
  pokemon,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
  const { data: pokemonDetails, isLoading } = usePokemonDetails(pokemonId);

  const imageScale = useRef(new Animated.Value(0)).current;
  const heightValue = useRef(new Animated.Value(0)).current;
  const weightValue = useRef(new Animated.Value(0)).current;

  const [heightDisplay, setHeightDisplay] = useState('0.0');
  const [weightDisplay, setWeightDisplay] = useState('0.0');

  useEffect(() => {
    if (pokemonDetails) {
      Animated.spring(imageScale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 8,
        mass: 0.5,
      }).start();

      Animated.timing(heightValue, {
        toValue: pokemonDetails.height / 10,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(weightValue, {
        toValue: pokemonDetails.weight / 10,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      const heightListener = heightValue.addListener(({ value }) => {
        setHeightDisplay(value.toFixed(1));
      });
      const weightListener = weightValue.addListener(({ value }) => {
        setWeightDisplay(value.toFixed(1));
      });

      return () => {
        heightValue.removeListener(heightListener);
        weightValue.removeListener(weightListener);
      };
    }
  }, [pokemonDetails]);

  if (!pokemon || !pokemonDetails) return null;

  const handleViewDetails = () => {
    bottomSheetRef.current?.dismiss();
    navigation.navigate('PokemonDetail', { pokemon: pokemonDetails });
  };

  const getTypeGradient = (typeName: keyof typeof TYPE_COLORS) => {
    const baseColor = TYPE_COLORS[typeName];
    return [baseColor, COLORS.white];
  };

  const renderTypeBadge = (typeInfo: PokemonType, index: number) => {
    const typeName = typeInfo.type.name;
    return (
      <View key={index}>
        {/* <View style={styles.pokeballShadow} /> */}
        <View style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[typeName] }]}>
          <Text style={styles.typeText}>{typeName}</Text>
        </View>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['50%']}
      backgroundStyle={styles.bottomSheetBackground}
      animationConfigs={{ duration: 300 }}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <BottomSheetView style={styles.bottomSheetContent}>
          <LinearGradient
            colors={getTypeGradient(pokemonDetails.types[0].type.name)}
            style={styles.imageGradient}
          >
            <Animated.View
              style={[styles.imageContainer, { transform: [{ scale: imageScale }] }]}
            >
              <View style={styles.nameContainer}>
                <View>
                  <Text style={styles.name}>{pokemonDetails.name}</Text>
                  <View style={styles.typesContainer}>
                    {pokemonDetails.types.map(renderTypeBadge)}
                  </View>
                </View>
                <Image
                  source={{ uri: getPokemonImageUrl(pokemonDetails.id) }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{heightDisplay} m</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Weight</Text>
                    <Text style={styles.statValue}>{weightDisplay} kg</Text>
                  </View>
                </View>


              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="View Details"
                  onPress={handleViewDetails}
                  variant="primary"
                />
              </View>
            </Animated.View>
          </LinearGradient>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGradient: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    padding: SPACING[2],
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING[3],
  },
  image: {
    width: 170,
    height: 170,
    alignSelf: 'flex-end',
    //position: 'absolute',
    //right: 10,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    textTransform: 'capitalize',
    //marginTop: -SPACING[12],
    //marginLeft: SPACING[2],
    //position: 'absolute',
    //bottom: 30,
    //left: 30,
  },
  detailsContainer: {
    paddingHorizontal: SPACING[3],
    //backgroundColor: COLORS.transluscent,
    //borderRadius: BORDER_RADIUS.base,
    //padding: SPACING[2],
    margin: SPACING[2],
    //borderWidth: 1,
    //borderColor: COLORS.white
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING[2],
    marginBottom: SPACING[4],
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray,
    marginBottom: SPACING[1],
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.black,
  },
  typesContainer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    marginTop: SPACING[2],
    // flexWrap: 'wrap',
    gap: SPACING[2],
  },
  pokeballShadow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    right: -8,
    top: -8,
    transform: [{ rotate: '45deg' }],
  },
  typeBadge: {
    paddingHorizontal: SPACING[4],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.full,
    //minWidth: 80,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  typeText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    padding: SPACING[2],
  },
});

export default PokemonBottomSheet;
