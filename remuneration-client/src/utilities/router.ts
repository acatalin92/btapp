import { Location } from 'react-router-dom';

export const useActiveRoute = (location: Location) => {
  const base = `/${location.pathname.split('/')[1] || ''}`.toLocaleLowerCase();

  return {
    isActiveRoute: (route: string | string[]) => {
      const routes = !Array.isArray(route) ? [route] : route;
      for (let i = 0, len = routes.length; i < len; i++) {
        if (routes[i].toLocaleLowerCase() === base) {
          return true;
        }
      }
      return false;
    },
  };
};
