import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/performance/PerformanceListResponse';
import { HistoryListResponse } from '../model/history/HistoryListResponse';
import { ScheduleListResponse } from '../model/schedule/ScheduleListResponse';
import { History } from '../model/history/History';
import { environment } from '../../../environments/environment';
import { Role } from '../model/Role';
import { Performance } from '../model/performance/Performance';
import { EmployeesListResponse } from '../model/employee/EmployeesListResponse';
import { Employee } from '../model/employee/Employee';
import { NewsListResponse } from '../model/news/NewsListResponse';
import { NewsItem } from '../model/news/NewsItem';
import { PerformanceEventResponse } from '../model/widget/PerformanceEventResponse';
import { WidgetResType } from '../model/widget/WidgetResType';
import { Season } from '../model/season/Season';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly baseUrl = environment.baseUrl;
  readonly performanceListUrl = 'performances';
  readonly seasonListUrl = 'seasons';
  readonly newsListUrl = 'posts';
  readonly historiesListUrl = 'histories';
  readonly performanceEventsListUrl = 'performanceevents';
  readonly employeesListUrl = 'employees';

  constructor(private http: HttpClient,
              @Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);
  }

  getSeasons(): Observable<Array<Season>> {
    return this.http.get<Array<Season>>(`${this.baseUrl}/${this.seasonListUrl}`, {});
  }

  getSeasonPerformances(seasonNumber: number, locale: string = this.localeId): Observable<Array<Performance>> {
    return this.http.get<Array<Performance>>(
      `${this.baseUrl}/${this.seasonListUrl}/${seasonNumber}/${this.performanceListUrl}`,
      {params: {locale}}
      );
  }

  getPerformanceEventList(fromDate: Date = new Date(), limit: string = '5', locale: string = this.localeId): Observable<ScheduleListResponse> {
    return this.http.get<ScheduleListResponse>(`${this.baseUrl}/${this.performanceEventsListUrl}`, {
      params: {fromDate: fromDate.toString(), limit, locale}
    });
  }

  getPerformanceList(limit = 100, locale: string = this.localeId): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, {
      params: {limit: `${limit}`, locale}
    })
      .pipe(
        catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  getPerformanceBySlug(slug, locale: string = this.localeId): Observable<HttpResponse<Performance>> {
    return this.http.get<HttpResponse<Performance>>(`${this.baseUrl}/performances/${slug}`, {
      observe: 'response' as 'body',
      params: {locale}
    })
      .pipe(
        catchError(this.handleError('get list of Performances', new HttpResponse<Performance>()))
      );
  }

  getRoles(slug, locale: string = this.localeId): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${this.baseUrl}/performances/${slug}/roles`, {params: {locale}})
      .pipe(
        catchError(this.handleError('get list of Performances', []))
      );
  }

  getEmployees(limit: string = '10', page: string = '1', locale: string = this.localeId): Observable<EmployeesListResponse> {
    return this.http.get<EmployeesListResponse>(
      `${this.baseUrl}/${this.employeesListUrl}`, {params: {limit, page, locale}}
    ).pipe(
      catchError(this.handleError('get Employees list', new EmployeesListResponse()))
    );
  }

  getEmployeeBySlug(slug, locale: string = this.localeId): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}/employees/${slug}`, {params: {slug, locale}}
    ).pipe(
      catchError(this.handleError('get Employee', new Employee()))
    );
  }

  getHistoriesList(limit: string = '10', page: string = '1', locale: string = this.localeId): Observable<HistoryListResponse> {
    return this.http.get<HistoryListResponse>(`${this.baseUrl}/${this.historiesListUrl}`, {
      params: {limit, page, locale} // params: {limit: limit, page: page, locale: locale}
    })
      .pipe(
        catchError(this.handleError('get list of Histories', new HistoryListResponse()))
      );
  }

  getSchedulesList(from: Date, to: Date, locale: string =  this.localeId): Observable<ScheduleListResponse> {
    const fromDate = this.dateToString(from);
    const toDate = this.dateToString(to);

    return this.http.get<ScheduleListResponse>(
      `${this.baseUrl}/${this.performanceEventsListUrl}`, {
        params: {limit: 'all', fromDate, toDate, locale}
      });
  }

  dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // tslint:disable-line
    const day = `0${date.getDate()}`.slice(-2); // tslint:disable-line

    return `${day}-${month}-${year}`;
  }

  getPerformanceEvents(performance?: string,
                       fromDate: Date = new Date(),
                       limit: string = '5',
                       locale: string = this.localeId): Observable<PerformanceEventResponse> {
    const options: WidgetResType = { fromDate: fromDate.toString(), limit, locale };
    if (performance) options.performance = performance;

    let params = new HttpParams();
    Object.keys(options).forEach((key) => params = params.set(key, options[key]));

    return this.http.get<PerformanceEventResponse>(`${this.baseUrl}/${this.performanceEventsListUrl}`, {params: params})
      .pipe(
        catchError(this.handleError('get list of PerformanceEvent', new PerformanceEventResponse()))
      );
    }

  getHistoryBySlug(slug: string, locale: string =  this.localeId): Observable<History> {
    return this.http.get<History>(`${this.baseUrl}/histories/${slug}`, {params: {locale}})
      .pipe(
        catchError(this.handleError('get History', new History()))
      );
  }

  getNews(limit: string = '10', page: number = 1, locale: string = this.localeId): Observable<NewsListResponse> {
    return this.http.get<NewsListResponse>(`${this.baseUrl}/${this.newsListUrl}`, {
      params: {limit, page: page.toString(), locale}
    })
      .pipe(
        catchError(this.handleError('get list of News', new NewsListResponse()))
      );
  }

  getNewsBySlug(slug, locale: string =  this.localeId): Observable<NewsItem> {
    return this.http.get<NewsItem>(
      `${this.baseUrl}/posts/${slug}`, {params: {slug, locale}}
    )
      .pipe(
        catchError(this.handleError('get NewsItem', new NewsItem()))
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
