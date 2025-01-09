import { WebTypeEnum } from '@tools/types/enums';
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
