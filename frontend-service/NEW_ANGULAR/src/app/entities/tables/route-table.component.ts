import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {ResourceService} from "../../shared/services/resource.service";
import {AdminService} from "../../shared/services/admin.service";
import {Router} from "@angular/router";
import {EMPTY} from "rxjs";
import {UserInfo} from "../../shared/models/user-info.model";
import {catchError} from "rxjs/operators";
import {RouteModel} from "../../shared/models/route.model";

@Component({
  selector: 'app-route-table',
  templateUrl: './common-table.html',
  styleUrls: ['./common-table.less']
})
export class RouteTableComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['routeId', 'routeNumber', 'busStopList'];
  public rusDisplayedColumns = ['ID', 'Название', 'Номера остановок'];
  public dataSource = new MatTableDataSource<RouteModel>();
  private canAdd = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resService: ResourceService,
              private adminService: AdminService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllTransport();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllTransport() {
    this.resService.getRoutes()
      .pipe(
        catchError(err => {
          this.snackBar.open(err, 'OK', {
            duration: 5000,
          });
          console.log(err);
          throw EMPTY;
        }))
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = res;
        console.log( this.dataSource.data);
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };


  modifyCall(element: UserInfo) {
    this.adminService.choosenToModifyInfo = element;
    this.router.navigate(['/admin/route/modify']);
  }

  addNew(){
    this.adminService.choosenToModifyInfo = null;
    this.router.navigate(['admin/route/modify']);
  }
}

