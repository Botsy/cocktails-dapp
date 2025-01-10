import {
  fetchWeb2CocktailById,
  fetchWeb2Categories,
  fetchWeb2CocktailsByCategory,
  searchWeb2CocktailsByIngredientName,
  searchWeb2CocktailsByName,
  fetchWeb2RandomCocktail,
} from '@services/cocktails';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Web2QueryKeyEnum, Web3QueryKeyEnum } from '@tools/types/enums';
import { Cocktail } from '@tools/types/cocktails';
import { useCocktailContract } from './contract';

export const useWeb2Categories = () => {
  return useQuery({
    queryKey: [Web2QueryKeyEnum.GET_CATEGORIES],
    queryFn: fetchWeb2Categories,
  });
};

export const useWeb2CocktailsByCategory = (category?: string) => {
  return useQuery({
    queryKey: [Web2QueryKeyEnum.GET_COCKTAILS_BY_CATEGORY, category],
    queryFn: () => fetchWeb2CocktailsByCategory(category as string),
    enabled: !!category, // Only fetch if category is defined
  });
};

export const useWeb2CocktailById = (id: string) => {
  return useQuery({
    queryKey: [Web2QueryKeyEnum.GET_COCKTAIL_BY_ID, id],
    queryFn: () => fetchWeb2CocktailById(id),
    placeholderData: undefined,
    enabled: !!id, // Ensures the query only runs if an ID is provided
  });
};

export const useWeb2CocktailsByIds = (ids: string[]) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [Web2QueryKeyEnum.GET_COCKTAIL_BY_ID, id],
      queryFn: () => fetchWeb2CocktailById(id),
      enabled: !!ids.length,
    })),
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter(Boolean) as Cocktail[],
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

export const useWeb2Search = (search?: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [Web2QueryKeyEnum.GET_SEARCH_RESULT_BY_INGREDIENT, search],
        queryFn: () => searchWeb2CocktailsByIngredientName(search as string),
        enabled: !!search,
      },
      {
        queryKey: [Web2QueryKeyEnum.GET_SEARCH_RESULT_BY_NAME, search],
        queryFn: () => searchWeb2CocktailsByName(search as string),
        enabled: !!search,
      },
    ],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter(Boolean)
          .flat() as Cocktail[],
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

export const useWeb2RandomCocktail = (enabled: boolean) => {
  return useQuery({
    queryKey: [Web2QueryKeyEnum.GET_RANDOM_COCKTAIL],
    queryFn: () => fetchWeb2RandomCocktail(),
    enabled,
  });
};

export const useWeb3CocktailsCount = () => {
  const { getCocktailCount } = useCocktailContract();
  return useQuery({
    queryKey: [Web3QueryKeyEnum.GET_COCKTAILS_COUNT],
    queryFn: getCocktailCount,
  });
};

export const useWeb3CocktailById = (id?: number) => {
  const { getCocktailById } = useCocktailContract();
  return useQuery({
    queryKey: [Web3QueryKeyEnum.GET_COCKTAIL_BY_ID, id],
    queryFn: () => getCocktailById(id as number),
    enabled: !!id,
  });
};

export const useWeb3CocktailsList = (count: number) => {
  const { getCocktailById } = useCocktailContract();
  return useQueries({
    queries: Array.from({ length: count }).map((_, i) => ({
      queryKey: [Web3QueryKeyEnum.GET_COCKTAIL_BY_ID, i],
      // First cocktail is with ID: 0
      queryFn: () => getCocktailById(i),
      staleTime: 1000 * 60 * 60 * 23, // 23h
      enabled: count > 0,
    })),
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter(Boolean) as Cocktail[],
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });
};

export const useWeb3CocktailsByIds = (ids: string[]) => {
  const { getCocktailById } = useCocktailContract();
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [Web3QueryKeyEnum.GET_COCKTAIL_BY_ID, id],
      queryFn: () => getCocktailById(parseInt(id)),
      enabled: !!ids.length,
    })),
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter(Boolean) as Cocktail[],
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

export const useWeb3Search = (search: string) => {
  const { data: cocktailsCount } = useWeb3CocktailsCount();
  const {
    data: allCocktails,
    isLoading,
    isError,
  } = useWeb3CocktailsList(cocktailsCount || 0);

  const filteredCocktails = allCocktails?.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    data: filteredCocktails,
    isLoading,
    isError,
  };
};
