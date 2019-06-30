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
  columnsToDisplay = ['date', 'bus_stop_name', 'transport_name', 'route_number'];
  rusColumnsToDisplay = ['Дата и время', 'Остановка', 'Транспорт', 'Путь'];
  expandedElement: TripModel | null;
  private routeBuses = [];

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
        res.forEach(el=>{
          el.date = el.date.replace('T', '  ').split('.')[0];
          if(el.bus_stop_name == undefined)
            el.bus_stop_name = 'Снесена';
          if(el.transport_name == undefined)
            el.transport_name = 'Утилизирован';
        })
        this.dataSource.data = res;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: any) => {
    this.dataSource.filter = value.toString().trim().toLocaleLowerCase();
  }

  showHideInfo(element) {
    if (this.expandedElement === element) {
      this.expandedElement = null;
      this.routeBuses = [];
    } else {
      this.expandedElement = element;
      this.resService.getBusStopsByIds(element.bus_stop_list.split(' ')).subscribe(res=>{
        res.forEach(el=>{
          if(el.id != element.bus_stop_id){
            this.routeBuses.push(el);
          }
        });
      });
    }
  }
}