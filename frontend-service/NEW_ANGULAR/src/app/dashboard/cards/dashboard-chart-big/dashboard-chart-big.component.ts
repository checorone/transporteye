import {Component, Injector, OnInit, OnDestroy} from '@angular/core';
import {DashboardCard} from '../dashboard-card';
import {AbstractDashboardCard} from '../abstract-dashboard-card';
import { ChartType } from 'ng-chartist';
import { Subscription, timer } from 'rxjs';
import { formatDate } from '@angular/common';

export interface LiveData {
  labels: string[];
  series: number[][];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}


@Component({
  selector: 'app-dashboard-chart-big',
  templateUrl: './dashboard-chart-big.component.html',
  styleUrls: ['./dashboard-chart-big.component.less']
})
export class DashboardBigChartComponent extends AbstractDashboardCard implements OnInit, OnDestroy {
  
  private secFromLastUpdate: number;

  constructor(private injector: Injector) {
    super(injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
	  injector.get(DashboardCard.metadata.COLOR),
	  injector.get(DashboardCard.metadata.DATACALLBACK));

      this.data = {
        labels: [],
        series: [[]]
      };
      this.type = 'Line';
  
	  this.timerSubscription = timer(0, 1000).subscribe(() => this.updateData());
	  this.secFromLastUpdate = 4;
  }

  public data: LiveData;
  public type: ChartType;

  private timerSubscription: Subscription;

  ngOnInit() {
  }

  updateData() {
      this.secFromLastUpdate++;
	  if(this.secFromLastUpdate == 5) {
		  this.dataCallback().subscribe(this.setData.bind(this));
		  this.secFromLastUpdate = 0;
	  }
  }

  setData(value: number) {
	const time: Date = new Date(),
      formattedTime = formatDate(time, 'HH:mm:ss', 'en'),
      data = this.data.series[0],
      labels = this.data.labels;

    labels.push(formattedTime);
    data.push(value);

    // We only want to display 10 data points at a time
    this.data.labels = labels.slice(-9);
    this.data.series[0] = data.slice(-9);

    this.data = { ...this.data };
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}

