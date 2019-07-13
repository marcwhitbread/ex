import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError,  Observable ,  BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from './../users/user';
import { Authentication } from './authentication';

import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {

  private urlBase = '/auth';
  public auth = new BehaviorSubject<User>(null);
  user: User = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  isLoggedIn(): boolean {

    return (this.user != null);

  }

  check(): Observable<User> {

    return this.http
      .get<User>(this.urlBase)
      .pipe(
        tap((auth: Authentication) => {

          if (auth.user) {
            this.user = auth.user;
          }

          if (auth.token && this.user) {
            this.tokenService.setToken(this.user.email, auth.token);
          }

          this.auth.next(this.user);

        }),
        catchError((error: HttpErrorResponse) => {
          this.clearSession();
          return throwError(error);
        })
      );

  }

  login(
    email: string,
    password: string
  ): Observable<Authentication> {

    return this.http
      .post<Authentication>(this.urlBase + '/login', { email, password })
      .pipe(
        tap((auth: Authentication) => {

          if (auth.user) {
            this.user = auth.user;
          }

          if (auth.token) {
            this.tokenService.setToken(email, auth.token);
          }

          this.auth.next(this.user);

        }),
        catchError(this.handleError)
      );

  }

  clearSession(): void {

    this.user = null;
    this.tokenService.clearToken();
    this.auth.next(null);

  }

  logout(): void {

    this.clearSession();

  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
