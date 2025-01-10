export interface CategoryResponseModel {
  strCategory: string;
}

export interface CategoriesResponse {
  drinks: CategoryResponseModel[];
}

export interface CocktailResponseModel {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strInstructions: string;
  strAlcoholic: string;
}

export interface CocktailsResponse {
  drinks: CocktailResponseModel[];
}

export interface Cocktail {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  ingredients?: string[];
  instructions?: string;
  alcoholPercentage?: number;
  cocktailType?: string;
  price?: number;
  averageRating?: number;
}

export interface Category {
  id: string;
  name: string;
}
