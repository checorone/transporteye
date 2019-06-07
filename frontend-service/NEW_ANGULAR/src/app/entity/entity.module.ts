import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportListComponent } from './transport-list/transport-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [TransportListComponent]
})
export class EntityModule { }
