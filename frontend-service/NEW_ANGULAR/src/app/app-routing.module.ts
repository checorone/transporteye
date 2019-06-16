import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './error-pages/server-error/server-error.component';
import {EntityModule} from './entity/entity.module';
import {TransportListComponent} from './entity/transport-list/transport-list.component';
import {MapsComponent} from './maps/maps.component';
import {RegisterComponent} from './account/register/register.component';
import {ActivationComponent} from './account/activation/activation.component';
import {ResetPasswordComponent} from './account/reset-password/reset-password.component';
import {ProfileComponent} from './account/profile/profile.component';
import {AuthTabsComponent} from './account/auth-tabs/auth-tabs.component';
import {UsersTableComponent} from './admin/tables/users-table.component';
import {UserModifyComponent} from './admin/user-modify/user-modify.component';
import {BusStopsTableComponent} from "./admin/tables/bus-stops-table.component";
import {TransportTableComponent} from "./admin/tables/transport-table.component";
import {MapSearchComponent} from "./admin/map-search/map-search.component";

const ownerRoutes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: MapSearchComponent },
  { path: 'admin/cards', component: UsersTableComponent },
  { path: 'admin/card/modify', component: UserModifyComponent },
  { path: 'admin/transport', component: TransportTableComponent },
  { path: 'admin/busStop', component: BusStopsTableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entity', component: TransportListComponent },
  { path: 'map', component: MapsComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'activation/:uuid', component: ActivationComponent},
  { path: 'login', component: AuthTabsComponent},
  { path: 'recovery/:uuid', component: ResetPasswordComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ownerRoutes),
    EntityModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
