import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

  recoveryForm: FormGroup;
  public message: string;
  hide1 = true;
  hide2 = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  get f() {
    return this.recoveryForm.controls;
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      return;
    }
    if (this.f.password1.value !== this.f.password2.value) {
      this.message = 'Пароли не совпадают';
      return;
    }

    this.authService.resetPassword(this.route.snapshot.paramMap.get('uuid'), this.f.password1.value)
        .pipe(catchError((error) => {
              if (error.toString().includes(',')) {
                this.message = '<ul>';
                error.split(',').forEach(el => {
                  this.message += '<li>' + el + '</li>';
                });
                this.message += '</ul>';
              } else {
                this.message = error;
              }
              console.log(error);
              return EMPTY;
            })
        ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

