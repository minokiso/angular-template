import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

// import { defaultServerUrl } from '../../../environments/environment';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as qs from 'qs';
import { EnvironmentService } from '../environment.service';

// export interface HttpCustomConfig {
//   successInfo?: string; // 是否需要"操作成功"提示
//   otherUrl?: boolean; // 是否是第三方接口
// }

export interface ActionResult<T> {
  code: number;
  msg: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  url: string;
  public http = inject(HttpClient);
  message = inject(NzMessageService);
  env = inject(EnvironmentService);

  protected constructor() {
    this.url = this.env.environment?.serverUrl;
  }

  get<T>(
    path: string,
    param?: NzSafeAny,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    const params = new HttpParams({ fromString: qs.stringify(param) });
    return this.http
      .get<ActionResult<T>>(reqPath, { params })
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }

  getDetail<T>(
    path: string,
    detailId: string | number,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    return this.http
      .get<ActionResult<T>>(`${reqPath}/${detailId}/`)
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }

  delete<T>(
    path: string,
    detailId: string | number,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    return this.http
      .delete<ActionResult<T>>(`${reqPath}/${detailId}/`)
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }

  post<T>(
    path: string,
    body?: NzSafeAny,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    return this.http
      .post<ActionResult<T>>(reqPath, body)
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }

  put<T>(
    path: string,
    detailId: string | number,
    body?: NzSafeAny,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    return this.http
      .put<ActionResult<T>>(`${reqPath}/${detailId}/`, body)
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }
  patch<T>(
    path: string,
    detailId: string | number,
    body?: NzSafeAny,
    otherUrl: boolean = false,
    successInfo?: string
  ): Observable<T> {
    let reqPath = this.getUrl(path, otherUrl);
    return this.http
      .put<ActionResult<T>>(`${reqPath}/${detailId}/`, body)
      .pipe(this.resultHandle<T>(otherUrl, successInfo));
  }
  // downLoadWithBlob(
  //   path: string,
  //   param?: NzSafeAny,
  //   config?: HttpCustomConfig
  // ): Observable<NzSafeAny> {
  //   let reqPath = this.getUrl(path, config);
  //   return this.http.post(reqPath, param, {
  //     responseType: 'blob',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json'),
  //   });
  // }

  getUrl(path: string, otherUrl = false): string {
    return otherUrl ? path : `${this.url}/${path}/`;
  }

  resultHandle<T>(
    otherUrl: boolean = false,
    successInfo?: string
  ): (observable: Observable<ActionResult<T>>) => Observable<T> {
    return (observable: Observable<any>) => {
      return observable.pipe(
        filter((res) => {
          return this.handleFilter(res, successInfo, otherUrl);
        }),
        map((res) => {
          return otherUrl ? res : res.data;
        }),
        catchError((err: any) => {
          this.message.error(err.message);
          return throwError(() => err);
        })
      );
    };
  }

  handleFilter<T>(
    item: ActionResult<T>,
    successInfo?: string,
    otherUrl?: boolean
  ): boolean {
    if (item.code !== 0 && !otherUrl) {
      this.message.error(item.msg);
      return false;
    }
    successInfo && this.message.success(successInfo);
    return true;
  }
}
