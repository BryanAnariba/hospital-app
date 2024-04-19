import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService, TokenInfo } from '../services/auth.service';
import { tap } from 'rxjs';

export const isNotLoggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  return userService.verifyAndRefreshToken().pipe(
    tap((isAuthenticatedAndnEWTokenValid) => {
      if (!isAuthenticatedAndnEWTokenValid) {
        router.navigate(['/auth/sign-in']);
      }
    })
  );
};

export const isLoggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    const token = JSON.parse(localStorage.getItem('token')!) as TokenInfo;
    if (token.email && token.token) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } else {
    return true;
  }
};
