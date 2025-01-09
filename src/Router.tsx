import { FC, ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { FavoritesProvider } from '@contexts/favorites';
import { WebTypeEnum } from '@custom-types/enums';
import ConnectWallet from '@pages/connect-wallet';
import { FavouritesPage } from '@pages/favourites';
import { HomePage } from '@pages/home';
import { NotFoundPage } from '@pages/not-found';
import { Web2Page } from '@pages/web2';
import { Web3Page } from '@pages/web3';

export const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isConnected } = useAccount();
  if (isConnected) {
    return children;
  }
  return <Navigate to="/web3/connect" />;
};

const Router = () => {
  const { isConnected } = useAccount();
  return (
    <Routes>
      {/* General Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Web2 Routes */}
      <Route
        path="/web2/*"
        element={
          <FavoritesProvider webType={WebTypeEnum.WEB_2}>
            <Routes>
              <Route path="" element={<Web2Page />} />
              <Route
                path="favourites"
                element={<FavouritesPage webType={WebTypeEnum.WEB_2} />}
              />
            </Routes>
          </FavoritesProvider>
        }
      />

      {/* Web3 Routes */}
      <Route
        path="/web3/*"
        element={
          <FavoritesProvider webType={WebTypeEnum.WEB_3}>
            <Routes>
              <Route
                path=""
                element={
                  <PrivateRoute>
                    <Web3Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="connect"
                element={
                  isConnected ? <Navigate to="/web3" /> : <ConnectWallet />
                }
              />
              <Route
                path="favourites"
                element={
                  <PrivateRoute>
                    <FavouritesPage webType={WebTypeEnum.WEB_3} />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-cocktail"
                element={
                  <PrivateRoute>
                    <h1>Add cocktail</h1>
                  </PrivateRoute>
                }
              />
            </Routes>
          </FavoritesProvider>
        }
      />
    </Routes>
  );
};

export default Router;
