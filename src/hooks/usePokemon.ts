import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from 'api/pokemonApi';
import { API } from 'constants/config';
import { PokemonDetails } from 'types/pokemon';

export const usePokemonList = (limit: number = API.POKEMON_PER_PAGE) => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({pageParam}: {pageParam: number}) =>
      pokemonApi.getPokemonList(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const nextOffset = lastPage.next?.match(/offset=(\d+)/)?.[1];
      return nextOffset ? parseInt(nextOffset, 10) : undefined;
    },
    retry: (failureCount, error: any) => {
      if (
        error.message === 'No internet connection' ||
        error.message === 'Request timeout'
      ) {
        return failureCount < API.RETRY_ATTEMPTS;
      }
      return false;
    },
  });
};

export const usePokemonDetails = (id: string) => {
  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', 'details', id],
    queryFn: () => pokemonApi.getPokemonDetails(id),
    enabled: !!id,
    retry: (failureCount, error: any) => {
      if (
        error.message === 'No internet connection' ||
        error.message === 'Request timeout'
      ) {
        return failureCount < 3;
      }
      return false;
    },
  });
};
