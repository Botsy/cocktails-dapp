import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
} from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { FavoritesProvider, useFavourites } from './favorites';
import { Cocktail } from '@tools/types/cocktails';
import { WebTypeEnum } from '@tools/types/enums';
import { toaster } from '@components/ui/toaster';

const mocks = vi.hoisted(() => ({
  hash: '78431466719faa0a5e9fdaf40cde75fd787e99da34546255b547047eb5cd264b',
}));

// Mock dependencies
vi.mock('@tools/utils/favourites', () => ({
  generateCocktailHash: vi.fn(() => Promise.resolve(mocks.hash)),
}));

vi.mock('@components/ui/toaster', () => ({
  toaster: { create: vi.fn() },
}));

const setup = (webType: WebTypeEnum) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FavoritesProvider webType={webType}>{children}</FavoritesProvider>
  );
  return renderHook(() => useFavourites(), { wrapper });
};

describe('FavoritesProvider and useFavourites', () => {
  const localStorageKey = `${WebTypeEnum.TEST}-favourites`;

  const mockCocktail: Cocktail = {
    id: '1',
    name: 'Mojito',
    category: 'Classic',
    imageUrl: 'https://example.com/mojito.jpg',
    price: 10,
    alcoholPercentage: 12,
    cocktailType: 'Alcoholic',
    averageRating: 4,
  };

  beforeAll(() => localStorage.clear());

  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => localStorage.clear());

  it('should initialize with empty favourites if localStorage is empty', () => {
    const { result } = setup(WebTypeEnum.TEST);

    expect(result.current.getFavouriteIds()).toEqual([]);
    expect(localStorage.getItem(localStorageKey)).toBeNull();
  });

  it('should initialize with favourites from localStorage', () => {
    const storedFavourites = JSON.stringify([`${mocks.hash}1`]);
    localStorage.setItem(localStorageKey, storedFavourites);

    const { result } = setup(WebTypeEnum.TEST);

    expect(result.current.getFavouriteIds()).toEqual(['1']);
  });

  it('should add a favourite', async () => {
    const { result } = setup(WebTypeEnum.TEST);

    await act(async () => {
      await result.current.addFavourite(mockCocktail);
    });

    const storedFavourites = JSON.parse(localStorage.getItem(localStorageKey)!);
    expect(storedFavourites).toEqual([`${mocks.hash}1`]);
    expect(result.current.getFavouriteIds()).toEqual(['1']);
    expect(toaster.create).toHaveBeenCalledWith({
      description: 'Mojito was added to favourites',
      type: 'info',
    });
  });

  it('should not add a duplicate favourite', async () => {
    const { result } = setup(WebTypeEnum.TEST);

    await act(async () => {
      await result.current.addFavourite(mockCocktail);
      await result.current.addFavourite(mockCocktail);
    });

    const storedFavourites = JSON.parse(localStorage.getItem(localStorageKey)!);
    expect(storedFavourites).toEqual([`${mocks.hash}1`]);
    expect(result.current.getFavouriteIds()).toEqual(['1']);
    expect(toaster.create).toHaveBeenCalledTimes(1);
  });

  it('should remove a favourite', async () => {
    const { result } = setup(WebTypeEnum.TEST);

    await act(async () => {
      await result.current.addFavourite(mockCocktail);
      await result.current.removeFavourite(mockCocktail);
    });

    const storedFavourites = localStorage.getItem(localStorageKey);
    expect(storedFavourites).toEqual('[]');
    expect(result.current.getFavouriteIds()).toEqual([]);
    expect(toaster.create).toHaveBeenCalledWith({
      description: 'Mojito was removed from favourites',
      type: 'info',
    });
  });

  it('should not remove a non-existent favourite', async () => {
    const { result } = setup(WebTypeEnum.TEST);

    await act(async () => {
      await result.current.removeFavourite(mockCocktail);
    });

    const storedFavourites = localStorage.getItem(localStorageKey);
    expect(storedFavourites).toBeNull();
    expect(result.current.getFavouriteIds()).toEqual([]);
    expect(toaster.create).not.toHaveBeenCalled();
  });

  it('should check if a cocktail is a favourite', async () => {
    const { result } = setup(WebTypeEnum.TEST);

    await act(async () => {
      await result.current.addFavourite(mockCocktail);
    });

    const isFavourite = await result.current.isFavourite(mockCocktail);
    expect(isFavourite).toBe(true);

    const nonFavouriteCocktail = { ...mockCocktail, id: '2' };
    const isNonFavourite =
      await result.current.isFavourite(nonFavouriteCocktail);
    expect(isNonFavourite).toBe(false);
  });

  it('should throw an error if used outside provider', () => {
    const { result } = renderHook(() => useFavourites());

    expect(result.error).toEqual(
      new Error('useFavorites must be used within a FavoritesProvider')
    );
  });
});
