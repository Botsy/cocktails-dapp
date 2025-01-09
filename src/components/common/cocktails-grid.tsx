import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { Cocktail } from '@custom-types/cocktails';
import { FC, useState } from 'react';
import CocktailCard from './cocktail-card';
import { useWeb2CocktailById } from '@hooks/queries';
import CocktailDialog from './cocktail-dialog';

interface Props {
  cocktails?: Cocktail[];
}

const CocktailsGrid: FC<Props> = ({ cocktails }) => {
  const [selectedId, setSelectedId] = useState('');

  const { data: singleCocktail, isLoading: isLoadingSingleCocktail } =
    useWeb2CocktailById(selectedId);

  const setSelected = (id: string) => setSelectedId(id);
  const clearSelected = () => setSelectedId('');

  if (!cocktails?.length) return <Text>No cocktails were found.</Text>;

  return (
    <Box width="100%" my={4}>
      <SimpleGrid columns={[1, 2, 4, 6]} rowGap={3} columnGap={3}>
        {cocktails?.map((cocktail) => (
          <CocktailCard
            key={cocktail.id}
            cocktail={cocktail}
            onSelect={setSelected}
          />
        ))}
      </SimpleGrid>
      <CocktailDialog
        show={!!selectedId}
        cocktail={singleCocktail}
        isLoading={isLoadingSingleCocktail}
        onClose={clearSelected}
      />
    </Box>
  );
};

export default CocktailsGrid;
