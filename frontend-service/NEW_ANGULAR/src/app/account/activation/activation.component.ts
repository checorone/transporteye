import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.less']
})
export class ActivationComponent implements OnInit {
  message: string;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.activate(this.route.snapshot.paramMap.get('uuid')).pipe(catchError((error) => {
        this.success = false;
        if (error.message.includes('Invalid UUID string')) {
          this.message = 'Не удалось активировать аккаунт. Возможно, ссылка была повреждена';
        } else
          this.message = error;
        console.log(error);
        return EMPTY;
      })
    ).subscribe(() => {
      this.message = 'Аккаунт был активирован';
      this.success = true;
    });
  }
}
