import { Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import NavigationLink from './nav-link';
import { WebTypeEnum } from '@custom-types/enums';
import { useIsWeb3Route } from '@hooks/common';
import { useAccount, useDisconnect } from 'wagmi';
import { FaSignOutAlt } from 'react-icons/fa';
import { Tooltip } from '@components/ui/tooltip';

interface Props {
  type: WebTypeEnum;
}

export const Navigation: FC<Props> = ({ type }) => {
  const isWeb3 = useIsWeb3Route();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Flex>
      {(!isWeb3 || isConnected) && (
        <NavigationLink to={`/${type}`} mr={4}>
          Home
        </NavigationLink>
      )}
      {(!isWeb3 || isConnected) && (
        <NavigationLink to={`/${type}/favourites`}>Favourites</NavigationLink>
      )}
      {isWeb3 && isConnected && (
        <Tooltip
          content={'Disconnect account'}
          aria-label={'Disconnect account button tooltip'}
        >
          <Button ml={4} onClick={handleDisconnect}>
            <FaSignOutAlt size={20} /> Disconnect
          </Button>
        </Tooltip>
      )}
    </Flex>
  );
};
