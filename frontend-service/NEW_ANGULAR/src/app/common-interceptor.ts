import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import {catchError, filter, take} from 'rxjs/operators';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/take';
import 'rxjs-compat/add/operator/switchMap';
import 'rxjs-compat/add/operator/catch';
import 'rxjs-compat/add/operator/mergeMap';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('admin') || req.url.includes('user')) {
      req = this.addAccessToken(req);
    }
    return next.handle(req).pipe(catchError(err => {
      console.log(err);
      if (err.status === 0) {
        return throwError('Ошибка подключения');
      }
      if (err.status === 400) {
        if (req.body.get('refresh_token') != null) {
          console.log('should logout');
          this.authService.logout();
          this.router.navigate(['/login']);
          return EMPTY;
        }
        if (err.error.error_description) {
          console.log(err.error.error_description);
          return throwError(err.error.error_description);
        }
        return throwError(err.error);
      }
      if (err.status === 401) {
        if (this.authService.hasRefreshToken()) {
          return this.startRefreshing(req, next);
        }
        console.log('should logout');
        this.authService.logout();
        this.router.navigate(['/login']);
        return EMPTY;
      }
      console.log('should route');
      this.router.navigate([err.status]);
      return EMPTY;
    }));
  }

  addAccessToken(request) {
    const accessToken = this.authService.tryGetAccessToken();
    if (!accessToken || typeof accessToken === 'undefined') {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  }

  private startRefreshing(request: any, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken()
          .pipe(catchError(err => {
            if (err.status === 401) {
              this.authService.logout();
              this.router.navigate(['/login']);
              return EMPTY;
            }
          }))
          .switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token);
            return next.handle(this.addAccessToken(request));
          });

    } else {
      return this.refreshTokenSubject
          .pipe(
              filter(token => token != null),
              take(1))
          .switchMap(() => {
            return next.handle(this.addAccessToken(request));
          });
    }
  }
}
