import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ComponentsEventsService} from '../../shared/services/components-events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit{
  cardId = '';

  constructor(private authService: AuthService,
              private sharedService: ComponentsEventsService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.cardId = this.authService.getCardId();
    this.sharedService.onLoginEvent.subscribe(
      (cardId) => {
        console.log('profile catch '+cardId);
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
