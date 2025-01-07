import { SimpleGrid, Text } from '@chakra-ui/react';
import { Cocktail } from '@custom-types/cocktails';
import { FC } from 'react';
import CocktailCard from './cocktail-card';

interface Props {
  cocktails?: Cocktail[];
}

const CocktailsGrid: FC<Props> = ({ cocktails }) => {
  if (!cocktails?.length) return <Text>No cocktails were found.</Text>;
  return (
    <SimpleGrid columns={[1, 2, 4, 6]} rowGap={3} columnGap={3}>
      {cocktails?.map((cocktail) => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} />
      ))}
    </SimpleGrid>
  );
};

export default CocktailsGrid;
