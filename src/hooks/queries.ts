import {
  fetchWeb2CocktailById,
  fetchWeb2Categories,
  fetchWeb2CocktailsByCategory,
  searchCocktailsByIngredientName,
  searchCocktailsByName,
  fetchRandomCocktail,
} from '@services/cocktails';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Web2QueryKeyEnum } from '@custom-types/enums';
import { Cocktail } from '@custom-types/cocktails';

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
    enabled: !!id, // Ensures the query only runs if an ID is provided
  });
};

export const useWeb2CocktailsByIds = (ids: string[], enabled: boolean) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [Web2QueryKeyEnum.GET_COCKTAIL_BY_ID, id],
      queryFn: () => fetchWeb2CocktailById(id),
      enabled,
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
        queryFn: () => searchCocktailsByIngredientName(search as string),
        enabled: !!search,
      },
      {
        queryKey: [Web2QueryKeyEnum.GET_SEARCH_RESULT_BY_NAME, search],
        queryFn: () => searchCocktailsByName(search as string),
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
    queryFn: () => fetchRandomCocktail(),
    enabled,
  });
};
