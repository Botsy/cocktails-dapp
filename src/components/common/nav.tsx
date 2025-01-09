import { Button, Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';
import NavigationLink from './nav-link';
import { WebTypeEnum } from '@tools/types/enums';
import { useIsWeb3Route } from '@hooks/common';
import { useAccount, useDisconnect } from 'wagmi';
import { FaSignOutAlt } from 'react-icons/fa';
import { Tooltip } from '@components/ui/tooltip';
import ConfirmDialog from './confirm-dialog';

interface Props {
  type: WebTypeEnum;
}

export const Navigation: FC<Props> = ({ type }) => {
  const isWeb3 = useIsWeb3Route();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDisconnect = () => {
    setShowConfirm(false);
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
          <Button ml={4} onClick={() => setShowConfirm(true)}>
            <FaSignOutAlt size={20} /> Disconnect
          </Button>
        </Tooltip>
      )}
      <ConfirmDialog
        show={showConfirm}
        setShow={setShowConfirm}
        title="Disconnect wallet"
        content="You are about to disconnect your wallet. Do you confirm?"
        handleConfirm={handleDisconnect}
      />
    </Flex>
  );
};
