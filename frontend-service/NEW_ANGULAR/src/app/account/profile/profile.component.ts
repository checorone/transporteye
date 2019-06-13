import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ComponentsEventsService} from '../../shared/services/components-events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  cardId = '';

  constructor(private authService: AuthService,
              private sharedService: ComponentsEventsService,
              private router: Router
  ) {
    this.cardId = authService.getCardId();
    sharedService.onLoginEvent.emit(this.cardId);
    sharedService.onLoginEvent.subscribe(
        (cardId) => {
          this.cardId = cardId;
        }
    );
  }

  logout() {
    this.authService.logout();
    // this.cardId = '';
    this.router.navigate(['']);
  }
}
