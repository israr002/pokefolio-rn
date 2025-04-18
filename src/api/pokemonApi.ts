import { PokemonListResponse } from 'types/pokemon';
import api from './api';
import {API_ENDPOINTS, buildQueryParams} from './endpoints';
import { API } from 'constants/config';

export interface Pokemon {
  name: string;
  url: string;
}

const getPokemonList = async (
  limit: number = API.POKEMON_PER_PAGE,
  offset: number = 0,
): Promise<PokemonListResponse> => {
  try {
    const queryParams = buildQueryParams({limit, offset});
    const response = await api.get<PokemonListResponse>(
      `${API_ENDPOINTS.POKEMON.LIST}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const pokemonApi = {
  getPokemonList,
};
