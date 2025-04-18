// utils/pokemonUtils.ts

import { IMAGE } from 'constants/config';

export const getPokemonIdFromUrl = (url: string): string => {
    return url.split('/').slice(-2, -1)[0];
  };
  
  export const getPokemonImageUrl = (pokemonId: string | number): string => {
    return `${IMAGE.POKEMON_SPRITE_BASE_URL}/${pokemonId}.png`;
  };
  