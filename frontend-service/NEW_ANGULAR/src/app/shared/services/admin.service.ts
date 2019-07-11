import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../models/user-info.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = environment.AUTHSERVERURI+'api/v1/admin/card';
  choosenToModifyInfo: any = null;
  selectedTable: string = '';

  constructor(private http: HttpClient) {
  }

  getUsersData() {
    return this.http.get<UserInfo[]>(this.adminUrl);
  }

  updateUser(userInfo: UserInfo, resetPassword: boolean) {
    const bbody = new FormData();
    bbody.set('resetPassword', resetPassword ? 'true' : 'false');
    bbody.set('active', userInfo.active ? 'true' : 'false');
    bbody.set('cardId', userInfo.cardId);
    bbody.set('email', userInfo.email);
    userInfo.roles.forEach(role => {
      bbody.append('roles', role);
    });
    return this.http.put(this.adminUrl, bbody);
  }

  deleteUser(cardId: string) {
    const bbody = new FormData();
    bbody.set('card_id', cardId);
    return this.http.request('DELETE', this.adminUrl, {body: bbody});
  }
}
