import {Component, Injector, OnInit} from '@angular/core';
import {DashboardCard} from '../dashboard-card';
import {AbstractDashboardCard} from '../abstract-dashboard-card';
import { Subscription, timer } from 'rxjs';

export interface IData {
	first: number,
	second: number
}

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.less']
})
export class DashboardInfoComponent extends AbstractDashboardCard implements OnInit {

  private secFromLastUpdate: number;
  private timerSubscription: Subscription;
  first: number;
  second: number;
  
  constructor(private injector: Injector) {
    super(injector.get(DashboardCard.metadata.NAME),
      injector.get(DashboardCard.metadata.ROUTERLINK),
      injector.get(DashboardCard.metadata.ICONCLASS),
      injector.get(DashboardCard.metadata.COLS),
      injector.get(DashboardCard.metadata.ROWS),
	  injector.get(DashboardCard.metadata.COLOR),
	  injector.get(DashboardCard.metadata.DATACALLBACK));
  }

  ngOnInit() {
 	this.timerSubscription = timer(0, 1000).subscribe(() => this.updateData());
	this.secFromLastUpdate = 4;
	this.first = 0;
	this.second = 0;
  }

  updateData() {
	  this.secFromLastUpdate++;
	  if(this.secFromLastUpdate == 5) {
		  this.dataCallback().subscribe(this.setData.bind(this));
		  this.secFromLastUpdate = 0;
	  }
	  
  }

  setData(value: IData) {
	this.first = value.first;
	this.second = value.second;
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
