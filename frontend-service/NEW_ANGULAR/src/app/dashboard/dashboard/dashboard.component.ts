import {Component, OnInit} from '@angular/core';
import {DashboardCard} from '../cards/dashboard-card';
import {Observable} from 'rxjs';
import {DashboardCardsService} from '../services/dashboard-cards/dashboard-cards.service';
import {MediaObserver} from '@angular/flex-layout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {DashboardInfoComponent} from '../cards/dashboard-info/dashboard-info.component';
import {DashboardSmallChartComponent} from '../cards/dashboard-chart-small/dashboard-chart-small.component';
import {DashboardMidChartComponent} from '../cards/dashboard-chart-mid/dashboard-chart-mid.component';
import {DashboardBigChartComponent} from '../cards/dashboard-chart-big/dashboard-chart-big.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  entryComponents: [DashboardBigChartComponent, DashboardSmallChartComponent, DashboardMidChartComponent, DashboardInfoComponent]
})
export class DashboardComponent implements OnInit {

  cards: DashboardCard[] = [];
  cols: Observable<number>;
  cols_big: Observable<number>;
  cols_sml: Observable<number>;

  bigCardsEnabled : boolean = true;
  midCardsEnabled : boolean = true;
  smallCardsEnabled : boolean = true;

  constructor(private cardsService: DashboardCardsService,
              private observableMedia: MediaObserver) {
    this.cardsService.cards.subscribe(cards => {
      this.cards = cards;
    });
  }

  toggleBig() : void {
    this.bigCardsEnabled = !this.bigCardsEnabled;
    this.createCards();
  }

  toggleMid() : void {
    this.midCardsEnabled = !this.midCardsEnabled;
    this.createCards();
  }

  toggleSml() : void {
    this.smallCardsEnabled = !this.smallCardsEnabled;
    this.createCards();
  }

  ngOnInit() {
    /* Grid column map */
    const cols_map = new Map([
      ['xs', 2],
      ['sm', 4],
      ['md', 8],
      ['lg', 8],
      ['xl', 8]
    ]);
    /* Big card column span map */
    const cols_map_big = new Map([
      ['xs', 2],
      ['sm', 2],
      ['md', 4],
      ['lg', 4],
      ['xl', 4]
    ]);
    /* Small card column span map */
    const cols_map_sml = new Map([
      ['xs', 1],
      ['sm', 1],
      ['md', 2],
      ['lg', 2],
      ['xl', 2]
    ]);
    let start_cols: number;
    let start_cols_big: number;
    let start_cols_sml: number;
    cols_map.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols = cols;
      }
    });
    cols_map_big.forEach((cols_big, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols_big = cols_big;
      }
    });
    cols_map_sml.forEach((cols_sml, mqAliast) => {
      if (this.observableMedia.isActive(mqAliast)) {
        start_cols_sml = cols_sml;
      }
    });
    this.cols = this.observableMedia.media$
      .map(change => {
        return cols_map.get(change.mqAlias);
      }).startWith(start_cols);
    this.cols_big = this.observableMedia.media$
      .map(change => {
        return cols_map_big.get(change.mqAlias);
      }).startWith(start_cols_big);
    this.cols_sml = this.observableMedia.media$
      .map(change => {
        return cols_map_sml.get(change.mqAlias);
      }).startWith(start_cols_sml);
    this.createCards();
  }

  createCards(): void {
    this.cardsService.clear();
    if (this.smallCardsEnabled)
      this.createSmallCards();
    if (this.midCardsEnabled)
      this.createMidCards();
    if (this.bigCardsEnabled)
      this.createBigCards();
    
    
  }

  createSmallCards() : void {
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'Element'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'assessment'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_sml
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardInfoComponent /* Reference to the component we'd like to spawn */
      )
    );
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_sml
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardInfoComponent
      )
    );
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_sml
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardInfoComponent
      )
    );
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_sml
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardInfoComponent
      )
    );
  }

  createMidCards() : void {
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_big
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_big
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardMidChartComponent
      )
    );
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_big
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardSmallChartComponent
      )
    );
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'fa-users'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols_big
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_sml
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardSmallChartComponent
      )
    );
  }

  createBigCards() : void {
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: {
            key: DashboardCard.metadata.NAME,
            value: 'users'
          },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: '/dashboard/users'
          },
          iconClass: {
            key: DashboardCard.metadata.ICONCLASS,
            value: 'assessment'
          },
          cols: {
            key: DashboardCard.metadata.COLS,
            value: this.cols
          },
          rows: {
            key: DashboardCard.metadata.ROWS,
            value: this.cols_big
          },
          color: {
            key: DashboardCard.metadata.COLOR,
            value: 'blue'
          }
        }, DashboardBigChartComponent
      )
    );
  }
}
