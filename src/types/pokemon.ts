import { TYPE_COLORS } from 'theme/theme';

export type PokemonType = keyof typeof TYPE_COLORS;

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
  }>;
}

export interface PokemonSpecies {
  flavor_text: string;
}

export interface PokemonSprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface BasePokemon {
  id: number;
  name: string;
  types: Array<{
    type: {
      name: PokemonType;
    };
  }>;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: PokemonSpecies;
}

export interface Pokemon extends BasePokemon {
  moves: PokemonMove[];
}

export interface PokemonDetails extends BasePokemon {
  sprites: PokemonSprites;
  moves?: PokemonMove[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}