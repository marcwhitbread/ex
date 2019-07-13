import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class PlanService {
  private urlBases: string[] = ['/plans'];

  destinations = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getDestinations(): Observable<any> {

    return this.http
      .get<any>(this.urlBases[0])
      .pipe(
        tap((destinations: any) => {
          this.destinations.next(destinations);
        }),
        catchError(this.handleError)
      );

  }

  createDestination(
    form
  ): Observable<any> {

    return this.http
      .post<any>(this.urlBases[0], form)
      .pipe(
        tap((destination: any) => {
        }),
        catchError(this.handleError)
      );

  }

  removeDestination(
    index
  ): Observable<any> {

    return this.http
      .delete<any>(this.urlBases[0] + '/' + index)
      .pipe(
        tap((destination: any) => {
        }),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    console.log('error', error.status);
    return throwError(error);
  }

}