import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import NavigationLink from './nav-link';
import { WebTypeEnum } from '@custom-types/enums';

interface Props {
  type: WebTypeEnum;
}

export const Navigation: FC<Props> = ({ type }) => {
  return (
    <Flex>
      <NavigationLink to={`/${type}`} mr={4}>
        Home
      </NavigationLink>
      <NavigationLink to={`/${type}/favourites`}>Favourites</NavigationLink>
    </Flex>
  );
};
