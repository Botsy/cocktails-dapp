import { Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from '@contexts/favorites';
import { WebTypeEnum } from '@custom-types/common';
import { FavouritesPage } from '@pages/favourites';
import { HomePage } from '@pages/home';
import { NotFoundPage } from '@pages/not-found';
import { Web2Page } from '@pages/web2';
import { Web3Page } from '@pages/web3';

const Router = () => (
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
            <Route path="" element={<Web3Page />} />
            <Route
              path="favourites"
              element={<FavouritesPage webType={WebTypeEnum.WEB_3} />}
            />
          </Routes>
        </FavoritesProvider>
      }
    />
  </Routes>
);

export default Router;
