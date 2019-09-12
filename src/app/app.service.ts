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
    const _data = encodeURI(JSON.stringify(data));
    return this.http
      .get(`${this.base}/banner.png?data=${_data}`, { responseType: 'blob' })
      .toPromise();
  }
}
