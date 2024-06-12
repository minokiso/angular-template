import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  http = inject(HttpClient);
  msg = inject(NzMessageService);
  public environment!: any;
  setEnvironment() {
    return () =>
      new Promise<void>((resolve, reject) => {
        this.http
          .get('assets/config.json')
          .pipe(
            catchError((err) => {
              this.msg.error(err.message);
              this.msg.error('配置解析失败，请检查assets/config.json');
              return throwError(() => err);
            })
          )
          .subscribe((res) => {
            this.environment = res;
            resolve();
          });
      });
  }
}
