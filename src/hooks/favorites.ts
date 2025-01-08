import { useState, useEffect } from 'react';
import { Cocktail } from '@custom-types/cocktails';
import { generateCocktailHash } from '@utils/favourites';
import { WebTypeEnum } from '@custom-types/enums';

const FAVOURITES_STORAGE_KEY = 'favourites';
const HASH_LENGTH = 64;

export const useFavourites = (webType: WebTypeEnum) => {
  const localStorageKey = `${webType}-${FAVOURITES_STORAGE_KEY}`;
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedFavourites = localStorage.getItem(localStorageKey);
    if (storedFavourites) {
      setFavourites(new Set(JSON.parse(storedFavourites)));
    }
  }, [localStorageKey]);

  // Helper function to handle hashing asynchronously
  const getCocktailHash = async (cocktail: Cocktail): Promise<string> => {
    const hash = await generateCocktailHash(cocktail, webType);
    return `${hash}${cocktail.id}`;
  };

  const addFavourite = async (cocktail: Cocktail) => {
    const hash = await getCocktailHash(cocktail);
    setFavourites((prev) => {
      const newFavourites = new Set(prev);
      if (!newFavourites.has(hash)) {
        newFavourites.add(hash);
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(Array.from(newFavourites))
        );
      }
      return newFavourites;
    });
  };

  const removeFavourite = async (cocktail: Cocktail) => {
    const hash = await getCocktailHash(cocktail);
    setFavourites((prev) => {
      const newFavourites = new Set(prev);
      if (newFavourites.has(hash)) {
        newFavourites.delete(hash);
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(Array.from(newFavourites))
        );
      }
      return newFavourites;
    });
  };

  const isFavourite = async (cocktail: Cocktail): Promise<boolean> => {
    const hash = await getCocktailHash(cocktail);
    return favourites.has(hash);
  };

  const getFavouriteIds = () =>
    [...favourites].map((entry) => entry.substring(HASH_LENGTH));

  return {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    getFavouriteIds,
  };
};
