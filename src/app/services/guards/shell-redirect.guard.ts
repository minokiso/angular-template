import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { WindowService } from '../window.service';

export const shellRedirectGuard: CanActivateChildFn = (route, state) => {
  const windowService = inject(WindowService);
  const router = inject(Router);
  const role: string | null = windowService.getSessionStorage('role');
  if (state.url.endsWith('/shell') || state.url.endsWith('/shell/')) {
    if (role === 'Admin') {
      return router.parseUrl('/shell/user-admin');
    }
    if (role === 'User') {
      return router.parseUrl('/shell/profile');
    }
    return router.parseUrl('/login');
  }
  return true;
};
