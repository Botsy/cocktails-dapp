import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import CocktailCard from '@components/common/cocktail-card';
import { WebTypeEnum } from '@custom-types/common';
import { useFavourites } from '@hooks/favorites';
import { useWeb2CocktailsByIds } from '@hooks/queries';

interface Props {
  webType: WebTypeEnum;
}

export const FavouritesPage: React.FC<Props> = ({ webType }) => {
  const { getFavouriteIds } = useFavourites(webType);
  const favouriteIds = getFavouriteIds();

  // Fetch favorite cocktails by their hashes
  const { data: favoriteCocktails } = useWeb2CocktailsByIds(favouriteIds);

  return (
    <Box p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="6">
        Favorite Cocktails
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} gap="6">
        {favoriteCocktails.map(
          (cocktail) =>
            cocktail && <CocktailCard key={cocktail.id} cocktail={cocktail} />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default FavouritesPage;
