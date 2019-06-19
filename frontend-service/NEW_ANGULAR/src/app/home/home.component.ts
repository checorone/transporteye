import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ComponentsEventsService} from "../shared/services/components-events.service";


@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.less']
})
export class HomeComponent implements OnInit{
  cardId = '';

  constructor(
    private sharedService: ComponentsEventsService,
    private authService: AuthService
  ) {  }

  ngOnInit(): void {
    this.cardId = this.authService.getCardId();
    this.sharedService.onLoginEvent.subscribe(
      (cardId) => {
        console.log('home catch '+cardId);
        this.cardId = cardId;
      }
    );
  }
}
