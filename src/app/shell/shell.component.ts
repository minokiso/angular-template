import { Component, inject } from '@angular/core';
import { browserTitle } from '../../environments/environment';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from '../shared/modules/share.module';
import { EnvironmentService } from '../services/environment.service';
import { LoginService } from '../services/login.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [ShareModule, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  env = inject(EnvironmentService);
  loginService = inject(LoginService);
  windowService = inject(WindowService);
  isCollapsed = false;
  title = browserTitle;
  logout() {
    this.loginService.logout();
  }
  name: string | null =
    this.windowService.getSessionStorage('name') ||
    this.windowService.getStorage('name');
  role: string | null =
    this.windowService.getSessionStorage('role') ||
    this.windowService.getStorage('role');
  menus: any = {
    U: [
      {
        name: '心理评估',
        url: 'new-evaluation',
        icon: 'user',
      },
    ],
    A: [
      {
        name: '用户管理',
        url: 'user-admin',
        icon: 'user',
      },
    ],
  };
}
