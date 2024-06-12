import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WindowService } from '../window.service';
import {
  TokenHeaderKey,
  TokenPre,
  accessTokenKey,
} from '../../../environments/environment';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  windowService = inject(WindowService);

  intercept(
    request: HttpRequest<NzSafeAny>,
    next: HttpHandler
  ): Observable<HttpEvent<NzSafeAny>> {
    const token = this.windowService.getSessionStorage(accessTokenKey);
    let httpConfig = {};
    if (!!token) {
      httpConfig = {
        headers: request.headers.set(TokenHeaderKey, `${TokenPre} ${token}`),
      };
    }
    const copyReq = request.clone(httpConfig);
    return next.handle(copyReq);
  }
}
