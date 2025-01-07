import { Box, createListCollection, Flex, Text } from '@chakra-ui/react';
import CategoryFilter from '@components/common/category-filter';
import CocktailsGrid from '@components/common/cocktails-grid';
import Spinner from '@components/common/spinner';
import { Category } from '@custom-types/cocktails';
import { useWeb2Categories, useWeb2CocktailsByCategory } from '@hooks/queries';
import { FC, useEffect, useState } from 'react';

export const Web2Page: FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const { data: categories, isLoading: isLoadingCategories } =
    useWeb2Categories();

  const { data: cocktails, isLoading: isLoadingCocktails } =
    useWeb2CocktailsByCategory(filterCategory);

  useEffect(() => {
    //Initialise filter category
    if (!filterCategory && categories?.length)
      setFilterCategory(categories[0].name);
  }, [filterCategory, categories]);

  if (isLoadingCategories) return <Spinner />;
  if (!categories?.length) return <Text>No categories found.</Text>;

  const categoryOptions = createListCollection({
    items: categories.map((category: Category) => ({
      label: category.name,
      value: category.name,
    })),
  });

  return (
    <Box width="100%">
      <Flex flex={1} justifyContent="space-between" alignItems="center">
        <Flex flex={1}>
          <Text fontSize="2xl" mb={4}>
            Cocktails in Category: {filterCategory}
          </Text>
        </Flex>
        <CategoryFilter
          categories={categoryOptions}
          value={[filterCategory]}
          onCategoryChange={(cat) => setFilterCategory(cat[0])}
        />
      </Flex>

      {isLoadingCocktails ? (
        <Spinner />
      ) : (
        <CocktailsGrid cocktails={cocktails} />
      )}
    </Box>
  );
};
