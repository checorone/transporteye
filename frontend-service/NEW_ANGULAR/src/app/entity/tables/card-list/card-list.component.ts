import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ResourceService} from "../../../shared/services/resource.service";

export interface ICard {
	cardId: number,
	password: string
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['cardId', 'password'];
  public dataSource = new MatTableDataSource<ICard>();

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

  public setData(data: ICard[]) {
     this.dataSource.data = data;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
