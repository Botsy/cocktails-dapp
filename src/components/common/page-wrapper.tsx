import { Box, Container, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CocktailIcon from '@assets/icons/cocktail';
import { Navigation } from './nav';
import { WebTypeEnum } from '@custom-types/enums';
import {
  useHasWeb3Permissions,
  useIsWeb2Route,
  useIsWeb3Route,
} from '@hooks/common';

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const isWeb2 = useIsWeb2Route();
  const isWeb3 = useIsWeb3Route();
  const hasWeb3Permissions = useHasWeb3Permissions();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Sticky Header */}
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex="10"
        bg="teal.300"
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
        >
          <Heading size="lg">
            <Flex
              as={RouterLink}
              to="/"
              _focus={{ outline: 'none' }}
              _hover={{ textDecoration: 'none' }}
              alignItems="center"
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
      <Container display="flex" maxW="container.xl" flex="1" p={4}>
        {isWeb3 && hasWeb3Permissions ? (
          <Flex flex="1" flexDirection="column">
            <Flex justifyContent="flex-end">
              <Button>Create cocktail</Button>
            </Flex>
            <Box>{children}</Box>
          </Flex>
        ) : (
          children
        )}
      </Container>

      {/* Footer */}
      <Flex
        as="footer"
        bg="teal.300"
        color="black"
        py={4}
        justifyContent="center"
        mt={8}
      >
        <Text>
          <strong>&copy; 2025 The Cocktail App</strong> developed by Boryana
          Dimitrova with &#128155;
        </Text>
      </Flex>
    </Box>
  );
};

export default PageWrapper;
