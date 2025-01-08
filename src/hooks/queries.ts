import {
  fetchWeb2CocktailById,
  fetchWeb2Categories,
  fetchWeb2CocktailsByCategory,
  searchCocktailsByIngredientName,
  searchCocktailsByName,
} from '@services/cocktails';
import { useQueries, useQuery } from '@tanstack/react-query';
import { WebTypeEnum } from '@custom-types/common';
import { Cocktail } from '@custom-types/cocktails';

export const useWeb2Categories = () => {
  return useQuery({
    queryKey: [`${WebTypeEnum.WEB_2}-categories`],
    queryFn: fetchWeb2Categories,
  });
};

export const useWeb2CocktailsByCategory = (category?: string) => {
  return useQuery({
    queryKey: [`${WebTypeEnum.WEB_2}-cocktails`, category],
    queryFn: () => fetchWeb2CocktailsByCategory(category as string),
    enabled: !!category, // Only fetch if category is defined
  });
};

export const useWeb2CocktailById = (id: string) => {
  return useQuery<Cocktail, Error>({
    queryKey: [`${WebTypeEnum.WEB_2}-cocktail`, id],
    queryFn: () => fetchWeb2CocktailById(id),
    enabled: !!id, // Ensures the query only runs if an ID is provided
  });
};

export const useWeb2CocktailsByIds = (ids: string[]) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: [`${WebTypeEnum.WEB_2}-cocktail`, id],
      queryFn: () => fetchWeb2CocktailById(id),
    })),
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter(Boolean) as Cocktail[],
      };
    },
  });
};

export const useWeb2Search = (search?: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [`${WebTypeEnum.WEB_2}-search-ingredient`, search],
        queryFn: () => searchCocktailsByIngredientName(search as string),
        enabled: !!search, // Only fetch if search is defined
      },
      {
        queryKey: [`${WebTypeEnum.WEB_2}-search-name`, search],
        queryFn: () => searchCocktailsByName(search as string),
        enabled: !!search, // Only fetch if search is defined
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
