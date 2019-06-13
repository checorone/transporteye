import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserInfo} from '../user-info.model';
import {AdminService} from '../admin.service';
import {EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-users-table',
  templateUrl: './common-table.html',
  styleUrls: ['./common-table.less']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['cardId', 'email', 'active', 'roles'];
  public rusDisplayedColumns = ['ID карты', 'Email', 'Активен', 'Права'];
  public dataSource = new MatTableDataSource<UserInfo>();
  private canAdd = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllUsers() {
    this.adminService.getUsersData()
        .pipe(
            catchError(err => {
              this.snackBar.open(err, 'OK', {
                duration: 2000,
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
    this.adminService.choosenUserInfo = element;
    console.log(this.adminService.choosenUserInfo);
    this.router.navigate(['admin/card/modify']);
  }
}
