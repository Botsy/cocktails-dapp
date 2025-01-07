import { Box, Text } from '@chakra-ui/react';
import CocktailsGrid from '@components/common/cocktails-grid';
import { WebTypeEnum } from '@custom-types/common';
import { useFavourites } from '@hooks/favorites';
import { useWeb2CocktailsByIds } from '@hooks/queries';

interface Props {
  webType: WebTypeEnum;
}

export const FavouritesPage: React.FC<Props> = ({ webType }) => {
  const { getFavouriteIds } = useFavourites(webType);
  const favouriteIds = getFavouriteIds();

  // Fetch favorite cocktails by their ids
  const { data: favoriteCocktails } = useWeb2CocktailsByIds(favouriteIds);

  return (
    <Box p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="6">
        Favorite Cocktails
      </Text>
      <CocktailsGrid cocktails={favoriteCocktails || []} />
    </Box>
  );
};

export default FavouritesPage;
