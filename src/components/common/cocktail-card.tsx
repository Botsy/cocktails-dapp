import { Box, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Cocktail } from '@custom-types/cocktails';
import { useFavourites } from '@hooks/favorites';
import { WebTypeEnum } from '@custom-types/common';
import { useEffect, useState } from 'react';

interface Props {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<Props> = ({ cocktail }) => {
  const { favourites, addFavourite, removeFavourite, isFavourite } =
    useFavourites(WebTypeEnum.WEB_2);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavourite = async () => {
      const favStatus = await isFavourite(cocktail);
      setIsFav(favStatus);
    };

    checkIfFavourite();
  }, [cocktail, isFavourite, favourites]);

  const onToggleFavourite = () =>
    isFav ? removeFavourite(cocktail) : addFavourite(cocktail);

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
          <IconButton
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            size="sm"
            background={'gray.300/20'}
            onClick={onToggleFavourite}
            ml={2}
          >
            {isFav ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default CocktailCard;
