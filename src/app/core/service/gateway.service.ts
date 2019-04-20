import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/PerformanceListResponse';
import { HistoryListResponse } from '../model/history/HistoryListResponse';
import { ScheduleListResponse } from '../model/schedule/ScheduleListResponse';
import { environment } from '../../../environments/environment';
import { EmployeesListResponse } from '../model/employee/EmployeesListResponse';
import { Employee } from '../model/employee/Employee';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly performanceListUrl = 'performances.json';
  readonly historiesListUrl = 'histories.json';
  readonly scheduleListUrl = 'performanceevents.json';
  readonly baseUrl = environment.baseUrl;
  readonly performanceEventsListUrl = 'performanceevents.json';

  constructor(private http: HttpClient) { }

  getPerformanceEventList(fromDate: Date = new Date(), limit: string = '5', locale: string = 'uk'): Observable<any> {
    return this.http.get<HistoryListResponse>(`${this.baseUrl}/${this.performanceEventsListUrl}`, {
      params: { fromDate: fromDate.toString(), limit, locale }
    });
  }
  getPerformanceList(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, { params: {limit: '100'} })
      .pipe(
          catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  getEmployees(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<EmployeesListResponse> {
    return this.http.get<EmployeesListResponse>(
      `${this.baseUrl}/employees.json`, { params: { limit, page, locale } }
    ).pipe(
      catchError(this.handleError('get Employees list', new EmployeesListResponse()))
    );
  }

  getEmployeeBySlug(slug): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}/employees/${slug}`, { params: { slug } }
    ).pipe(
      catchError(this.handleError('get Employee', new Employee()))
    );
  }

  getHistoriesList(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<HistoryListResponse> {
    return this.http.get<HistoryListResponse>(`${this.baseUrl}/${this.historiesListUrl}`, {
      params: {limit, page, locale} // params: {limit: limit, page: page, locale: locale}
    })
    .pipe(
      catchError(this.handleError('get list of Histories', new HistoryListResponse()))
    );
  }

  getSchedulesList(from: Date, to: Date, locale: string = 'uk'): Observable<ScheduleListResponse> {
    const fromDate = this.dateToString(from);
    const toDate = this.dateToString(to);

    return this.http.get<ScheduleListResponse>(
      `${this.baseUrl}/${this.scheduleListUrl}`, {
        params: {limit: 'all', fromDate, toDate}
      });
  }

  dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const dateNumber = ('0' + date.getDate()).slice(-2);

    return `${dateNumber}-${month}-${year}`;
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
