import {
  Box,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CocktailIcon from '@assets/icons/cocktail';
import { Navigation } from './nav';
import { WebTypeEnum } from '@custom-types/common';
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
        bg="teal.500"
        p={4}
        color="white"
        justify="space-between"
        align="center"
      >
        <Heading size="lg">
          <Flex>
            <Box mr={2}>
              <CocktailIcon width={35} height={35} />
            </Box>
            <ChakraLink
              as={RouterLink}
              to="/"
              color="white"
              fontSize="lg"
              _focus={{ outline: 'none' }}
              _hover={{ textDecoration: 'none' }}
            >
              The Cocktail App
            </ChakraLink>
          </Flex>
        </Heading>
        {/* Navigation Links */}
        {isWeb2 && <Navigation type={WebTypeEnum.WEB_2} />}
        {isWeb3 && <Navigation type={WebTypeEnum.WEB_3} />}
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
      <Box as="footer" bg="teal.500" color="white" py={4} textAlign="center">
        <p>© 2025 The Cocktail App. All rights reserved.</p>
      </Box>
    </Box>
  );
};

export default PageWrapper;
