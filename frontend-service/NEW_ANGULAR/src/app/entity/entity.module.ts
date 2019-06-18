import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {EntityComponentComponent} from './entity-component/entity-component.component';
import {MaterialModule} from '../shared/material/material.module';
import {TransportListComponent} from './tables/transport-list/transport-list.component';
import {AppRoutingModule} from '../app-routing.module';
import {CardListComponent} from './tables/card-list/card-list.component';
import {BusstopListComponent} from './tables/busstop-list/busstop-list.component';
import {RouteListComponent} from './tables/route-list/route-list.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
	SharedModule,
	MaterialModule,
	AppRoutingModule
  ],
  declarations: [EntityComponentComponent, TransportListComponent, CardListComponent, BusstopListComponent, RouteListComponent]
  
})
export class EntityModule { }
