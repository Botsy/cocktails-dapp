import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useIsWeb2Route } from '@hooks/common';
import { useWeb2CocktailById } from '@hooks/queries';
import { Cocktail } from '@tools/types/cocktails';
import CocktailCard from './cocktail-card';
import CocktailDialog from './cocktail-dialog';

interface Props {
  cocktails?: Cocktail[];
}

const CocktailsGrid: FC<Props> = ({ cocktails }) => {
  const isWeb2 = useIsWeb2Route();
  const [selectedId, setSelectedId] = useState('');

  const { data: singleCocktail, isLoading: isLoadingSingleCocktail } =
    useWeb2CocktailById(isWeb2 ? selectedId : '');

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
        cocktail={isWeb2 ? singleCocktail : cocktails[parseInt(selectedId)]}
        isLoading={isLoadingSingleCocktail}
        onClose={clearSelected}
      />
    </Box>
  );
};

export default CocktailsGrid;
