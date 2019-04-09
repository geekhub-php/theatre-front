import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/PerformanceListResponse';
import { HistoryListResponse } from '../model/history/HistoryListResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly performanceListUrl = 'performances.json';
  readonly performanceSlugUrl = 'performances/dorogha-do-sontsia.json?locale=uk'; //
  readonly performanceRolesUrl = 'dorogha-do-sontsia/roles.json?locale=uk'; //
  readonly historiesListUrl = 'histories.json';
  readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getPerformanceList(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, {params: {limit: '100'}})
      .pipe(
        catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  //  свою модель нужно написать
  // ERROR in src/app/performance/performance.component.ts(28,7): error TS2740: Type 'PerformanceListResponse'
  // is missing the following properties from type 'Performance[]': length, pop, push, concat, and 26 more.

  getPerformanceSlug(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceSlugUrl}`, {params: {limit: '100'}})
      .pipe(
        catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }
  //  заготовка для запроса на актеров. Нужна модель
  // getPerformanceRoles(limit = 10): Observable<PerformanceListResponse> {
  //   return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceRolesUrl}`, {params: {limit: '100'}})
  //     .pipe(
  //       catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
  //     );
  // }

  getHistoriesList(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<HistoryListResponse> {
    return this.http.get<HistoryListResponse>(`${this.baseUrl}/${this.historiesListUrl}`, {
      params: {limit: limit, page: page, locale: locale}
    })
      .pipe(
        catchError(this.handleError('get list of Histories', new HistoryListResponse()))
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
