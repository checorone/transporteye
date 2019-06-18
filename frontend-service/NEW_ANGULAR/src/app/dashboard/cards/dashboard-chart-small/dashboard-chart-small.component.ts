import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {DashboardCard} from '../dashboard-card';
import {AbstractDashboardCard} from '../abstract-dashboard-card';
import {ChartType} from 'ng-chartist';
import {Subscription, timer} from 'rxjs';
import {formatDate} from '@angular/common';

export interface LiveData {
  labels: string[];
  series: number[][];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}


@Component({
  selector: 'app-dashboard-chart-small',
  templateUrl: './dashboard-chart-small.component.html',
  styleUrls: ['./dashboard-chart-small.component.less']
})
export class DashboardSmallChartComponent extends AbstractDashboardCard implements OnInit, OnDestroy {

  constructor(private injector: Injector) {
    super(injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
	  injector.get(DashboardCard.metadata.COLOR),
	  injector.get(DashboardCard.metadata.DATACALLBACK));

  }

  public data: LiveData;
  public type: ChartType;

  private secFromLastUpdate: number;
  private timerSubscription: Subscription;

  ngOnInit() {
	  this.data = {
        labels: [],
        series: [[]]
      };
      this.type = 'Bar';
  
	  this.timerSubscription = timer(0, 1000).subscribe(() => this.updateData());
	  this.secFromLastUpdate = 4;
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

    // We only want to display 4 data points at a time
    this.data.labels = labels.slice(-4);
    this.data.series[0] = data.slice(-4);

    this.data = { ...this.data };
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}

