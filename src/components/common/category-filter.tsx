import { FC } from 'react';
import { Box, ListCollection } from '@chakra-ui/react';
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
  return (
    <Box mb={4}>
      <SelectRoot
        collection={categories}
        size="sm"
        width="320px"
        value={value}
        onValueChange={(e) => onCategoryChange(e.value)}
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
