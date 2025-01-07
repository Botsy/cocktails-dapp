import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>The Cocktail App</Heading>
      <Text mb={3}>
        Please select which version of the task you would like to see:
      </Text>
      <Button as={Link} to="/web2" mb={3}>
        Web 2 Page
      </Button>
      <Button as={Link} to="/web3">
        Web 3 Page
      </Button>
    </Box>
  );
};
