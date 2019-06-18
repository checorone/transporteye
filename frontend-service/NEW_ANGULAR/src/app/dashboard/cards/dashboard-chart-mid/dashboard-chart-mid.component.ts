import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {DashboardCard} from '../dashboard-card';
import {AbstractDashboardCard} from '../abstract-dashboard-card';
import {ChartOptions, ChartType} from 'ng-chartist';
import {Subscription, timer} from 'rxjs';

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
  public options: ChartOptions;
  public type: ChartType;

  private timerSubscription: Subscription;

  constructor(private injector: Injector) {
    super(injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
      injector.get(DashboardCard.metadata.COLOR));

      this.data = {
        labels: [],
        series: []
      };
      this.type = 'Pie';
      this.options = {
        labelInterpolationFnc: function(value) {
          return value[0]
        }
      };
  
      this.timerSubscription = timer(0, 2500).subscribe(() => this.updateData());
      
  }

  ngOnInit() {
  }

  updateData() {
    this.data = {
      labels: ['Свободные места', 'Билеты', 'Зайцы'],
      series: [getRandomInt(0,40), getRandomInt(0,40), getRandomInt(0,40)]
    };
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}

