import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../../../shared/services/admin.service";
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ResourceService } from "../../../shared/services/resource.service";
import { catchError } from "rxjs/operators";
import { EMPTY, throwError } from "rxjs";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { MapPicker } from "../../map-picker";

@Component({
  selector: 'app-stops-modify',
  templateUrl: './stops-modify.component.html',
  styleUrls: ['./stops-modify.component.less']
})
export class StopsModifyComponent implements OnInit {
  busForm: FormGroup;
  message: string;
  busStopExist = true;

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
    let map = new MapPicker(document.getElementById('map'));
    if (this.adminService.choosenToModifyInfo != null) {
      this.busForm = this.formBuilder.group({
        id: [this.adminService.choosenToModifyInfo.id],
        name: [this.adminService.choosenToModifyInfo.name, Validators.required],
        latitude: [this.adminService.choosenToModifyInfo.latitude, [Validators.min(-90), Validators.max(90)]],
        longitude: [this.adminService.choosenToModifyInfo.longitude, [Validators.min(-180), Validators.max(180)]]
      });
      map.setUniqueMarker(this.adminService.choosenToModifyInfo.latitude, this.adminService.choosenToModifyInfo.longitude, 'Остановка')
    } else {
      this.busForm = this.formBuilder.group({
        name: ['', Validators.required],
        latitude: ['', [Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.min(-180), Validators.max(180)]]
      });
      this.busStopExist = false;
    }
    map.updateFormOnClickOn(this.busForm);
    this.resService.getBusStops().subscribe(res => {
      if (this.adminService.choosenToModifyInfo) {
        let currentId = this.adminService.choosenToModifyInfo.id
        for (let index = 0; index < res.length; index++) {
          if (res[index].id == currentId) {
            res.splice(index, 1);   
          }
        }this.resService.getBusStops().subscribe(res => {
          if (this.adminService.choosenToModifyInfo) {
            let currentId = this.adminService.choosenToModifyInfo.id
            for (let index = 0; index < res.length; index++) {
              if (res[index].id == currentId) {
                res.splice(index, 1);   
              }
            }
          }
          map.setHelpMarkers(res);
        });
      }
      map.setHelpMarkers(res);
    })
  }

  get f() {
    return this.busForm.controls;
  }


  onSubmit() {
    if (this.busForm.invalid) {
      return;
    }

    let currentVer = this.busForm.getRawValue();
    if (this.busStopExist) {
      if (this.busForm.pristine || JSON.stringify(currentVer) == JSON.stringify(this.adminService.choosenToModifyInfo)) {
        this.message = 'Нет изменений';
        return;
      }
      this.resService.updateBusStop(currentVer)
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(() => {
          // this.message = 'Остановка обновлена';
          this.router.navigate(['/admin/entities']);
        });
    } else {
      this.resService.addBusStop(currentVer)
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(() => {
          // this.message = 'Остановка создана';
          this.router.navigate(['/admin/entities']);
        });
    }
  }

  deleteBusStop() {
    this.openDialog();
  }

  openDialog(): void {
    let id = this.adminService.choosenToModifyInfo.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'остановку ' + id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resService.deleteBusStop(id)
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
