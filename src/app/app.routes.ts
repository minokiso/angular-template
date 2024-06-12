import { Routes } from '@angular/router';
import { browserTitle } from '../environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: 'login/login-form', pathMatch: 'full' },
  {
    path: 'shell',
    title: browserTitle,
    canActivateChild: [],
    loadChildren: () => import('./shell/shell-routing'),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login-routing'),
  },
  { path: '**', redirectTo: 'login/login-form' },
];
