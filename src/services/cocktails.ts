import {
  CategoriesResponse,
  Category,
  Cocktail,
  CocktailsResponse,
} from '@tools/types/cocktails';
import { handleAppError } from '@tools/utils/error-handle';
import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchWeb2Categories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get<CategoriesResponse>(
      `${API_URL}/list.php?c=list`
    );

    // Map API data to Category interface
    return data.drinks.map(
      (drink, index) =>
        ({
          id: index + 1,
          name: drink.strCategory,
        }) as unknown as Category
    );
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};
export const fetchWeb2CocktailsByCategory = async (
  category: string
): Promise<Cocktail[]> => {
  try {
    const { data } = await axios.get<CocktailsResponse>(
      `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
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
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
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
        .map((_, i) => {
          const measure = drink[`strMeasure${i + 1}`];
          const ingredient = drink[`strIngredient${i + 1}`];
          return measure && ingredient && `${measure} ${ingredient}`;
        })
        .filter(Boolean),
      instructions: drink.strInstructions,
      cocktailType: drink.strAlcoholic,
    };
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};

export const searchWeb2CocktailsByIngredientName = async (
  ingredient: string
) => {
  try {
    const response = await axios
      .get<CocktailsResponse>(`${API_URL}/filter.php?i=${ingredient}`)
      .then((response) => response.data.drinks || []);

    if (!response.length) {
      throw new Error(`Cocktails with Ingredient ${ingredient} not found`);
    }

    // In case no result is found, return an empty array
    if (!Array.isArray(response)) return [];

    return response.map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
    })) as Cocktail[];
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};

export const searchWeb2CocktailsByName = async (name: string) => {
  try {
    const response = await axios
      .get<CocktailsResponse>(`${API_URL}/search.php?s=${name}`)
      .then((response) => response.data.drinks || []);

    if (!response.length) {
      throw new Error(`Cocktail with name ${name} not found`);
    }

    // In case no result is found, return an empty array
    if (!Array.isArray(response)) return [];

    return response.map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
    })) as Cocktail[];
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};

export const fetchWeb2RandomCocktail = async () => {
  try {
    const response = await axios
      .get(`${API_URL}/random.php`)
      .then((response) => response.data.drinks || []);
    if (!response.length) {
      throw new Error(`Random cocktail not found`);
    }

    // In case no result is found, return null
    if (!Array.isArray(response)) return null;

    const data = response.map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
      category: drink.strCategory,
      ingredients: Array.from({ length: 15 })
        .map((_, i) => {
          const measure = drink[`strMeasure${i + 1}`];
          const ingredient = drink[`strIngredient${i + 1}`];
          return measure && ingredient && `${measure} ${ingredient}`;
        })
        .filter(Boolean),
      instructions: drink.strInstructions,
      cocktailType: drink.strAlcoholic,
    }));
    return data[0] as Cocktail;
  } catch (error: unknown) {
    throw handleAppError(error);
  }
};
