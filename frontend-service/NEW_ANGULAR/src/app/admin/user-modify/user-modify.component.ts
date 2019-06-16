import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';
import {UserInfo} from '../user-info.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.less']
})
export class UserModifyComponent implements OnInit {

  userForm: FormGroup;
  userInfo: UserInfo;
  message: string;

  constructor(
      private adminService: AdminService,
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder,
      private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.userInfo = new UserInfo();
    this.userInfo.copyFromRow(this.adminService.choosenToModifyInfo);
    this.userForm = this.formBuilder.group({
      email: [this.userInfo.email, [Validators.email]],
      active: [this.userInfo.active],
      resetPassword: [false]
    });
  }

  setRoles(roles: string[]) {
    this.userInfo.roles = roles;
  }

  getMailError() {
    return this.f.email.errors.required ? 'Почта обязательна' :
        this.f.email.errors.email ? 'Неверный формат почты' :
            'Такого быть не должно';
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.userInfo.active = this.f.active.value;
    this.userInfo.email = this.f.email.value;
    if (this.userInfo.equals(this.adminService.choosenToModifyInfo) && !this.f.resetPassword.value) {
      this.message = 'Нет изменений';
      return;
    }
    if (this.authService.getCardId() == this.userInfo.cardId && !this.userInfo.roles.includes('ADMIN')) {
      this.message = 'Сделать вас пользователем может только другой администратор';
      return;
    }
    this.adminService.updateUser(this.userInfo, this.f.resetPassword.value)
        .pipe(catchError(err => {
          this.message = err;
          console.log(err);
          return EMPTY;
        }))
        .subscribe(() => {
          this.message = 'Пользователь был обновлен';
          this.adminService.choosenToModifyInfo = null;
        });

  }

  deleteUser() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: '250px',
      data: {message: 'пользователя ' + this.userInfo.cardId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.adminService.deleteUser(this.userInfo.cardId)
            .pipe(catchError(err => {
              this.message = err;
              console.log(err);
              return EMPTY;
            })).subscribe(() => {
          this.router.navigate(['admin/cards']);
        });
      }
    });
  }
}
