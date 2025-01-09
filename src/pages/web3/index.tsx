import {
  Box,
  Button,
  createListCollection,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import CategoryFilter from '@components/common/category-filter';
import CocktailDialog from '@components/common/cocktail-dialog';
import CocktailsGrid from '@components/common/cocktails-grid';
import Search from '@components/common/search';
import Spinner from '@components/common/spinner';
import { FC, useState } from 'react';

export const Web3Page: FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showRandomResult, setShowRandomResult] = useState(false);

  const handleSearch = (search: string) => setSearch(search);

  const showRandomCocktail = () => setShowRandomResult(true);

  const closeRandomCocktail = () => {
    setShowRandomResult(false);
  };

  const showSearchResults = !!search; // TODO: consider search results as well

  const isLoadingResults = false; // TODO: use this from query once data fetching is set

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
        <Button
          top={[0, 0, 8]}
          right={[0, 0, 8]}
          mt={[4, 4, 0]}
          maxW="sm"
          alignSelf="center"
          position={['relative', 'relative', 'absolute']}
          onClick={showRandomCocktail}
        >
          Get random cocktail
        </Button>
        <CocktailDialog
          show={showRandomResult}
          isLoading={false}
          cocktail={null}
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
      {isLoadingResults ? <Spinner /> : <CocktailsGrid cocktails={[]} />}
    </Box>
  );
};
