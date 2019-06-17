import { ResourceService } from './../../../shared/services/resource.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface ITransport {
	transportId: number,
	name: string,
	seats: number,
	longitude: number,
	latitude: number
}

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.less']
})
export class TransportListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['transportId', 'name', 'seats', 'latitude', 'longitude'];
  public dataSource = new MatTableDataSource<ITransport>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getAllTransports();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllTransports() {
     this.resourceService.getTransportData().subscribe(this.setData.bind(this));
  }

  public setData(data: ITransport[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
