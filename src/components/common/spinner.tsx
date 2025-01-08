import { Spinner as ChakraSpinner, Flex } from '@chakra-ui/react';

const Spinner = () => (
  <Flex display="flex" flex={1} justifyContent="center" alignItems="center">
    <ChakraSpinner size={'xl'} m={40} color="teal.500" />
  </Flex>
);

export default Spinner;
