import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CocktailIcon from '@assets/icons/cocktail';
import { Navigation } from './nav';
import { WebTypeEnum } from '@custom-types/enums';
import { useIsWeb2Route, useIsWeb3Route } from '@hooks/common';

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const isWeb2 = useIsWeb2Route();
  const isWeb3 = useIsWeb3Route();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Sticky Header */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="10"
        bg="teal.500"
        pt={4}
        pb={4}
        color="black"
      >
        <Container
          display="flex"
          maxW="container.xl"
          flex="1"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
        >
          <Heading size="lg">
            <Flex
              as={RouterLink}
              to="/"
              _focus={{ outline: 'none' }}
              _hover={{ textDecoration: 'none' }}
              alignItems="center"
              mb={[3, 3, 0]}
            >
              <CocktailIcon width={35} height={35} />
              <Text color="black" fontSize="lg" ml={2}>
                The Cocktail App
              </Text>
            </Flex>
          </Heading>
          {/* Navigation Links */}
          {isWeb2 && <Navigation type={WebTypeEnum.WEB_2} />}
          {isWeb3 && <Navigation type={WebTypeEnum.WEB_3} />}
        </Container>
      </Flex>

      {/* Main Content */}
      <Container display="flex" maxW="container.xl" flex="1" p={8}>
        {children}
      </Container>

      {/* Footer */}
      <Flex
        as="footer"
        bg="teal.500"
        color="black"
        p={4}
        justifyContent="center"
        mt={8}
      >
        <Text textAlign="center">
          <strong>&copy; 2025 The Cocktail App</strong> developed by Boryana
          Dimitrova with &#128155;
        </Text>
      </Flex>
    </Box>
  );
};

export default PageWrapper;
