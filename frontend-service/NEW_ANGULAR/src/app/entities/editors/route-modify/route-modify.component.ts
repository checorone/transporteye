import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../shared/services/admin.service";
import {ResourceService} from "../../../shared/services/resource.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {catchError} from "rxjs/operators";
import {EMPTY, throwError} from "rxjs";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MapPicker} from "../../map-picker";

@Component({
  selector: 'app-route-modify',
  templateUrl: './route-modify.component.html',
  styleUrls: ['./route-modify.component.less']
})
export class RouteModifyComponent implements OnInit {
  routeForm: FormGroup;
  message: string;
  routeExist = true;

  constructor(
    private adminService: AdminService,
    private resService: ResourceService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    if (this.adminService.choosenToModifyInfo != null) {
      console.log(this.adminService.choosenToModifyInfo);
      this.routeForm = this.formBuilder.group({
        routeId: [this.adminService.choosenToModifyInfo.routeId],
        routeNumber: [this.adminService.choosenToModifyInfo.routeNumber, Validators.required],
        busStopList: [this.adminService.choosenToModifyInfo.busStopList, Validators.required ],
      });
    } else {
      this.routeForm = this.formBuilder.group({
        routeNumber: ['', Validators.required],
        busStopList: ['', Validators.required ],
      });
      this.routeExist = false;
    }
    let map: MapPicker = new MapPicker(document.getElementById('map'));
    this.resService.getBusStops().subscribe(res=>{
    map.setBusStopsAndForm(res, this.routeForm);
    })

  }

  get f() {
    return this.routeForm.controls;
  }


  onSubmit() {
    if (this.routeForm.invalid) {
      return;
    }
    let currentVer = this.routeForm.getRawValue();
    if (this.routeExist) {
      if (this.routeForm.pristine || JSON.stringify(currentVer) == JSON.stringify(this.adminService.choosenToModifyInfo)){
        this.message = 'Нет изменений';
        return;
      }
      this.resService.updateRoute(currentVer)
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(()=>{
        this.message = 'Путь обновлен';
      });
    } else {
      this.resService.addRoute(this.routeForm.getRawValue())
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(()=>{
        this.message = 'Путь создан';
      });
    }
  }

  deleteRoute() {
    this.openDialog();
  }

  openDialog(): void {
    let id = this.adminService.choosenToModifyInfo.routeId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'маршрут ' + id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resService.deleteRoute(id)
          .pipe(catchError(err => {
            this.message = err;
            console.log(err);
            return EMPTY;
          })).subscribe(() => {
          this.router.navigate(['/admin/entities']);
        });
      }
    });
  }
}

