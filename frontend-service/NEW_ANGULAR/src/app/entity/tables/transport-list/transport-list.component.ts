import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ResourceService} from "../../../shared/services/resource.service";

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.less']
})
export class TransportListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'name', 'seats', 'latitude', 'longitude'];
  public dataSource = new MatTableDataSource<Transport>();

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
     this.resourceService.getTransport().subscribe(this.setData.bind(this));
  }

  public setData(data: Transport[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
