import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { toaster } from '@components/ui/toaster';
import { Cocktail } from '@tools/types/cocktails';
import { generateCocktailHash } from '@tools/utils/favourites';
import { WebTypeEnum } from '@tools/types/enums';

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
        toaster.create({
          description: `${cocktail.name} was added to favourites`,
          type: 'info',
        });
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
        toaster.create({
          description: `${cocktail.name} was removed from favourites`,
          type: 'info',
        });
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

export const useFavourites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
