import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {UserInfo} from "../user-info.model";
import {AdminService} from "../admin.service";
import {Router} from "@angular/router";
import {EMPTY} from "rxjs";
import {RepositoryService} from "../../shared/services/repository.service";
import {catchError} from "rxjs/operators";
import {BusStopModel} from "../../shared/models/bus-stop.model";

@Component({
  selector: 'app-bus-stops-table',
  templateUrl: './common-table.html',
  styleUrls: ['./common-table.less']
})
export class BusStopsTableComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['bus_stop_id', 'bus_stop_name', 'latitude', 'longitude'];
  public rusDisplayedColumns = ['ID', 'Название', 'Широта', 'Долгота'];
  public dataSource = new MatTableDataSource<BusStopModel>();
  private canAdd = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
              private resService: RepositoryService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllBusStops();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllBusStops() {
    this.resService.getBusStops()
        .pipe(
            catchError(err => {
              this.snackBar.open(err, 'OK', {
                duration: 5000,
              });
              console.log(err);
              throw EMPTY;
            }))
        .subscribe(res => {
          this.dataSource.data = res;
        });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };


  modifyCall(element: UserInfo) {
    this.adminService.choosenToModifyInfo = element;
    this.router.navigate(['admin/busStop/modify']);
  }

  addNew(){
    this.adminService.choosenToModifyInfo = null;
    this.router.navigate(['admin/busStop/modify']);
  }
}
