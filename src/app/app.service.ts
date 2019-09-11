import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getBanner(data) {
    return this.http
      .get(`/banner.json?data=${encodeURI(JSON.stringify(data))}`)
      .toPromise();
  }
}
