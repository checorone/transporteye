import { ResourceService } from './../../../shared/services/resource.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface IBusStop {
	busStopId: number,
	busStopName: string,
	longitude: number,
	latitude: number
}

@Component({
  selector: 'app-busstop-list',
  templateUrl: './busstop-list.component.html',
  styleUrls: ['./busstop-list.component.less']
})
export class BusstopListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['busStopId', 'busStopName', 'latitude', 'longitude'];
  public dataSource = new MatTableDataSource<IBusStop>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getAllBusstops();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllBusstops() {
     this.resourceService.getBusStopData().subscribe(this.setData.bind(this));
  }

  public setData(data: IBusStop[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}