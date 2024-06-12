import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WindowService } from '../window.service';
import { catchError, filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  windowServe = inject(WindowService);
  msg = inject(NzMessageService);
  router = inject(Router);

  intercept(
    req: HttpRequest<NzSafeAny>,
    next: HttpHandler
  ): Observable<HttpEvent<NzSafeAny>> {
    return next.handle(req).pipe(
      filter((e) => e.type !== 0),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.msg.error('登录已过期，请重新登录');
          this.router.navigateByUrl('/login');
        } else {
          this.msg.error(error.message);
        }
        return throwError(() => {
          return error;
        });
      })
    );
  }
}
