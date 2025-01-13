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
        {!connectors.length ? (
          connectors.map((connector) => (
            <Button key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </Button>
          ))
        ) : (
          <Text color="fg.error">No available connectors</Text>
        )}
      </HStack>
    </Flex>
  );
};

export default ConnectWallet;
