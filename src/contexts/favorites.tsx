import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Cocktail } from '@custom-types/cocktails';
import { generateCocktailHash } from '@utils/favourites';
import { WebTypeEnum } from '@custom-types/common';

const FAVOURITES_STORAGE_KEY = 'favourites';
const HASH_LENGTH = 64;

interface FavoritesContextType {
  favourites: Set<string>;
  addFavourite: (cocktail: Cocktail) => Promise<void>;
  removeFavourite: (cocktail: Cocktail) => Promise<void>;
  isFavourite: (cocktail: Cocktail) => Promise<boolean>;
  getFavouriteIds: () => string[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
  webType: WebTypeEnum;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
  webType,
}) => {
  const localStorageKey = `${webType}-${FAVOURITES_STORAGE_KEY}`;
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedFavourites = localStorage.getItem(localStorageKey);
    if (storedFavourites) {
      setFavourites(new Set(JSON.parse(storedFavourites)));
    }
  }, [localStorageKey]);

  const addFavourite = async (cocktail: Cocktail) => {
    const hash = await generateCocktailHash(cocktail, webType);
    const entry = `${hash}${cocktail.id}`;

    setFavourites((prev) => {
      const newFavourites = new Set(prev);
      if (!newFavourites.has(entry)) {
        newFavourites.add(entry);
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(Array.from(newFavourites))
        );
      }
      return newFavourites;
    });
  };

  const removeFavourite = async (cocktail: Cocktail) => {
    const hash = await generateCocktailHash(cocktail, webType);
    const entry = `${hash}${cocktail.id}`;

    setFavourites((prev) => {
      const newFavourites = new Set(prev);
      if (newFavourites.has(entry)) {
        newFavourites.delete(entry);
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(Array.from(newFavourites))
        );
      }
      return newFavourites;
    });
  };

  const isFavourite = async (cocktail: Cocktail): Promise<boolean> => {
    const hash = await generateCocktailHash(cocktail, webType);
    const entry = `${hash}${cocktail.id}`;
    return favourites.has(entry);
  };

  const getFavouriteIds = () =>
    [...favourites].map((entry) => entry.substring(HASH_LENGTH));

  return (
    <FavoritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        getFavouriteIds,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
