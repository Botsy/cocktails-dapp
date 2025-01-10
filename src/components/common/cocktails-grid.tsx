import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useIsWeb3Route } from '@hooks/common';
import { useWeb2CocktailById } from '@hooks/queries';
import { Cocktail } from '@tools/types/cocktails';
import CocktailCard from './cocktail-card';
import CocktailDialog from './cocktail-dialog';

interface Props {
  cocktails?: Cocktail[];
}

const CocktailsGrid: FC<Props> = ({ cocktails }) => {
  const isWeb3 = useIsWeb3Route();
  const [selectedId, setSelectedId] = useState('');

  const { data: singleWeb2Cocktail, isLoading: isLoadingSingleWeb2Cocktail } =
    useWeb2CocktailById(isWeb3 ? '' : selectedId);

  const setSelected = (id: string) => setSelectedId(id);
  const clearSelected = () => setSelectedId('');

  const singleWeb3Cocktail = isWeb3
    ? cocktails?.find((c) => c.id === selectedId)
    : null;

  const singleCocktail = isWeb3 ? singleWeb3Cocktail : singleWeb2Cocktail;

  // Close cocktail dialog in case cocktail is no longer in cocktails list
  useEffect(() => {
    const isCocktailInList = cocktails?.find(
      (c) => c.id === singleCocktail?.id
    );
    if (!isCocktailInList) setSelectedId('');
  }, [cocktails, singleCocktail?.id]);

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
        isLoading={isLoadingSingleWeb2Cocktail}
        onClose={clearSelected}
      />
    </Box>
  );
};

export default CocktailsGrid;
