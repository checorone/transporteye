import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './error-pages/server-error/server-error.component';
import {EntityModule} from './entity/entity.module';
import {MapsComponent} from './maps/maps.component';
import {RegisterComponent} from './account/register/register.component';
import {ActivationComponent} from './account/activation/activation.component';
import {ResetPasswordComponent} from './account/reset-password/reset-password.component';
import {ProfileComponent} from './account/profile/profile.component';
import {AuthTabsComponent} from './account/auth-tabs/auth-tabs.component';
import {UserModifyComponent} from './admin/user-modify/user-modify.component';
import {TransportModifyComponent} from "./admin/transport-modify/transport-modify.component";
import {StopsModifyComponent} from "./admin/stops-modify/stops-modify.component";
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";
import {TablesWatcherComponent} from "./admin/tables-watcher/tables-watcher.component";

const ownerRoutes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: DashboardComponent },
  // { path: 'admin/cards', component: UsersTableComponent },
  { path: 'admin/card/modify', component: UserModifyComponent },
  // { path: 'admin/transport', component: TransportTableComponent },
  { path: 'admin/transport/modify', component: TransportModifyComponent },
  // { path: 'admin/busStop', component: BusStopsTableComponent },
  { path: 'admin/busStop/modify', component: StopsModifyComponent},
  { path: 'entities', component: TablesWatcherComponent },
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
