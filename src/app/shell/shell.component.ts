import { Component, inject } from '@angular/core';
import { browserTitle } from '../../environments/environment';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from '../shared/modules/share.module';
import { EnvironmentService } from '../services/environment.service';
import { LoginService } from '../services/login.service';

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
  isCollapsed = false;
  title = browserTitle;
  logout() {
    this.loginService.logout();
  }
}
