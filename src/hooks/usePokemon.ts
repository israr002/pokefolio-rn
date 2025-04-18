import { useInfiniteQuery} from '@tanstack/react-query';
import { pokemonApi } from 'api/pokemonApi';
import { API } from 'constants/config';

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
    staleTime: API.CACHE_DURATION * 1000, // Convert seconds to milliseconds
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