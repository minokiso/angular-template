import { Injectable } from '@angular/core';
import { BaseHttpService } from './http/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: BaseHttpService) {}
  getLogs(
    params: { page: number; name?: string } = { page: 2, name: undefined }
  ) {
    return this.http.get<[]>('log', params);
  }
}
