import {
  fetchWeb2Categories,
  fetchWeb2CocktailsByCategory,
} from '@services/cocktails';
import { useQuery } from '@tanstack/react-query';
import { WebTypeEnum } from '@custom-types/common';

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
