import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  private submitted: boolean;
  public message: any;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      cardId: ['', Validators.pattern(/^\d{16}$/)],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.regForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }
    this.authService.register(this.f.cardId.value, this.f.password.value, this.f.email.value)
      .pipe(catchError((error) => {
          if (error.toString().includes(',')) {
            // this.message = '<ul>';
            // error.split(',').forEach(el => {
            //   this.message += '<li>' + el + '</li>';
            // });
            // this.message += '</ul>';
            this.message='<div>';
            error.split(',').forEach(el => {
              this.message += '<br/>&bull; ' + el;
            });
            this.message+='</div>';
          } else {
            this.message = error;
          }
          console.log(error);
          return EMPTY;
        })
      ).subscribe(() => {
      this.message = 'Письмо было отправлено на почту';
    });
  }

  getMailError() {
    return this.f.email.errors.required ? 'Почта обязательна' :
      this.f.email.errors.email ? 'Неверный формат почты' :
        'Такого быть не должно';
  }
}
