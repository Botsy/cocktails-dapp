import { Box, Heading } from '@chakra-ui/react';
import CocktailsGrid from '@components/common/cocktails-grid';
import Spinner from '@components/common/spinner';
import { WebTypeEnum } from '@custom-types/enums';
import { useFavourites } from '@hooks/favorites';
import { useWeb2CocktailsByIds } from '@hooks/queries';

interface Props {
  webType: WebTypeEnum;
}

export const FavouritesPage: React.FC<Props> = ({ webType }) => {
  const { getFavouriteIds } = useFavourites(webType);
  const favouriteIds = getFavouriteIds();

  // Fetch favorite cocktails by their ids
  const { data: favoriteCocktails, isLoading } = useWeb2CocktailsByIds(
    favouriteIds,
    webType === WebTypeEnum.WEB_2
  );

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
