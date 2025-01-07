import { Box, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Cocktail } from '@custom-types/cocktails';
import { FC, useEffect, useState } from 'react';
import { useFavorites } from '@contexts/favorites';
import { Tooltip } from '@components/ui/tooltip';

interface Props {
  cocktail: Cocktail;
}

const CocktailCard: FC<Props> = ({ cocktail }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFavourite = async () => {
      const result = await isFavourite(cocktail);
      setIsFav(result);
    };

    checkFavourite();
  }, [cocktail, isFavourite]);

  const handleFavouriteClick = async () => {
    setIsLoading(true);
    if (isFav) {
      await removeFavourite(cocktail);
    } else {
      await addFavourite(cocktail);
    }
    const updatedIsFav = await isFavourite(cocktail);
    setIsFav(updatedIsFav);
    setIsLoading(false);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
      transition="all 0.2s"
    >
      <Image
        src={`${cocktail.imageUrl}/preview`}
        alt={cocktail.name}
        objectFit="contain"
        width="100%"
      />

      <Box p="4">
        <Flex flex={1} justifyContent="space-between">
          <Box>
            <Text fontWeight="bold" fontSize="lg" maxLines={1}>
              {cocktail.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {cocktail.category}
            </Text>
          </Box>

          <Tooltip
            content={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
            aria-label="Add/remove from Favourites button tooltip"
          >
            <IconButton
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              size="sm"
              background={`white.100/${isFav ? '40' : '30'}`}
              onClick={handleFavouriteClick}
              disabled={isLoading}
              ml={2}
            >
              {isFav ? (
                <FaStar color="turquoise" />
              ) : (
                <FaRegStar color="turquoise" />
              )}
            </IconButton>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

export default CocktailCard;
