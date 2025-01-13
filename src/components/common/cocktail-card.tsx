import { Box, Image, Text, IconButton, Flex, List } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Tooltip } from '@components/ui/tooltip';
import { useFavourites } from '@contexts/favorites';
import { Skeleton } from '@components/ui/skeleton';
import { Cocktail } from '@tools/types/cocktails';
import { cocktailSound } from '@tools/utils/sound';
import { useIsWeb2Route, useIsWeb3Route } from '@hooks/common';
import Rating from './cocktail-rating';

interface Props {
  cocktail: Cocktail;
  showDescription?: boolean;
  onSelect?: (id: string) => void;
}

const CocktailCard: FC<Props> = ({ cocktail, showDescription, onSelect }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const isWeb2 = useIsWeb2Route();
  const isWeb3 = useIsWeb3Route();

  useEffect(() => {
    if (showDescription) cocktailSound.play();
  }, [showDescription]);

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

  const handleClick = () => {
    if (!showDescription && !!onSelect) onSelect(cocktail.id);
  };

  const handleImgLoaded = () => setIsImgLoading(false);

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
      <Flex
        maxHeight={showDescription ? '100%' : 270}
        width={['100%', '100%', showDescription ? '50%' : '100%']}
        order={[0, 0, showDescription ? 1 : 0]}
        cursor="pointer"
        onClick={handleClick}
      >
        <Skeleton width="100%" loading={isImgLoading}>
          <Image
            src={`${cocktail.imageUrl}${!showDescription && isWeb2 ? '/preview' : ''}`}
            alt={cocktail.name}
            objectFit="cover"
            width="100%"
            height={showDescription ? '100%' : 190}
            order={[0, 0, showDescription ? 1 : 0]}
            onLoad={handleImgLoaded}
          />
        </Skeleton>
      </Flex>

      <Box
        width={['100%', '100%', showDescription ? '50%' : '100%']}
        p="4"
        order={[1, 1, showDescription ? 0 : 1]}
      >
        <Flex flex={1} justifyContent="space-between">
          <Box onClick={handleClick} cursor="pointer">
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
                <FaHeart color="violet" />
              ) : (
                <FaRegHeart color="turquoise" />
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
            {isWeb3 && (
              <Rating
                id={Number(cocktail.id)}
                name={cocktail.name}
                avgRate={cocktail.averageRating}
              />
            )}
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
                  {cocktail.ingredients.map((ingredient, i) => (
                    <List.Item key={i} fontSize="sm" color="gray.500">
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
