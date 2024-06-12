import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowService } from './window.service';
import { BaseHttpService } from './http/base-http.service';
import {
  accessTokenKey,
  refreshTokenKey,
} from '../../environments/environment';
import { Router } from '@angular/router';
export interface UserLogin {
  username: string;
  password: string;
}

// export interface TokenInfo {
//     token_type: string,
//     exp: number,
//     iat: number,
//     jti: string,
//     user_id: string
// }

export interface UserInfo {
  name: string | number;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: BaseHttpService,
    private windowService: WindowService,
    private router: Router
  ) {}

  login(params: UserLogin): Observable<any> {
    return this.http.post('login', params, false, '登录成功');
  }

  register(params: any) {
    return this.http.post('user', params);
  }

  saveToken(jwtGroup: { access: string; refresh: string }) {
    this.windowService.setSessionStorage(accessTokenKey, jwtGroup.access);
    this.windowService.setSessionStorage(refreshTokenKey, jwtGroup.refresh);
  }

  setTokenInfo(tokenInfo: any) {
    Object.keys(tokenInfo).forEach((key) => {
      this.windowService.setSessionStorage(key, tokenInfo[key]);
    });
  }

  logout() {
    this.windowService.clearSessionStorage();
    this.router.navigateByUrl('/login');
  }

  getCaptcha() {
    return this.http.get('captcha');
  }
}
