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
  alcoholPercentage?: number;
  cocktailType?: string;
  price?: number;
  totalRatings?: number;
  numberOfRatings?: number;
}

export interface Category {
  id: string;
  name: string;
}
