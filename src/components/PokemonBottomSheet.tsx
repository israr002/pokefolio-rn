import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
import { getPokemonIdFromUrl, getPokemonImageUrl } from 'utils/pokemon';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from '@d11/react-native-fast-image';
import { Pokemon } from 'types/pokemon';

interface PokemonType {
  type: {
    name: keyof typeof TYPE_COLORS;
  };
}

interface PokemonWithColor {
  name: string;
  url: string;
  bgColor?: string;
}

export interface PokemonBottomSheetRef {
  present: (pokemon: PokemonWithColor) => void;
}

const PokemonBottomSheet = forwardRef<PokemonBottomSheetRef>((_, ref) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonWithColor | null>(null);
  const [pokemonId, setPokemonId] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { data: pokemonDetails, isLoading } = usePokemonDetails(pokemonId);

  useImperativeHandle(ref, () => ({
    present: (pokemon: PokemonWithColor) => {
      const id = getPokemonIdFromUrl(pokemon.url);
      setPokemonId(id);
      setSelectedPokemon(pokemon);
      bottomSheetRef.current?.present();
    },
  }));

  const handleViewDetails = () => {
    bottomSheetRef.current?.dismiss();
    if (pokemonDetails) {
      navigation.navigate('PokemonDetail', { pokemon: pokemonDetails });
    }
  };

  const getTypeGradient = (typeName: keyof typeof TYPE_COLORS) => {
    const baseColor = TYPE_COLORS[typeName];
    return [baseColor, COLORS.white];
  };

  const renderTypeBadge = (typeInfo: PokemonType, index: number) => {
    const typeName = typeInfo.type.name;
    return (
      <View key={index}>
        <View style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[typeName] }]}>
          <Text style={styles.typeText}>{typeName}</Text>
        </View>
      </View>
    );
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['50%']}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
    >
      {isLoading || !pokemonDetails ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <BottomSheetView style={styles.bottomSheetContent}>
          <LinearGradient
            colors={[selectedPokemon?.bgColor || COLORS.primary, COLORS.white]}
            style={styles.imageGradient}
          >
            <View style={styles.imageContainer}>
              <View style={styles.nameContainer}>
                <View>
                  <Text style={styles.name}>{pokemonDetails.name}</Text>
                  <View style={styles.typesContainer}>
                    {/* {pokemonDetails.types.map(renderTypeBadge)} */}
                  </View>
                </View>

                  <FastImage
         source={{ uri: getPokemonImageUrl(pokemonDetails.id) }}
         style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{(pokemonDetails.height / 10).toFixed(1)} m</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Weight</Text>
                    <Text style={styles.statValue}>{(pokemonDetails.weight / 10).toFixed(1)} kg</Text>
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
            </View>
          </LinearGradient>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
});

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
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    paddingHorizontal: SPACING[3],
    margin: SPACING[2],
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
    color: COLORS.white,
    marginBottom: SPACING[1],
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.black,
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: SPACING[2],
    gap: SPACING[2],
  },
  typeBadge: {
    paddingHorizontal: SPACING[4],
    paddingVertical: SPACING[1],
    borderRadius: BORDER_RADIUS.full,
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
