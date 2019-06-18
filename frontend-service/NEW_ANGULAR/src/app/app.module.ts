import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {DashboardBigChartComponent} from './dashboard/cards/dashboard-chart-big/dashboard-chart-big.component';
import {DashboardMidChartComponent} from './dashboard/cards/dashboard-chart-mid/dashboard-chart-mid.component';
import {DashboardSmallChartComponent} from './dashboard/cards/dashboard-chart-small/dashboard-chart-small.component';
import {ChartistModule} from 'ng-chartist';
import {DashboardInfoComponent} from './dashboard/cards/dashboard-info/dashboard-info.component';
import {DashboardCardsSpawnerComponent} from './dashboard/cards/dashboard-cards-spawner/dashboard-cards-spawner.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {MainComponent} from './layout/main/main.component';
import {FlexboxComponent} from './layout/flexbox/flexbox.component';
import {DashboardCardsService} from './dashboard/services/dashboard-cards/dashboard-cards.service';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './error-pages/server-error/server-error.component';
import {AgmCoreModule} from '@agm/core';
import {MapsComponent} from './maps/maps.component';
import {ActivationComponent} from './account/activation/activation.component';
import {LoginComponent} from './account/login/login.component';
import {ProfileComponent} from './account/profile/profile.component';
import {RegisterComponent} from './account/register/register.component';
import {ResetPasswordComponent} from './account/reset-password/reset-password.component';
import {CookieService} from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthTabsComponent} from './account/auth-tabs/auth-tabs.component';
import {UsersTableComponent} from './admin/tables/users-table.component';
import {UserModifyComponent} from './admin/user-modify/user-modify.component';
import {ConfirmDialogComponent} from './admin/confirm-dialog/confirm-dialog.component';
import {MatSnackBarModule} from '@angular/material';
import {CommonInterceptor} from './common-interceptor';
import {ComponentsEventsService} from './shared/services/components-events.service';
import {BusStopsTableComponent} from './admin/tables/bus-stops-table.component';
import {TransportTableComponent} from './admin/tables/transport-table.component';
import {TablesWatcherComponent} from './admin/tables-watcher/tables-watcher.component';
import {StopsModifyComponent} from './admin/stops-modify/stops-modify.component';
import {TransportModifyComponent} from './admin/transport-modify/transport-modify.component';
import {MapSearchComponent} from './admin/map-search/map-search.component';

@NgModule({
  declarations: [
    ActivationComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
    FlexboxComponent,
    DashboardComponent,
    DashboardBigChartComponent,
    DashboardMidChartComponent,
    DashboardSmallChartComponent,
    DashboardInfoComponent,
    DashboardCardsSpawnerComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MapsComponent,
    AuthTabsComponent,
    UsersTableComponent,
    UserModifyComponent,
    ConfirmDialogComponent,
    BusStopsTableComponent,
    TransportTableComponent,
    TablesWatcherComponent,
    StopsModifyComponent,
    TransportModifyComponent,
    MapSearchComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartistModule,
    SharedModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAsO7gE3liM-7oWu7i79lEbqxOnvE8OVM',
      libraries: ["places"]
    }),
    FormsModule,
    // LocalStorageModule.forRoot({
    //   prefix: 'eye',
    //   storageType: 'localStorage'
    // })
  ],
  providers: [
    DashboardCardsService,
    CookieService,
    ComponentsEventsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }],
  bootstrap: [MainComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule {
}
