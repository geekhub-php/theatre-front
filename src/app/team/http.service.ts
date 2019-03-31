import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://apistaging.theatre.pp.ua/employees.json';

  httpOptions = {
    headers: new HttpHeaders(),
    observe: 'response' as 'body',
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  getEmployees() {
    const result = this.http.get(this.url, this.httpOptions);

    return result;
  }
}
