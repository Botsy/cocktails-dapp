import { FC, useState } from 'react';
import { useCocktailContract } from '@hooks/contract';
import { toaster } from '@components/ui/toaster';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Rating as ChakraRating } from '@components/ui/rating';
import { useIsCocktailRated } from '@hooks/common';
import { handleAppError } from '@tools/utils/error-handle';
import { FaStar } from 'react-icons/fa';

const Rating: FC<{ id: number; name: string; avgRate?: number }> = ({
  id,
  name,
  avgRate,
}) => {
  const { rateCocktail } = useCocktailContract();
  const isRated = useIsCocktailRated(id);
  const [rating, setRating] = useState(avgRate || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRate = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await rateCocktail(id, rating);
      setRating(rating);
      toaster.create({
        description: `You rated cocktail ${name} with ${rating} stars.`,
        type: 'info',
      });
    } catch (e: unknown) {
      const handledError = handleAppError(e);
      toaster.create({
        description: handledError.message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mb={3}>
      <Flex gap={4}>
        <ChakraRating
          value={rating}
          onValueChange={(e) => setRating(e.value)}
          disabled={isRated}
          icon={<FaStar size={10} />}
          colorPalette={isRated ? 'yellow' : 'black'}
        />
        {!isRated && (
          <Button size="xs" onClick={handleRate}>
            {isLoading ? 'Rating...' : 'Rate'}
          </Button>
        )}
      </Flex>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isRated && <Text fontSize="xs">You already rated this cocktail.</Text>}
    </Box>
  );
};

export default Rating;
