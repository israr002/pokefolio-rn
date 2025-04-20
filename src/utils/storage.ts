import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  FOOTER_STATE: 'footer_state',
} as const;

export const getFooterState = () => {
  return storage.getString(StorageKeys.FOOTER_STATE) || 'catch';
};


export const setFooterState = (selectedTab: string) => {
  storage.set(StorageKeys.FOOTER_STATE, selectedTab);
};


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
