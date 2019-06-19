import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './error-pages/server-error/server-error.component';
import {MapsComponent} from './maps/maps.component';
import {ActivationComponent} from './account/activation/activation.component';
import {ResetPasswordComponent} from './account/reset-password/reset-password.component';
import {AuthTabsComponent} from './account/auth-tabs/auth-tabs.component';
import {UserModifyComponent} from './entities/editors/user-modify/user-modify.component';
import {TablesWatcherComponent} from "./entities/tables-watcher/tables-watcher.component";
import {StopsModifyComponent} from "./entities/editors/stops-modify/stops-modify.component";
import {TransportModifyComponent} from "./entities/editors/transport-modify/transport-modify.component";
import {TripsTableComponent} from "./user/trips-table/trips-table.component";
import {HomeComponent} from "./home/home.component";
import {RouteModifyComponent} from "./entities/editors/route-modify/route-modify.component";

const ownerRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'home', component: TripsTableComponent },
  { path: 'admin/entities', component: TablesWatcherComponent },
  { path: 'admin/card/modify', component: UserModifyComponent },
  { path: 'admin/transport/modify', component: TransportModifyComponent },
  { path: 'admin/busStop/modify', component: StopsModifyComponent},
  { path: 'admin/route/modify', component: RouteModifyComponent},
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'user/trips', component: TripsTableComponent },
  { path: 'map', component: MapsComponent },
  { path: 'auth/activation/:uuid', component: ActivationComponent},
  { path: 'auth/login', component: AuthTabsComponent},
  { path: 'auth/recovery/:uuid', component: ResetPasswordComponent},
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  // { path: 'entity',
  //   component: EntityComponentComponent,
  //   children: [
  //     {path: '', redirectTo: 'transport', pathMatch: 'full'},
  //     {path: 'transport', component: TransportListComponent},
  //     {path: 'card', component: CardListComponent},
  //     {path: 'busstop', component: BusstopListComponent},
  //     {path: 'route', component: RouteListComponent},
  //   ] },
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ownerRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
