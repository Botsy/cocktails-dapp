import { FC, useEffect } from 'react';
import { Box, ListCollection } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
  value: string[];
  onCategoryChange: (value: string[]) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  value,
  onCategoryChange,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const initialCategory = queryParams.get('category') || value;

  useEffect(() => {
    if (value !== initialCategory) {
      onCategoryChange([initialCategory as string]);
    }
  }, [initialCategory, onCategoryChange, value]);

  return (
    <Box mb={4}>
      <SelectRoot
        collection={categories}
        size="sm"
        width="320px"
        value={value}
        onValueChange={(e) => {
          onCategoryChange(e.value);
          navigate(`?category=${e.value[0]}`);
        }}
      >
        <SelectLabel>Filter by category:</SelectLabel>
        <SelectTrigger>
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
