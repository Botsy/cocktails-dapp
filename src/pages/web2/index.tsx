import { Box, createListCollection, Flex, Text } from '@chakra-ui/react';
import CategoryFilter from '@components/common/category-filter';
import CocktailsGrid from '@components/common/cocktails-grid';
import Search from '@components/common/search';
import Spinner from '@components/common/spinner';
import { Category } from '@custom-types/cocktails';
import {
  useWeb2Categories,
  useWeb2CocktailsByCategory,
  useWeb2Search,
} from '@hooks/queries';
import { FC, useEffect, useState } from 'react';

export const Web2Page: FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const { data: categories, isLoading: isLoadingCategories } =
    useWeb2Categories();

  const { data: cocktails, isLoading: isLoadingCocktails } =
    useWeb2CocktailsByCategory(filterCategory);

  const { data: searchResults, isLoading: isLoadingSearch } =
    useWeb2Search(search);

  useEffect(() => {
    //Initialise filter category
    if (!filterCategory && categories?.length)
      setFilterCategory(categories[0].name);
  }, [filterCategory, categories]);

  const showSearchResults = !!search && searchResults;

  const isLoadingResults = isLoadingCocktails || isLoadingSearch;

  if (isLoadingCategories) return <Spinner />;

  if (!categories?.length) return <Text>No categories found.</Text>;

  const categoryOptions = createListCollection({
    items: categories.map((category: Category) => ({
      label: category.name,
      value: category.name,
    })),
  });

  const handleSearch = (search: string) => setSearch(search);

  return (
    <Box width="100%">
      <Flex flex={1}>
        <Search
          placeholder="Search by cocktail name or ingredient..."
          search={search}
          onSearchChange={handleSearch}
        />
      </Flex>
      <Flex flex={1} justifyContent="space-between" alignItems="center">
        <Flex flex={1}>
          {showSearchResults ? (
            <Text fontSize="2xl" mb={4}>
              Search results for: {search}
            </Text>
          ) : (
            <Text fontSize="2xl" mb={4}>
              Cocktails in Category: {filterCategory}
            </Text>
          )}
        </Flex>
        {!showSearchResults && (
          <CategoryFilter
            categories={categoryOptions}
            value={[filterCategory]}
            onCategoryChange={(cat) => setFilterCategory(cat[0])}
          />
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
