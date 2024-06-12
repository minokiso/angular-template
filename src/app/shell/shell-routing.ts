import { Route } from '@angular/router';
import { ShellComponent } from './shell.component';
import { loginGuard } from '../services/guards/login.guard';
import { browserTitle } from '../../environments/environment';

export default [
  {
    path: '',
    component: ShellComponent,
    // canActivateChild: [loginGuard],
    title: `首页 - ${browserTitle}`, // angular14版本以上支持，修改浏览器title
    children: [
      {
        path: 'log',
        loadComponent: () =>
          import('../pages/log/log.component').then((m) => m.LogComponent),
      },
    ],
  },
] as Route[];
