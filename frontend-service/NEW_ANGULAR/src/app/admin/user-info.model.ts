export class UserInfo {
  cardId: string;
  email: string;
  active: boolean;
  roles: string[];

  equals(otherUser: UserInfo): boolean {
    if (this.cardId != otherUser.cardId) {
      return false;
    }
    if (this.email != otherUser.email) {
      return false;
    }
    if (this.active != otherUser.active) {
      return false;
    }
    if (this.roles.length != otherUser.roles.length) {
      return false;
    }
    for (let i = 0; i < this.roles.length; ++i) {
      if (this.roles[i] !== otherUser.roles[i]) {
        return false;
      }
    }
    return true;
  }

  copyFromRow(userInfo: UserInfo): void {
    console.log(userInfo);
    this.active = userInfo.active;
    this.email = userInfo.email;
    this.cardId = userInfo.cardId;
    this.roles = [];
    userInfo.roles.forEach(el => {
      this.roles.push(el);
    });
  }
}
