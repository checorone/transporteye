import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component'
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

const ownerRoutes: Routes = [
  { path: 'home', component: HomeComponent },
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
