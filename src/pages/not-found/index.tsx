import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CocktailIcon from '@assets/icons/cocktail';

export const NotFoundPage: FC = () => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Box mb={4} alignSelf="center">
        <CocktailIcon width={180} height={180} fill="#14b8a6" />
      </Box>
      <Heading alignSelf="center">Page not found.</Heading>
      <Text textAlign="center">
        You can go back to{' '}
        <Link as={RouterLink} to="/" textDecoration={'underline'}>
          home page.
        </Link>
      </Text>
    </Box>
  );
};
