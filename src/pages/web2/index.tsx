import {
  Box,
  Button,
  createListCollection,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import CategoryFilter from '@components/common/category-filter';
import CocktailDialog from '@components/common/cocktail-dialog';
import CocktailsGrid from '@components/common/cocktails-grid';
import Search from '@components/common/search';
import Spinner from '@components/common/spinner';
import {
  useWeb2Categories,
  useWeb2Cocktails,
  useWeb2CocktailsByCategory,
  useWeb2RandomCocktail,
  useWeb2Search,
} from '@hooks/queries';
import { Category } from '@tools/types/cocktails';
import { Web2QueryKeyEnum } from '@tools/types/enums';

export const Web2Page: FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showRandomResult, setShowRandomResult] = useState(false);

  const queryClient = useQueryClient();

  const { data: categories, isLoading: isLoadingCategories } =
    useWeb2Categories();

  const { data: allCocktails, isLoading: isLoadingCocktails } =
    useWeb2Cocktails(categories || []);

  const { data: filteredCocktails, isLoading: isLoadingFilteredCocktails } =
    useWeb2CocktailsByCategory(filterCategory);

  const { data: searchResults, isLoading: isLoadingSearch } =
    useWeb2Search(search);

  const { data: randomCocktail, isLoading: isLoadingRandomCocktail } =
    useWeb2RandomCocktail(showRandomResult);

  const showSearchResults = !!search && searchResults;

  const isLoadingResults =
    isLoadingCocktails || isLoadingFilteredCocktails || isLoadingSearch;

  const cocktails = filterCategory ? filteredCocktails : allCocktails;

  if (isLoadingCategories) return <Spinner />;

  if (!categories?.length) return <Text>No categories found.</Text>;

  const categoryOptions = createListCollection({
    items: categories.map((category: Category) => ({
      label: category.name,
      value: category.name,
    })),
  });

  const handleSearch = (search: string) => setSearch(search);

  const showRandomCocktail = () => setShowRandomResult(true);
  const closeRandomCocktail = () => {
    setShowRandomResult(false);
    queryClient.invalidateQueries({
      queryKey: [Web2QueryKeyEnum.GET_RANDOM_COCKTAIL],
    });
  };

  const getListTitle = () => {
    if (showSearchResults) return `Search results for: ${search}`;
    if (filterCategory) return `Cocktails in Category: ${filterCategory}`;

    return 'All Cocktails';
  };

  return (
    <Box width="100%">
      <Flex flex={1} flexDirection="column">
        <Heading textAlign="center" mt={6}>
          The Cocktail App - Web2 version
        </Heading>
        <Button
          variant="surface"
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
          isLoading={isLoadingRandomCocktail}
          cocktail={randomCocktail}
          onClose={closeRandomCocktail}
        />
        <Search
          placeholder="Search by cocktail name or ingredient..."
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
      {isLoadingResults ? (
        <Spinner />
      ) : (
        <CocktailsGrid
          cocktails={showSearchResults ? searchResults : cocktails}
        />
      )}
    </Box>
  );
};
