import { WebTypeEnum } from '@tools/types/enums';
import { getRatedCocktails } from '@tools/utils/local-storage';
import { useLocation } from 'react-router-dom';

const isRouteMatching = (path: string, match: string) => {
  const firstSegment = path.split('/')[1]; // Get the root path segment
  return firstSegment.includes(match);
};

export const useIsWeb2Route = () => {
  const { pathname } = useLocation();

  return isRouteMatching(pathname, WebTypeEnum.WEB_2);
};

export const useIsWeb3Route = () => {
  const { pathname } = useLocation();

  return isRouteMatching(pathname, WebTypeEnum.WEB_3);
};

export const useIsCocktailRated = (id: number) => {
  const ratedCocktails = getRatedCocktails();
  console.log(ratedCocktails, id);
  return ratedCocktails.includes(id.toString());
};
