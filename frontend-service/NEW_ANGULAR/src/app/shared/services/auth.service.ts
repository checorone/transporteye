import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {ComponentsEventsService} from './components-events.service';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Basic ' + btoa('netcracker:ncpassword')
    // Authorization: 'Basic ' + btoa('shortaccesstoken:ncpassword')
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authServerUrl = 'http://localhost:8901/';
  // private authServerUrl = 'http://authenticationservice:8901/';
  private authUrl = this.authServerUrl + 'oauth/token';
  private registerUrl = this.authServerUrl + 'api/v1/users/register';
  private activateUrl = this.authServerUrl + 'api/v1/users/activation/';
  private activateClientUrl = location.origin + '/activation';
  private recoverClientUrl = location.origin + '/recovery';
  private recoverUrl = this.authServerUrl + 'api/v1/users/password/recovery';
  private changePasswdUrl = this.authServerUrl + 'api/v1/users/password/change';
  private logoutUrl = this.authServerUrl + 'api/v1/logout';


  constructor(
      private http: HttpClient,
      private cookieService: CookieService,
      private eventsService: ComponentsEventsService
  ) {
  }

  public login(cardId: any, password: any): Observable<any> {
    const body = new FormData();
    body.set('grant_type', 'password');
    body.set('username', cardId);
    body.set('password', password);
    return this.http.post<any>(this.authUrl,
        // {
        //   grant_type: 'password',
        //   username: cardId,
        //   password
        // },
        body,
        httpOptions)
        .pipe(tap(resp => {
          this.setCookies(resp);
        }));
  }

  public register(cardId: any, password: any, email: any): Observable<any> {
    const body = new FormData();
    body.set('email', email);
    body.set('cardId', cardId);
    body.set('password', password);
    body.set('clientLink', this.activateClientUrl);
    return this.http.post(this.registerUrl, body, {responseType: 'text'});
  }

  public activate(uuid: string) {
    return this.http.put(this.activateUrl + uuid, {});
  }

  public recovery(cardId: string): Observable<any> {
    const body = new FormData();
    body.set('cardId', cardId);
    body.set('clientLink', this.recoverClientUrl);
    return this.http.put(this.recoverUrl, body);
  }

  public resetPassword(uuid: string, passwd: string): Observable<any> {
    const body = new FormData();
    body.set('uuid', uuid);
    body.set('password', passwd);
    return this.http.put(this.changePasswdUrl, body);
  }

  public logout(): void {
    const hasAccess = this.cookieService.check('access_token');
    const hasRefresh = this.cookieService.check('refresh_token');
    if (hasAccess || hasRefresh) {
      if (hasRefresh) {
        const bbody = new FormData();
        bbody.set('refresh_token', this.cookieService.get('refresh_token'));
        this.cookieService.delete('refresh_token');

        // this.cookieService.deleteAll();
        this.http.request('DELETE', this.logoutUrl, {body: bbody}).pipe(catchError(err => {
          return throwError(err);
        })).subscribe(() => {
          this.eventsService.onLoginEvent.emit('');
        });
      }
    } else {
      this.eventsService.onLoginEvent.emit('');
    }
    this.cookieService.delete('access_token');
    this.cookieService.delete('id');
    this.cookieService.delete('authorities');
  }

  public tryGetAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  public setCookies(resp): void {
    console.log(new Date(new Date().getTime() + (1000 * resp.expires_in)));
    this.cookieService.set('access_token', resp.access_token, new Date().getTime() + (1000 * resp.expires_in));
    this.cookieService.set('refresh_token', resp.refresh_token, new Date().getDate() + 30);
    const info = jwt_decode(resp.access_token);
    console.log('decoded tokens');
    console.log(info);
    console.log(jwt_decode(resp.refresh_token));
    this.cookieService.set('authorities', info.authorities);
    this.eventsService.onLoginEvent.emit(info.user_name);

  }

  public isAdmin(): boolean {
    return this.cookieService.get('authorities').includes('ADMIN');
  }

  public isAuthorized(): boolean {
    return this.cookieService.check('id');
  }

  public getCardId(): string {
    return this.cookieService.check('access_token') ?
        jwt_decode(this.cookieService.get('access_token')).user_name : '';
  }

  refreshAccessToken(): Observable<any> {
    const body = new FormData();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.cookieService.get('refresh_token'));
    return this.http.post<any>(this.authUrl, body, httpOptions).pipe(tap(resp => {
      this.setCookies(resp);
    }));
  }

  hasRefreshToken(): boolean {
    return this.cookieService.check('refresh_token');
  }
}
