import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private urlBase: string = environment.api;

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

  const token = this.tokenService.getToken();

    if (token) {
      const cloned = req.clone({
        url: this.urlBase + req.url,
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(cloned);
    } else {
      const cloned = req.clone({
        url: this.urlBase + req.url
      });

      return next.handle(cloned);
    }

  }

}
