import { Button, Flex, HStack, IconButton, Input } from '@chakra-ui/react';
import { InputGroup } from '@components/ui/input-group';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
interface Props {
  placeholder: string;
  search?: string;
  onSearchChange: (value: string) => void;
}

const Search: FC<Props> = ({ placeholder, search, onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialSearch = queryParams.get('search') || '';
  const [value, setValue] = useState(search || initialSearch);

  useEffect(() => {
    onSearchChange(initialSearch);
  }, [initialSearch, onSearchChange]);

  const updateRouteParams = useCallback(
    (queryParams: URLSearchParams) =>
      navigate(`${location.pathname}?${queryParams.toString()}`),
    [location.pathname, navigate]
  );

  const handleSearch = () => {
    if (value.length) {
      onSearchChange(value);
      queryParams.set('search', value);
      updateRouteParams(queryParams);
    }
  };

  const handleClear = () => {
    setValue('');
    onSearchChange('');
    queryParams.delete('search');
    updateRouteParams(queryParams);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex width="100%" justifyContent="center">
      <HStack
        w={['100%', '75%', '50%', '45%']}
        gap={4}
        justifyContent="center"
        mt={10}
        mb={10}
      >
        <InputGroup
          flex={1}
          endElement={
            value && (
              <IconButton
                aria-label="Clear search"
                size="sm"
                variant="ghost"
                onClick={handleClear}
              >
                <IoClose />
              </IconButton>
            )
          }
        >
          <Input
            placeholder={placeholder}
            variant="outline"
            name="search"
            value={value}
            onChange={(e) =>
              e.target.value === '' ? handleClear() : setValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            size="lg"
          />
        </InputGroup>
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </HStack>
    </Flex>
  );
};

export default Search;
