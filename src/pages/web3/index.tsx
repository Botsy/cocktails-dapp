import {
  Box,
  Button,
  createListCollection,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import CategoryFilter from '@components/common/category-filter';
import CocktailDialog from '@components/common/cocktail-dialog';
import CocktailsGrid from '@components/common/cocktails-grid';
import Search from '@components/common/search';
import Spinner from '@components/common/spinner';
import {
  useWeb3CocktailById,
  useWeb3CocktailsCount,
  useWeb3CocktailsList,
} from '@hooks/queries';
import { FC, useState } from 'react';

export const Web3Page: FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [randomId, setRandomId] = useState<number | undefined>(undefined);

  const { data: cocktailsCount, isLoading: isLoadingCocktailCount } =
    useWeb3CocktailsCount();

  const { data, isLoading: isLoadingResults } = useWeb3CocktailsList(
    Number(cocktailsCount) || 0
  );

  const { data: randomCocktail, isLoading: isLoadingRandomCocktail } =
    useWeb3CocktailById(randomId);

  const isLoading = isLoadingCocktailCount || isLoadingResults;

  const handleSearch = (search: string) => setSearch(search);

  const showRandomCocktail = () => {
    const randId = cocktailsCount && Math.round(Math.random() * cocktailsCount);
    setRandomId(randId);
  };

  const closeRandomCocktail = () => {
    setRandomId(undefined);
  };

  const showSearchResults = !!search; // TODO: consider search results as well

  const categoryOptions = createListCollection({
    items: [
      {
        label: 'placeholder',
        value: 'placeholder',
      },
    ],
  });

  return (
    <Box width="100%">
      <Flex flex={1} flexDirection="column">
        <Heading textAlign="center" mt={6}>
          The Cocktail App - Web3 version
        </Heading>
        {!isLoadingCocktailCount && (
          <HStack
            top={[0, 0, 0, 8]}
            right={[0, 0, 0, 8]}
            mt={[4, 4, 4, 0]}
            gap={4}
            justifyContent="center"
            position={['relative', 'relative', 'relative', 'absolute']}
          >
            <Button
              maxW="sm"
              colorPalette="teal"
              variant="surface"
              alignSelf="center"
              onClick={() => {}}
            >
              Add cocktail
            </Button>
            <Button
              variant="surface"
              maxW="sm"
              alignSelf="center"
              onClick={showRandomCocktail}
            >
              Get random cocktail
            </Button>
          </HStack>
        )}
        <CocktailDialog
          show={!!randomId}
          isLoading={isLoadingRandomCocktail}
          cocktail={randomCocktail}
          onClose={closeRandomCocktail}
        />
        <Search
          placeholder="Search by cocktail name..."
          search={search}
          onSearchChange={handleSearch}
        />
      </Flex>
      <Flex
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
      >
        <Flex flex={1} order={[1, 1, 0]}>
          <Text fontSize="2xl">
            {showSearchResults
              ? `Search results for: ${search}`
              : `Cocktails in Category: ${filterCategory}`}
          </Text>
        </Flex>
        {!showSearchResults && (
          <Flex order={[0, 0, 1]}>
            <CategoryFilter
              categories={categoryOptions}
              value={[filterCategory]}
              onCategoryChange={(cat) => setFilterCategory(cat[0])}
            />
          </Flex>
        )}
      </Flex>
      {isLoading ? <Spinner /> : <CocktailsGrid cocktails={data} />}
    </Box>
  );
};
