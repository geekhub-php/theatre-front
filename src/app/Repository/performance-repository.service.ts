import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PerformanceListResponse} from '../models';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PerformanceRepositoryService {
  readonly performanceListUrl = 'http://api.theatre.pp.ua/performances.json';

  constructor(private http: HttpClient) { }
  getList (): Observable<PerformanceListResponse> {
    return this.http.get<PerformanceListResponse>(this.performanceListUrl, { params: {'limit': '100'} })
      .pipe(
          catchError(this.handleError('get list of Performances', new PerformanceListResponse()))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
