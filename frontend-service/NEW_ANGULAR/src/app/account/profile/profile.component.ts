import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ComponentsEventsService} from '../../shared/services/components-events.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  cardId = '';

  constructor(private authService: AuthService,
              sharedService: ComponentsEventsService,
              private router: Router
  ) {
    sharedService.onLoginEvent.subscribe(
      (cardId) => {
        this.cardId = cardId;
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.cardId = '';
    this.router.navigate(['']);
  }
}
