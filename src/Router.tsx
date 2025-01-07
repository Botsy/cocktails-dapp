import { Route, Routes } from 'react-router-dom';
import { FavouritesPage } from '@pages/favourites';
import { HomePage } from '@pages/home';
import { NotFoundPage } from '@pages/not-found';
import { Web2Page } from '@pages/web2';
import { Web3Page } from '@pages/web3';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/web2" element={<Web2Page />} />
    <Route path="/web2-favourites" element={<FavouritesPage />} />
    <Route path="/web3" element={<Web3Page />} />
    <Route path="/web3-favourites" element={<FavouritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;
