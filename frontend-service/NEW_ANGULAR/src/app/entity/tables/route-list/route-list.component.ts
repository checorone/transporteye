import { ResourceService } from './../../../shared/services/resource.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface IRoute {
	routeId: number,
	routeNumber: string,
	busStopList: string
}

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.less']
})
export class RouteListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['routeId', 'routeNumber', 'busStopList'];
  public dataSource = new MatTableDataSource<IRoute>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getAllRoutes();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllRoutes() {
     this.resourceService.getRouteData().subscribe(this.setData.bind(this));
  }

  public setData(data: IRoute[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}