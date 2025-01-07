import {
  CategoriesResponse,
  Cocktail,
  CocktailsResponse,
} from '@custom-types/cocktails';
import { handleAppError } from '@utils/error-handle';
import axios from 'axios';

export const fetchWeb2Categories = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get<CategoriesResponse>(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
    return data.drinks.map((drink) => drink.strCategory);
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};
export const fetchWeb2CocktailsByCategory = async (
  category: string
): Promise<Cocktail[]> => {
  try {
    const { data } = await axios.get<CocktailsResponse>(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
    );

    // Map API data to Cocktail interface
    return data.drinks.map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
      category,
    }));
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};

export const fetchWeb2CocktailById = async (id: string): Promise<Cocktail> => {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const drink = response.data.drinks?.[0];

    if (!drink) {
      throw new Error(`Cocktail with ID ${id} not found`);
    }

    return {
      id: drink.idDrink,
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
      category: drink.strCategory,
      ingredients: Array.from({ length: 15 })
        .map((_, i) => drink[`strIngredient${i + 1}`])
        .filter(Boolean),
      cocktailType: drink.strAlcoholic,
    };
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};
