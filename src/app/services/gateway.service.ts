import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../store/performance/PerformanceListResponse';
import { HistoryListResponse } from '../store/history/HistoryListResponse';
import { ScheduleListResponse } from '../store/schedule/ScheduleListResponse';
import { History } from '../store/history/History';
import { Role } from '../store/Role';
import { Performance } from '../store/performance/Performance';
import { EmployeesListResponse } from '../store/employee/EmployeesListResponse';
import { Employee } from '../store/employee/Employee';
import { NewsListResponse } from '../store/news/NewsListResponse';
import { NewsItem } from '../store/news/NewsItem';
import { PerformanceEventResponse } from '../store/widget/PerformanceEventResponse';
import { WidgetResType } from '../store/widget/WidgetResType';
import { Season } from '../store/season/Season';

import { environment } from '../../environments/environment';
import { LangService, Locales } from './lang.service';
import { EmployeeGroup } from '../store/employee/EmployeeGroup';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  localeId: Locales = Locales.en;

  readonly baseUrl = environment.baseUrl;
  readonly canonicalUrl = environment.canonicalUrl;
  readonly performanceListUrl = 'performances';
  readonly seasonListUrl = 'seasons';
  readonly newsListUrl = 'posts';
  readonly historiesListUrl = 'histories';
  readonly performanceEventsListUrl = 'performanceevents';
  readonly employeesListUrl = 'employees';
  readonly employeesListGroups = 'groups';


  constructor(private http: HttpClient,
              private langService: LangService,
              @Inject(DOCUMENT) private doc,
              private router: Router,
              private meta: Meta) {
    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });
  }

  getSeasons(): Observable<Array<Season>> {
    return this.http.get<Array<Season>>(`${this.baseUrl}/${this.seasonListUrl}`, {});
  }

  getSeasonPerformances(
    seasonNumber: number,
    audience?: 'kids' | 'adults' | null,
    locale: string = this.localeId,
  ): Observable<Array<Performance>> {
    let params: { locale: string, audience?: string } = { locale };
    if (!!audience) params = { locale, audience};

    return this.http.get<Array<Performance>>(
      `${this.baseUrl}/${this.seasonListUrl}/${seasonNumber}/${this.performanceListUrl}`, {params});
  }

  getPerformanceEventList(fromDate: Date = new Date(), limit: string = '2', locale: string = this.localeId): Observable<ScheduleListResponse> {
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

  getPerformanceRoles(slug, locale: string = this.localeId): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${this.baseUrl}/performances/${slug}/roles`, {params: {locale}})
      .pipe(
        catchError(this.handleError('get list of Roles by Performance', []))
      );
  }

  getActorRoles(slug, locale: string = this.localeId): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${this.baseUrl}/employees/${slug}/roles`, {params: {locale}})
      .pipe(
        catchError(this.handleError('get list of Roles by Actor', []))
      );
  }

  getEmployees(locale: string = this.localeId): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}/${this.employeesListUrl}`, {params: {locale}}
    ).pipe(
      catchError(this.handleError('get Employees list', new Employee()))
    );
  }

  getEmployeesList(locale: string = this.localeId): Observable<EmployeesListResponse> {
    return this.http.get<EmployeesListResponse>(
      `${this.baseUrl}/${this.employeesListUrl}`, {params: {locale}}
    ).pipe(// http://apistaging.theatre.pp.ua/api/employees?limit=all&random=0&seed=0&page=1&locale=uk&group=actors
      catchError(this.handleError('get Employees list arr', new EmployeesListResponse()))
    );
  }

  getEmployeesGroups(locale: string = this.localeId): Observable<Array<EmployeeGroup>> {
    return this.http.get<Array<EmployeeGroup>>(
      `${this.baseUrl}/${this.employeesListUrl}/${this.employeesListGroups}`, {params: {locale}}
    ).pipe(
      catchError(this.handleError('get Employees groups list', []))
    );
  }

  getEmployeesGroup(slug, locale: string = this.localeId, page: string = 'middle'): Observable<EmployeeGroup> {
    return this.http.get<EmployeeGroup>(
      `${this.baseUrl}/${this.employeesListUrl}/${this.employeesListGroups}/${slug}`, {params: {locale}}
    ).pipe(
      catchError(this.handleError('get Employees group', new EmployeeGroup()))
    );
  }

  getEmployeesListByGroup(slug, locale: string = this.localeId, page: string = 'middle'): Observable<EmployeesListResponse> {
    return this.http.get<EmployeesListResponse>(
      `${this.baseUrl}/${this.employeesListUrl}?group=${slug}`, {params: {locale}}
    ).pipe(
      catchError(this.handleError('get Employees list by groupe', new EmployeesListResponse()))
    );
  }

  getRandomEmployees(
    limit: string = '10',
    page: string = 'middle',
    locale: string = this.localeId
  ): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseUrl}/${this.employeesListUrl}?random=1`, {params: {limit: `${limit}`, page: `${page}`, locale}}
    ).pipe(
      catchError(this.handleError('get random Employee', new Employee()))
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

  updateCanonicalURL() {
    if (this.doc.getElementById('canonical')) {
      this.doc.getElementById('canonical').setAttribute('href', `${this.canonicalUrl}${this.localeId}${this.router.url}`);
    }
  }

  updateMeta(title, description, image) {
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      property: 'og:description',
      content: description
    });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }
    this.meta.updateTag({ property: 'og:url', content: `${this.canonicalUrl}${this.localeId}${this.router.url}` });
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
      const notFoundStatus = 404;

      if (error.status === notFoundStatus) {
        this.router.navigate(['/not-found']);
      }
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
