import { Box, Heading } from '@chakra-ui/react';
import CocktailsGrid from '@components/common/cocktails-grid';
import Spinner from '@components/common/spinner';
import { useIsWeb3Route } from '@hooks/common';
import { useFavourites } from '@hooks/favorites';
import { useWeb2CocktailsByIds, useWeb3CocktailsByIds } from '@hooks/queries';
import { WebTypeEnum } from '@tools/types/enums';

interface Props {
  webType: WebTypeEnum;
}

export const FavouritesPage: React.FC<Props> = ({ webType }) => {
  const { getFavouriteIds } = useFavourites(webType);
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
