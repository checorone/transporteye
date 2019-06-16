import {RepositoryService} from './../../shared/services/repository.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Transport} from '../../shared/models/transport.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.less']
})
export class TransportListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['id', 'name', 'workload', 'latitude', 'longitude'];
  public dataSource = new MatTableDataSource<Transport>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, private router: Router) { }

  ngOnInit() {
    this.getAllTransports();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllTransports() {
     // this.dataSource.data =  this.repoService.getTransportData();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
