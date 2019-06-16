import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = 'http://localhost:8901/api/v1/admin/';
  choosenToModifyInfo: any = null;

  constructor(private http: HttpClient) {
  }

  getUsersData() {
    return this.http.get<UserInfo[]>(this.adminUrl + 'card/get/all');
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
    return this.http.put(this.adminUrl + 'card/update', bbody);
  }

  deleteUser(cardId: string) {
    const bbody = new FormData();
    bbody.set('card_id', cardId);
    return this.http.request('DELETE', this.adminUrl + 'card/delete', {body: bbody});
  }
}
