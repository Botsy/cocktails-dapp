import { FC } from 'react';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { NavLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const NavigationLink: FC<Partial<RouterLinkProps> & ChakraLinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <ChakraLink
      as={(props) => (
        <NavLink
          {...props}
          end
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? 'underline' : 'none',
            };
          }}
        />
      )}
      to={to}
      color="black"
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
