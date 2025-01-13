import { FC, useEffect, useMemo } from 'react';
import { Box, ListCollection } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@components/ui/select';

interface CategoryFilterProps {
  categories: ListCollection;
  value: (string | undefined)[];
  onCategoryChange: (value: string[]) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  value,
  onCategoryChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialCategory = queryParams.get('category') || value;

  useEffect(() => {
    if (value !== initialCategory) {
      onCategoryChange([initialCategory as string]);
    }
  }, [initialCategory, onCategoryChange, value]);

  const updateRouteParams = (queryParams: URLSearchParams) =>
    navigate(`${location.pathname}?${queryParams.toString()}`);

  const handleChange = (e) => {
    onCategoryChange(e.value);
    if (e.value[0]) {
      queryParams.set('category', e.value);
    } else {
      queryParams.delete('category');
    }
    updateRouteParams(queryParams);
  };

  return (
    <Box mb={4}>
      <SelectRoot
        collection={categories}
        size="sm"
        width="320px"
        value={value}
        onValueChange={handleChange}
      >
        <SelectLabel>Filter by category:</SelectLabel>
        <SelectTrigger clearable={!!value[0]}>
          <SelectValueText placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.items.map((category) => (
            <SelectItem item={category} key={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Box>
  );
};

export default CategoryFilter;
