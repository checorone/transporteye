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
  username = '';

  constructor(private authService: AuthService,
              sharedService: ComponentsEventsService,
              private router: Router
  ) {
    sharedService.onLoginEvent.subscribe(
      (username) => {
        this.username = username;
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.username = '';
    this.router.navigate(['']);
  }
}
