import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ResourceService} from "../../shared/services/resource.service";
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {TripModel} from "../../shared/models/trip.model";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TripsTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<TripModel>();
  columnsToDisplay = ['date', 'busStopName', 'transportName'];
  expandedElement: TripModel | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resService: ResourceService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.resService.getTrips()
      .pipe(catchError(err => {
        this.snackBar.open(err, 'OK', {
          duration: 5000,
        });
        return throwError(err);
      }))
      .subscribe((res) => {
        this.dataSource.data = res;
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: any) => {
    console.log(value);
    this.dataSource.filter = value.toString().trim().toLocaleLowerCase();
  }
}