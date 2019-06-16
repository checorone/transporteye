import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {RepositoryService} from "../../shared/services/repository.service";
import {catchError} from "rxjs/operators";
import {EMPTY, throwError} from "rxjs";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

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
    private resService: RepositoryService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    if (this.adminService.choosenToModifyInfo != null) {
      this.busForm = this.formBuilder.group({
        id: [this.adminService.choosenToModifyInfo.id],
        name: [this.adminService.choosenToModifyInfo.name, Validators.required],
        latitude: [this.adminService.choosenToModifyInfo.latitude, [Validators.min(-90), Validators.max(90)]],
        longitude: [this.adminService.choosenToModifyInfo.longitude, [Validators.min(-180), Validators.max(180)]]
      });
    } else {
      this.busForm = this.formBuilder.group({
        name: ['', Validators.required],
        latitude: ['', [Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.min(-180), Validators.max(180)]]
      });
      this.busStopExist = false;
    }
  }

  get f() {
    return this.busForm.controls;
  }


  onSubmit() {
    if (this.busForm.invalid) {
      return;
    }
    if (this.busForm.pristine){
      this.message = 'Нет изменений';
      return;
    }

    if (this.busStopExist) {
      this.resService.updateBusStop(this.busForm.getRawValue())
        .pipe(catchError(err => {
        this.message = err;
        return throwError(err);
      })).subscribe(()=>{
        this.message = 'Остановка обновлена';
      });
    } else {
      this.resService.addBusStop(this.busForm.getRawValue())
        .pipe(catchError(err => {
        this.message = err;
        return throwError(err);
      })).subscribe(()=>{
        this.message = 'Остановка создана';
      });
    }
  }

  deleteBusStop() {
    this.openDialog();
  }

  openDialog(): void {
    let id = this.adminService.choosenToModifyInfo.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'остановку ' + id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resService.deleteBusStop(id)
          .pipe(catchError(err => {
            this.message = err;
            console.log(err);
            return EMPTY;
          })).subscribe(() => {
          this.router.navigate(['admin/busStop']);
        });
      }
    });
  }
}
