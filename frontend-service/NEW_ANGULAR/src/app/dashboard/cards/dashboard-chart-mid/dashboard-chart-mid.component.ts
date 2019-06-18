import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {DashboardCard} from '../dashboard-card';
import {AbstractDashboardCard} from '../abstract-dashboard-card';
import {ChartType} from 'ng-chartist';
import {Subscription, timer} from 'rxjs';
import {AnalitycService} from 'src/app/shared/services/analityc.service'

export interface IPassengerTypes {
	in: number;
	out: number;
	validated: number;
}

export interface LiveData {
  labels: string[];
  series: number[];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-dashboard-chart-mid',
  templateUrl: './dashboard-chart-mid.component.html',
  styleUrls: ['./dashboard-chart-mid.component.less']
})
export class DashboardMidChartComponent extends AbstractDashboardCard implements OnInit, OnDestroy {

  public data: LiveData;
  public type: ChartType;
  private secFromLastUpdate: number;

  private timerSubscription: Subscription;

  constructor(private injector: Injector, private resourceService: AnalitycService) {
    super(injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
	  injector.get(DashboardCard.metadata.COLOR),
	  injector.get(DashboardCard.metadata.DATACALLBACK));      
  }

  ngOnInit() {
	this.data = {
        labels: [],
        series: []
      };
    this.type = 'Pie';
	this.timerSubscription = timer(0, 1000).subscribe(() => this.updateData());
	this.secFromLastUpdate = 4;
  }

  updateData() {
	this.secFromLastUpdate++;
	if (this.secFromLastUpdate == 5) {
	this.resourceService.getPassengerTypes().subscribe((datad: IPassengerTypes) => {
			this.data = {
							labels: ['Пассажиры с билетами', 'Безбилетники', 'Свободные места'],
							series: [datad.validated, datad.in - datad.validated, 40]
						};
			this.secFromLastUpdate = 0;
		});
	}
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}

