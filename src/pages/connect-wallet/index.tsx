import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useConnect } from 'wagmi';

const ConnectWallet: FC = () => {
  const { connectors, connect } = useConnect();
  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mb={6}>The Cocktail dApp</Heading>
      <Text fontSize="lg" mb={4}>
        To unlock functionality, connect your wallet:
      </Text>
      <HStack gap={4}>
        {connectors.map((connector) => (
          <Button onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        ))}
      </HStack>
    </Flex>
  );
};

export default ConnectWallet;
