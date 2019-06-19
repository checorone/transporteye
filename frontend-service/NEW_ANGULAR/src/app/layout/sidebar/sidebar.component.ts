import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {ComponentsEventsService} from "../../shared/services/components-events.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit{

  @Output() sidenavClose = new EventEmitter();
  private cardId = '';

  constructor(private authService: AuthService,
              private sharedService: ComponentsEventsService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.cardId = this.authService.getCardId();
    this.sharedService.onLoginEvent.subscribe(
      (cardId) => {
        this.cardId = cardId;
      }
    );
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
