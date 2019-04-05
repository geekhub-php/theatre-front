import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PerformanceListResponse } from '../model/PerformanceListResponse';
import { environment } from '../../../environments/environment';
import { NewsListResponse } from '../model/news/NewsListResponse';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly performanceListUrl = '/performances.json';
  readonly newsListUrl = 'posts.json';
  readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPerformanceList(limit = 10): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(`${this.baseUrl}/${this.performanceListUrl}`, { params: {limit: '100'} })
      .pipe(
          catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }


 // getNews(limit: string = '10', page: string = '1', locale: string = 'uk') {
 //   return this.http.get(`${this.baseUrl}/${this.newsListUrl}`, {
 //     params: { limit: limit, page: page, locale: locale }
 //   });
 // }
  getNews(limit: string = '3', page: string = '1', locale: string = 'uk'): Observable<NewsListResponse> {
    return this.http.get<NewsListResponse>(`${this.baseUrl}/${this.newsListUrl}`, {
      params: {limit: limit, page: page, locale: locale}
    });
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
