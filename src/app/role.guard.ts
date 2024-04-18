import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(route);
  if (
    localStorage.getItem('role') == 'ADMIN' &&
    route.routeConfig?.path == 'productList'
  ) {
    return true;
  } else if (
    localStorage.getItem('role') == 'USER' &&
    route.routeConfig?.path == 'cart'
  ) {
    return true;
  }

  return false;
};
