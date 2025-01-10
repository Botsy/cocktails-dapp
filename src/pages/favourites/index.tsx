import { FC } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CocktailsGrid from '@components/common/cocktails-grid';
import Spinner from '@components/common/spinner';
import { useFavourites } from '@contexts/favorites';
import { useIsWeb3Route } from '@hooks/common';
import { useWeb2CocktailsByIds, useWeb3CocktailsByIds } from '@hooks/queries';

export const FavouritesPage: FC = () => {
  const { getFavouriteIds } = useFavourites();
  const favouriteIds = getFavouriteIds();
  const isWeb3 = useIsWeb3Route();
  const useQueryFn = isWeb3 ? useWeb3CocktailsByIds : useWeb2CocktailsByIds;

  // Fetch favorite cocktails by their ids
  const { data: favoriteCocktails, isLoading } = useQueryFn(favouriteIds);

  return (
    <Box width="100%" p="4">
      <Heading fontSize="xl" fontWeight="bold" mb="6">
        Favorite Cocktails
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <CocktailsGrid cocktails={favoriteCocktails} />
      )}
    </Box>
  );
};

export default FavouritesPage;
