import { Injectable } from '@angular/core';
import { BaseHttpService } from './http/base-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: BaseHttpService) {}
  private userInfo$ = new BehaviorSubject<UserInfo>({
    userId: -1,
    name: '未知用户',
  });
  setGlobalUser(user: any) {
    this.userInfo$.next(user);
  }
  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
