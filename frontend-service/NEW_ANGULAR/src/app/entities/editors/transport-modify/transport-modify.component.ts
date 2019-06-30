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

@Component({
  selector: 'app-transport-modify',
  templateUrl: './transport-modify.component.html',
  styleUrls: ['./transport-modify.component.less']
})
export class TransportModifyComponent implements OnInit{
  transportForm: FormGroup;
  message: string;
  transportExist = true;

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
      this.transportForm = this.formBuilder.group({
        id: [this.adminService.choosenToModifyInfo.id],
        name: [this.adminService.choosenToModifyInfo.name, Validators.required],
        latitude: [this.adminService.choosenToModifyInfo.latitude],
        longitude: [this.adminService.choosenToModifyInfo.longitude],
        seats: [this.adminService.choosenToModifyInfo.seats,[Validators.required, Validators.max(200)]],
      });
    } else {
      this.transportForm = this.formBuilder.group({
        name: ['', Validators.required],
        seats: ['', [Validators.required, Validators.max(200)]],
      });
      this.transportExist = false;
    }
  }

  get f() {
    return this.transportForm.controls;
  }


  onSubmit() {
    if (this.transportForm.invalid) {
      return;
    }
    let currentVer = this.transportForm.getRawValue();
    if (this.transportExist) {
      if (this.transportForm.pristine || JSON.stringify(currentVer) == JSON.stringify(this.adminService.choosenToModifyInfo)){
        this.message = 'Нет изменений';
        return;
      }
      this.resService.updateTransport(currentVer)
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(()=>{
        // this.message = 'Транспорт обновлен';
        this.router.navigate(['/admin/entities']);
      });
    } else {
      this.resService.addTransport(this.transportForm.getRawValue())
        .pipe(catchError(err => {
          this.message = err;
          return throwError(err);
        })).subscribe(()=>{
        // this.message = 'Транспорт создан';
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
      data: {message: 'транспорт ' + id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resService.deleteTransport(id)
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

