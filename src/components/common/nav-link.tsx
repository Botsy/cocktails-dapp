import { FC } from 'react';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { NavLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const NavigationLink: FC<Partial<RouterLinkProps> & ChakraLinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <ChakraLink
      as={(props) => (
        <NavLink
          {...props}
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
              paddingBottom: 2,
            };
          }}
        />
      )}
      to={to}
      color="white"
      fontSize="lg"
      fontWeight="bold"
      _focus={{ outline: 'none' }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default NavigationLink;
