import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/PerformanceListResponse';
import { HistoryListResponse } from '../model/history/HistoryListResponse';
import { environment } from '../../../environments/environment';
import { Role } from '../model/Role';
import { Performance } from '../model/Performance';
import { WidgetResType } from '../model/widget/WidgetResType';
import { PerformanceEventResponse } from '../model/widget/PerformanceEventResponse';
import { EmployeesListResponse } from '../model/EmployeesListResponse';
import { Employee } from '../model/Employee';
import { NewsListResponse } from '../model/news/NewsListResponse';
import { NewsItem } from '../model/news/NewsItem';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly performanceListUrl = 'performances.json';
  readonly newsListUrl = 'posts.json';
  readonly historiesListUrl = 'histories.json';
  readonly performanceEventsListUrl = 'performanceevents.json';
  readonly baseUrl = environment.baseUrl;

  protected httpOptions = {
    headers: new HttpHeaders(),
    observe: 'response' as 'body',
    params: new HttpParams()
  };

  constructor(private http: HttpClient) {
  }

  getPerformanceList(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, { params: {limit: '100'} })
      .pipe(
        catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  getPerformanceBySlug(slug): Observable<HttpResponse<Performance>> {
    return this.http.get<HttpResponse<Performance>>(`${this.baseUrl}/performances/${slug}`, this.httpOptions)
      .pipe(
        catchError(this.handleError('get list of Performances', new HttpResponse<Performance>()))
      );
  }

  getRoles(slug): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${this.baseUrl}/performances/${slug}/roles`, {params: {}})
      .pipe(
        catchError(this.handleError('get list of Performances', [new Role()]))
      );
  }

  getEmployees(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<EmployeesListResponse> {
    return this.http.get<EmployeesListResponse>(
      `${this.baseUrl}/employees.json`, { params: { limit, page, locale } }
    );
  }

  getEmployeeBySlug(slug): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}/employees/${slug}`, { params: { slug } }
    );
  }

  getNews(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<NewsListResponse> {
    return this.http.get<NewsListResponse>(`${this.baseUrl}/${this.newsListUrl}`, {
      params: {limit, page, locale}
    });
  }


  getHistoriesList(limit: string = '10', page: string = '1', locale: string = 'uk'): Observable<HistoryListResponse> {
    return this.http.get<HistoryListResponse>(`${this.baseUrl}/${this.historiesListUrl}`, {
      params: {limit, page, locale} // params: {limit: limit, page: page, locale: locale}
    })
      .pipe(
        catchError(this.handleError('get list of Histories', new HistoryListResponse()))
      );
  }

  getNewsBySlug(slug): Observable<HttpResponse<NewsItem>> {
    return this.http.get<HttpResponse<NewsItem>>(
      `${this.baseUrl}/posts/${slug}`, this.httpOptions
    );
  }

  getPerformanceEvents(performance?: string, fromDate: Date = new Date(), limit: string = 'all', locale: string = 'uk'
  ): Observable<PerformanceEventResponse> {
    const options: WidgetResType = {fromDate: fromDate.toString(), limit, locale};
    if (performance) options.performance = performance;

    let params = new HttpParams();
    Object.keys(options).forEach((key) => params = params.set(key, options[key]));

    return this.http.get<PerformanceEventResponse>(`${this.baseUrl}/${this.performanceEventsListUrl}`, {params: params})
      .pipe(
        catchError(this.handleError('get list of PerformanceEvent', new PerformanceEventResponse()))
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
