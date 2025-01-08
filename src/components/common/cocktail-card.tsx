import { Box, Image, Text, IconButton, Flex, List } from '@chakra-ui/react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Cocktail } from '@custom-types/cocktails';
import { FC, useEffect, useState } from 'react';
import { useFavorites } from '@contexts/favorites';
import { Tooltip } from '@components/ui/tooltip';
import ClinkSound from '@assets/sounds/clinking-glass.wav';

interface Props {
  cocktail: Cocktail;
  showDescription?: boolean;
}

const CocktailCard: FC<Props> = ({ cocktail, showDescription }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavorites();
  const [audio] = useState(new Audio(ClinkSound));
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (showDescription) audio.play();
  }, [audio, showDescription]);

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
    <Flex
      flexDirection={['column', 'column', showDescription ? 'row' : 'column']}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={
        !showDescription ? { boxShadow: 'lg', transform: 'scale(1.02)' } : {}
      }
      transition="all 0.2s"
    >
      <Image
        src={`${cocktail.imageUrl}${showDescription ? '' : '/preview'}`}
        alt={cocktail.name}
        objectFit="cover"
        width={['100%', '100%', showDescription ? '50%' : '100%']}
        onClick={() => audio.play()}
        order={[0, 0, showDescription ? 1 : 0]}
      />

      <Box width="100%" p="4" order={[1, 1, showDescription ? 0 : 1]}>
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
              onClick={handleFavouriteClick}
              disabled={isLoading}
              variant="ghost"
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
        {showDescription && (
          <Box
            width="100%"
            borderTop={'1px solid'}
            borderTopColor={'gray.300'}
            mt={3}
            pt={3}
            pb={3}
          >
            {cocktail.cocktailType && (
              <Box mb={2}>
                <Text fontWeight="bold" fontSize="sm">
                  Cocktail type:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {cocktail.cocktailType}
                </Text>
              </Box>
            )}
            {!!cocktail.ingredients?.length && (
              <Box mb={2}>
                <Text fontWeight="bold" fontSize="sm">
                  Ingredients:
                </Text>
                <List.Root>
                  {cocktail.ingredients.map((ingredient) => (
                    <List.Item fontSize="sm" color="gray.500">
                      {ingredient}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            )}
            {cocktail.instructions && (
              <Box mb={2}>
                <Text fontWeight="bold" fontSize="sm">
                  Instructions:
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {cocktail.instructions}
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default CocktailCard;
