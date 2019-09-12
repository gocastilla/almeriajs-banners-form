import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private base: string;

  constructor(private http: HttpClient) {
    this.base = environment.production ? `` : `http://localhost:4444`;
  }

  getBanner(data) {
    return this.http
      .post(`${this.base}/banner`, data, { responseType: 'blob' })
      .toPromise();
  }
}
