import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {ComponentsEventsService} from './components-events.service';
import {environment} from '../../../environments/environment';

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
  private authServerUrl = environment.AUTHSERVERURI;
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
    // private cookieService: CookieService,
    private eventsService: ComponentsEventsService
  ) {
  }

  public login(cardId: any, password: any): Observable<any> {
    const body = new FormData();
    body.set('grant_type', 'password');
    body.set('username', cardId);
    body.set('password', password);
    return this.http.post<any>(this.authUrl, body, httpOptions)
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
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const bbody = new FormData();
      bbody.set('refresh_token', refreshToken);
      localStorage.removeItem('refresh_token');
      this.http.request('DELETE', this.logoutUrl, {body: bbody}).pipe(catchError(err => {
        return throwError(err);
      })).subscribe(() => {
        this.eventsService.onLoginEvent.emit('');
      });
    } else {
      this.eventsService.onLoginEvent.emit('');
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('authorities');
  }

  public tryGetAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  public setCookies(resp): void {
    console.log(new Date(new Date().getTime() + (1000 * resp.expires_in)));
    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('refresh_token', resp.refresh_token);
    const info = jwt_decode(resp.access_token);
    localStorage.setItem('authorities', info.authorities);
    this.eventsService.onLoginEvent.emit(info.user_name);

  }

  public getRole(): string {
    if(localStorage.getItem('authorities').includes('ADMIN'))
      return 'admin';
    if(localStorage.getItem('authorities').includes('USER'))
      return 'user';
  }

  public getCardId(): string {
    let accessToken = localStorage.getItem('access_token');
    return accessToken != null ? jwt_decode(accessToken).user_name : '';
  }

  refreshAccessToken(): Observable<any> {
    const body = new FormData();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', localStorage.getItem('refresh_token'));
    return this.http.post<any>(this.authUrl, body, httpOptions).pipe(tap(resp => {
      this.setCookies(resp);
    }));
  }

  hasRefreshToken(): boolean {
    return localStorage.getItem('refresh_token') != null;
  }
}
