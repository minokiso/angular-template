import { Route } from '@angular/router';

import { LoginComponent } from './login.component';
import { browserTitle } from '../../environments/environment';

export default [
  {
    path: '',
    component: LoginComponent,
    title: `登录 - ${browserTitle}`, // angular14版本以上支持，修改浏览器title
    children: [
      { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
      {
        path: 'login-form',
        loadComponent: () =>
          import('./login-form/login-form.component').then(
            (m) => m.LoginFormComponent
          ),
      },
      {
        path: 'register-form',
        loadComponent: () =>
          import('./register-form/register-form.component').then(
            (m) => m.RegisterFormComponent
          ),
      },
    ],
  },
] as Route[];
