import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/PerformanceListResponse';
import { environment } from '../../../environments/environment';
import { EmployeesListResponse } from '../model/EmployeesListResponse';


@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly performanceListUrl = '/performances.json';
  readonly baseUrl = environment.baseUrl;

  protected httpOptions = {
    headers: new HttpHeaders(),
    observe: 'response' as 'body',
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  getPerformanceList(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, { params: {limit: '100'} })
      .pipe(
          catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  getEmployees(): Observable<HttpResponse<EmployeesListResponse>> {
    return this.http.get<HttpResponse<EmployeesListResponse>>(
      this.baseUrl + '/employees.json', this.httpOptions
    );
  }

  /* tslint:disable:no-console */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
