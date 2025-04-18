import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'pokemon-storage' });

export const PokemonStorage = {
  // Save color for a Pokemon
  setPokemonColor: (name: string, color: string) => {
    storage.set(`color-${name}`, color);
  },

  // Get color for a Pokemon
  getPokemonColor: (name: string): string | null => {
    return storage.getString(`color-${name}`) || null;
  },


};
