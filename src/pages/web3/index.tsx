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
  useWeb3CocktailCategories,
  useWeb3CocktailsByCategory,
  useWeb3CocktailsCount,
  useWeb3CocktailsList,
  useWeb3Search,
} from '@hooks/queries';
import { Category } from '@tools/types/cocktails';
import { FC, useState } from 'react';

export const Web3Page: FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | undefined>(undefined);
  const [randomId, setRandomId] = useState<number | undefined>(undefined);

  const { data: cocktailsCount, isLoading: isLoadingCocktailCount } =
    useWeb3CocktailsCount();

  const { data: allCocktails, isLoading: isLoadingResults } =
    useWeb3CocktailsList(Number(cocktailsCount) || 0);

  const { data: filteredCocktails, isLoading: isLoadingFilteredResults } =
    useWeb3CocktailsByCategory(filterCategory);

  const { data: categories, isLoading: isLoadingCategories } =
    useWeb3CocktailCategories();

  const { data: searchResults, isLoading: isLoadingSearch } =
    useWeb3Search(search);

  const { data: randomCocktail, isLoading: isLoadingRandomCocktail } =
    useWeb3CocktailById(randomId);

  const isLoadingContent =
    isLoadingResults ||
    isLoadingSearch ||
    isLoadingCategories ||
    isLoadingFilteredResults;

  const showSearchResults = !!search && searchResults;

  const cocktails = filterCategory ? filteredCocktails : allCocktails;

  const handleSearch = (search: string) => setSearch(search);

  const showRandomCocktail = () => {
    const randId = cocktailsCount && Math.round(Math.random() * cocktailsCount);
    setRandomId(randId);
  };

  const closeRandomCocktail = () => {
    setRandomId(undefined);
  };

  if (isLoadingCocktailCount) return <Spinner />;

  const categoryOptions = createListCollection({
    items: categories.map((category: Category) => ({
      label: category.name,
      value: category.name,
    })),
  });

  const getListTitle = () => {
    if (showSearchResults) return `Search results for: ${search}`;
    if (filterCategory) return `Cocktails in Category: ${filterCategory}`;

    return 'All Cocktails';
  };

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
          <Text fontSize="2xl">{getListTitle()}</Text>
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
      {isLoadingContent ? (
        <Spinner />
      ) : (
        <CocktailsGrid
          cocktails={showSearchResults ? searchResults : cocktails}
        />
      )}
    </Box>
  );
};
