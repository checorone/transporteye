import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ResourceService} from "../../../shared/services/resource.service";
import {BusStopModel} from "../../../shared/models/bus-stop.model";

@Component({
  selector: 'app-busstop-list',
  templateUrl: './busstop-list.component.html',
  styleUrls: ['./busstop-list.component.less']
})
export class BusstopListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'name', 'latitude', 'longitude'];
  public dataSource = new MatTableDataSource<BusStopModel>();

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
     this.resourceService.getBusStops().subscribe(this.setData.bind(this));
  }

  public setData(data: BusStopModel[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}