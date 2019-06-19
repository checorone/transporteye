import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {ProfileComponent} from '../../layout/profile/profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [ProfileComponent]
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private submitted: boolean;
  public message: string;
  hide = true;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      cardId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.cardId.value, this.f.password.value)
        .pipe(catchError((error) => {
              this.message = error;
              console.log(error);
              return EMPTY;
            })
        ).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  recoverPassword() {
    if (this.f.cardId.value === '') {
      this.message = 'Укажите логин для восстановления';
      return;
    }
    this.authService.recovery(this.f.cardId.value).pipe(catchError(error => {
      this.message = error;
      console.log(error);
      return EMPTY;
    })).subscribe(() => {
      this.message = 'Письмо для изменения пароля отправлено на почту';
    });
  }
}

